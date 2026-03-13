import express from "express";
import { createServer as createViteServer } from "vite";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Prisma
const prisma = new PrismaClient();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Auth Sign In (Mock)
  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }
      // Mock password check - accept any password for now
      res.json({ user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Treasury Data
  app.get("/api/treasury", async (req, res) => {
    try {
      const email = req.headers['x-user-email'] as string;
      if (!email) return res.status(401).json({ error: 'Unauthorized' });
      
      const user = await prisma.user.findUnique({
        where: { email },
        include: { wallets: true }
      });
      
      if (!user) return res.status(404).json({ error: 'User not found' });
      
      const usdBalance = user.wallets.find(w => w.currency === 'USD')?.balance || 0;
      const stablecoinBalance = user.wallets.find(w => w.currency === 'USDC')?.balance || 0;
      const cryptoBalance = user.wallets.filter(w => !['USD', 'USDC'].includes(w.currency)).reduce((acc, w) => acc + w.balance, 0);
      
      const treasury = {
        usdBalance,
        stablecoinBalance,
        cryptoBalance,
        totalValueUsd: usdBalance + stablecoinBalance + cryptoBalance,
        isActive: true
      };
      
      res.json({ treasury, kycStatus: user.kycStatus, walletAddress: user.wallets.find(w => w.type === 'SAFE_MULTISIG')?.address || null });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Transactions Data
  app.get("/api/transactions", async (req, res) => {
    try {
      const email = req.headers['x-user-email'] as string;
      if (!email) return res.status(401).json({ error: 'Unauthorized' });
      
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(404).json({ error: 'Not found' });
      
      const limit = parseInt((req.query.limit as string) || '20');
      const skip = parseInt((req.query.skip as string) || '0');
      
      const [transactions, total] = await Promise.all([
        prisma.transaction.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip,
        }),
        prisma.transaction.count({ where: { userId: user.id } })
      ]);
      
      res.json({ transactions, total, hasMore: skip + limit < total });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "UpFrica Treasury OS" });
  });

  // User Onboarding (Mock)
  app.post("/api/onboarding/register", async (req, res) => {
    try {
      const { email, name } = req.body;
      // In a real app, we'd hash passwords, etc.
      const user = await prisma.user.create({
        data: {
          email,
          name,
          kycStatus: "PENDING",
          wallets: {
            create: [
              { currency: "USD", type: "FIAT", balance: 0 },
              { currency: "USDC", type: "CRYPTO", balance: 0 },
            ]
          }
        },
        include: { wallets: true }
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "User creation failed" });
    }
  });

  // KYC Verification (Mock Webhook)
  app.post("/api/kyc/webhook", async (req, res) => {
    const { userId, status } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { kycStatus: status }
    });
    
    // If verified, generate Safe Wallet (Mock)
    if (status === "VERIFIED") {
        await prisma.wallet.create({
            data: {
                userId: user.id,
                currency: "ETH",
                type: "SAFE_MULTISIG",
                address: "0x" + Math.random().toString(16).slice(2, 42),
                balance: 0
            }
        });
    }
    
    res.json(user);
  });

  // Developer API Keys
  app.post("/api/developers/keys", async (req, res) => {
    const { userId, type } = req.body;
    const key = `upfrica_${type}_${Math.random().toString(36).substring(7)}`;
    const secret = `sk_${Math.random().toString(36).substring(2)}`;
    
    const apiKey = await prisma.apiKey.create({
        data: {
            userId,
            key,
            secret,
            type
        }
    });
    res.json(apiKey);
  });

  // Payaza Payment Initialization
  app.post("/api/payments/payaza/initialize", async (req, res) => {
    try {
      const email = req.headers['x-user-email'] as string;
      if (!email) return res.status(401).json({ error: 'Unauthorized' });
      
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(404).json({ error: 'User not found' });
      if (user.kycStatus !== 'APPROVED') return res.status(403).json({ error: 'KYC verification required' });

      const { amount, currency = 'USD' } = req.body;
      if (!amount || amount < 1) return res.status(400).json({ error: 'Minimum deposit is $1' });

      const { v4: uuidv4 } = await import('uuid');
      const transactionRef = `UPF-${uuidv4().substring(0, 8).toUpperCase()}`;
      const nameParts = (user.name || 'UpFrica User').split(' ');
      const firstName = nameParts[0] || 'UpFrica';
      const lastName = nameParts[1] || 'User';

      const { initializePayazaTransaction } = await import('./src/lib/payaza.js');
      
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

      const result = await initializePayazaTransaction({
        email: user.email,
        amount,
        currency,
        firstName,
        lastName,
        callbackUrl: `${appUrl}/api/payments/payaza/verify`,
        transactionRef,
      });

      await prisma.transaction.create({
        data: {
          userId: user.id,
          type: 'DEPOSIT',
          amount,
          currency,
          status: 'PENDING',
          paymentRef: transactionRef,
          metadata: { provider: 'payaza' },
        },
      });

      res.json({ success: true, checkoutUrl: result.checkout_url, transactionRef });
    } catch (error: any) {
      console.error('Payaza init error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Payment initialization failed' });
    }
  });

  // Payaza Payment Verification
  app.get("/api/payments/payaza/verify", async (req, res) => {
    try {
      const transactionRef = (req.query.transaction_ref || req.query.reference) as string;
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
      
      if (!transactionRef) return res.redirect(`${appUrl}/treasury?error=no_reference`);

      const { verifyPayazaTransaction } = await import('./src/lib/payaza.js');
      const result = await verifyPayazaTransaction(transactionRef);
      const isSuccess = result?.transaction_status === 'Successful' || result?.status === 'success';

      if (isSuccess) {
        const tx = await prisma.transaction.findFirst({ where: { paymentRef: transactionRef } });
        if (tx && tx.status !== 'SUCCESS') {
          await prisma.transaction.update({ where: { id: tx.id }, data: { status: 'SUCCESS' } });
          
          // Update the USD wallet balance
          const wallet = await prisma.wallet.findFirst({
            where: { userId: tx.userId, currency: 'USD' }
          });
          
          if (wallet) {
            await prisma.wallet.update({
              where: { id: wallet.id },
              data: { balance: { increment: tx.amount } }
            });
          } else {
            await prisma.wallet.create({
              data: {
                userId: tx.userId,
                currency: 'USD',
                type: 'FIAT',
                balance: tx.amount
              }
            });
          }
        }
        return res.redirect(`${appUrl}/dashboard?deposit=success`);
      }
      return res.redirect(`${appUrl}/treasury?error=payment_failed`);
    } catch (error: any) {
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
      return res.redirect(`${appUrl}/treasury?error=verification_failed`);
    }
  });

  // Didit KYC Session Generation
  app.post("/api/kyc/didit-session", async (req, res) => {
    const { userId, accountType } = req.body;
    
    try {
      const clientId = process.env.DIDIT_CLIENT_ID;
      const clientSecret = process.env.DIDIT_CLIENT_SECRET;

      let sessionUrl = "https://verify.didit.me/u/v3hIiGxYTC6-x7wTXdEjWg"; // Fallback URL

      if (clientId && clientSecret) {
        try {
          // 1. Authenticate with Didit (Standard OAuth2 Client Credentials flow)
          const tokenResponse = await fetch('https://auth.didit.me/oauth2/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            body: new URLSearchParams({ grant_type: 'client_credentials' })
          });

          if (tokenResponse.ok) {
            const { access_token } = await tokenResponse.json();

            // 2. Create a verification session
            // accountType determines if it's KYC (individual) or KYB (business)
            const verificationType = accountType === 'business' ? 'kyb' : 'kyc';
            
            const sessionResponse = await fetch('https://api.didit.me/v1/sessions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                vendor_user_id: userId,
                features: [verificationType],
                callback_url: `${req.protocol}://${req.get('host')}/api/kyc/webhook`
              })
            });

            if (sessionResponse.ok) {
              const sessionData = await sessionResponse.json();
              if (sessionData.url) {
                sessionUrl = sessionData.url;
              }
            } else {
              console.warn("Didit session creation failed, falling back to static URL. Status:", sessionResponse.status);
            }
          } else {
            console.warn("Didit authentication failed, falling back to static URL. Status:", tokenResponse.status);
          }
        } catch (apiError) {
          console.error("Error calling Didit API, falling back to static URL:", apiError);
        }
      } else {
        console.log("DIDIT_CLIENT_ID or DIDIT_CLIENT_SECRET not set. Using static fallback URL.");
      }
      
      res.json({ url: sessionUrl });
    } catch (error) {
      console.error("Didit session error:", error);
      res.status(500).json({ error: "Failed to generate KYC session" });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
