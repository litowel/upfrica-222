import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-payaza-signature");

    // Verify signature (in production, use process.env.PAYAZA_SECRET_KEY)
    const secret = process.env.PAYAZA_SECRET_KEY || "your-payaza-secret-key";
    
    // Payaza signature verification logic (simplified for demo)
    // In production, follow Payaza's specific HMAC/Signature documentation
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

    // For demo purposes, we'll accept if signature matches or if we're in dev
    if (signature && hash !== signature && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Payaza event structure (simulated based on typical gateway patterns)
    if (event.status === "success" || event.event === "transaction.completed") {
      const { transaction_reference, amount, currency, customer_email } = event.data || event;

      // Find user by email
      const user = await prisma.user.findUnique({ where: { email: customer_email } });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Check if transaction already exists
      const existingTx = await prisma.transaction.findUnique({
        where: { reference: transaction_reference }
      });
      if (existingTx) {
        return NextResponse.json({ status: "already_processed" });
      }

      // 1. Record Fiat Transaction
      const fiatAmount = parseFloat(amount);
      const rate = 1550; // Simulated rate for Payaza (slightly different for demo)
      const usdcAmount = fiatAmount / rate;

      await prisma.transaction.create({
        data: {
          userId: user.id,
          type: "PAYMENT",
          amount: fiatAmount,
          currency: currency || "NGN",
          usdcAmount: usdcAmount,
          rate: rate,
          status: "COMPLETED",
          reference: transaction_reference,
          provider: "PAYAZA",
        },
      });

      // 2. Update Wallet Balance
      await prisma.wallet.updateMany({
        where: { userId: user.id, currency: "USDC" },
        data: {
          balance: { increment: usdcAmount },
        },
      });

      // 3. Create Settlement Record
      await prisma.settlement.create({
        data: {
          userId: user.id,
          amount: usdcAmount,
          status: "COMPLETED",
          txHash: `0x${crypto.randomBytes(32).toString("hex")}`,
        },
      });

      console.log(`[PAYAZA] Settled ${usdcAmount} USDC for user ${user.email}`);
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Payaza Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
