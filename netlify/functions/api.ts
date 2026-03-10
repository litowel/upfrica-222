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
  res.json({ userId, status, message: "Webhook received" });
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

    let sessionUrl = "https://verify.didit.me/u/v3hIiGxYTC6-x7wTXdEjWg"; // Fallback URL

    if (clientId && clientSecret) {
      try {
        // 1. Authenticate with Didit
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

// Mount the router
// Netlify functions rewrite the path, so we mount it at the function path
app.use("/.netlify/functions/api", router);
// Also mount at /api for local testing if needed
app.use("/api", router);

export const handler = serverless(app);
