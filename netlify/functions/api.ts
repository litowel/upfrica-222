import express from "express";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

const router = express.Router();

// Health Check
router.get("/health", (req, res) => {
  res.json({ status: "ok", service: "UpFrica Treasury OS (Netlify Functions)" });
});

// User Onboarding (Mocked for Netlify without a DB)
router.post("/onboarding/register", async (req, res) => {
  try {
    const { email, name } = req.body;
    // Mock user creation
    const user = {
      id: "usr_" + Math.random().toString(36).substring(7),
      email,
      name,
      kycStatus: "PENDING",
      wallets: [
        { currency: "USD", type: "FIAT", balance: 0 },
        { currency: "USDC", type: "CRYPTO", balance: 0 },
      ]
    };
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User creation failed" });
  }
});

// KYC Verification (Mock Webhook)
router.post("/kyc/webhook", async (req, res) => {
  const { userId, status } = req.body;
  // In a real app, this would update the database
  // Update user KYC status to APPROVED or REJECTED automatically
  // When APPROVED: activate their treasury account automatically
  console.log(`Webhook received for user ${userId} with status ${status}`);
  
  res.json({ 
    userId, 
    status: "APPROVED", // Mocking the approval for demo
    message: "Webhook received and processed. Treasury account activated.",
    treasuryActivated: true
  });
});

// Handle Didit redirect after completion
router.get("/kyc/webhook", (req, res) => {
  res.send(`
    <html>
      <body>
        <script>
          window.parent.postMessage('verification_complete', '*');
        </script>
        <div style="font-family: sans-serif; text-align: center; padding: 40px;">
          <h2>Verification Complete</h2>
          <p>You can now proceed to the next step.</p>
        </div>
      </body>
    </html>
  `);
});

// Paystack Payment Verification
router.post("/payments/verify", async (req, res) => {
  const { reference } = req.body;
  
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.warn("PAYSTACK_SECRET_KEY not set. Mocking successful verification.");
      return res.json({ status: "success", message: "Mock verification successful" });
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`
      }
    });
    
    const data = await response.json();
    
    if (data.status && data.data.status === "success") {
      res.json({ status: "success", data: data.data });
    } else {
      res.status(400).json({ status: "failed", message: "Transaction verification failed" });
    }
  } catch (error) {
    console.error("Paystack verification error:", error);
    res.status(500).json({ status: "error", message: "Internal server error during verification" });
  }
});

// Pionex Bot Creation
router.post("/trading/pionex/create", async (req, res) => {
  const { botType, amount } = req.body;
  
  try {
    const apiKey = process.env.PIONEX_API_KEY;
    const secretKey = process.env.PIONEX_SECRET_KEY;
    
    if (!apiKey || !secretKey) {
      console.warn("PIONEX_API_KEY or PIONEX_SECRET_KEY not set. Mocking successful bot creation.");
      return res.json({ 
        status: "success", 
        message: "Mock bot created successfully",
        botId: `mock_bot_${Math.random().toString(36).substring(7)}`
      });
    }

    // In a real app, you would make the actual signed request to Pionex API here
    // For now, we simulate a successful API call
    console.log(`Creating Pionex bot: ${botType} with amount ${amount}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({ 
      status: "success", 
      message: "Bot created successfully via Pionex API",
      botId: `pionex_bot_${Math.random().toString(36).substring(7)}`
    });
  } catch (error) {
    console.error("Pionex bot creation error:", error);
    res.status(500).json({ status: "error", message: "Failed to create trading bot" });
  }
});

// Developer API Keys (Mocked)
router.post("/developers/keys", async (req, res) => {
  const { userId, type } = req.body;
  const key = `upfrica_${type}_${Math.random().toString(36).substring(7)}`;
  const secret = `sk_${Math.random().toString(36).substring(2)}`;
  
  res.json({ userId, key, secret, type });
});

// Didit KYC Session Generation
router.post("/kyc/didit-session", async (req, res) => {
  const { userId, accountType } = req.body;
  
  try {
    const clientId = process.env.DIDIT_CLIENT_ID;
    const clientSecret = process.env.DIDIT_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: "DIDIT_CLIENT_ID or DIDIT_CLIENT_SECRET not configured." });
    }

    // 1. Authenticate with Didit
    const tokenResponse = await fetch('https://auth.didit.me/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' })
    });

    if (!tokenResponse.ok) {
      throw new Error(`Didit authentication failed with status: ${tokenResponse.status}`);
    }

    const { access_token } = await tokenResponse.json();

    // 2. Create a verification session
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
        callback_url: `https://${req.get('host')}/api/kyc/webhook`
      })
    });

    if (!sessionResponse.ok) {
      throw new Error(`Didit session creation failed with status: ${sessionResponse.status}`);
    }

    const sessionData = await sessionResponse.json();
    if (!sessionData.url) {
      throw new Error("Didit session response missing URL.");
    }

    res.json({ url: sessionData.url });
  } catch (error: any) {
    console.error("Didit session error:", error);
    res.status(500).json({ error: error.message || "Failed to generate KYC session" });
  }
});

// Mount the router
// Netlify functions rewrite the path, so we mount it at the function path
app.use("/.netlify/functions/api", router);
// Also mount at /api for local testing if needed
app.use("/api", router);

export const handler = serverless(app);
