import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    // Verify signature (in production, use process.env.PAYSTACK_SECRET_KEY)
    const secret = process.env.PAYSTACK_SECRET_KEY || "sk_test_xxx";
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const { reference, amount, currency, customer } = event.data;

      // Find user by email
      const user = await prisma.user.findUnique({ where: { email: customer.email } });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // 1. Record Fiat Transaction
      const fiatAmount = amount / 100; // Paystack sends in kobo/cents
      const rate = 1500; // Simulated rate (e.g. 1500 NGN = 1 USDC)
      const usdcAmount = fiatAmount / rate;

      const transaction = await prisma.transaction.create({
        data: {
          userId: user.id,
          type: "PAYMENT",
          amount: fiatAmount,
          currency: currency,
          usdcAmount: usdcAmount,
          rate: rate,
          status: "COMPLETED",
          reference: reference,
          provider: "PAYSTACK",
        },
      });

      // 2. Simulate Circle Conversion & Settlement
      // In a real app, you'd call Circle API to mint/transfer USDC
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
          txHash: `0x${crypto.randomBytes(32).toString("hex")}`, // Simulated hash
        },
      });

      console.log(`Settled ${usdcAmount} USDC for user ${user.email}`);
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
