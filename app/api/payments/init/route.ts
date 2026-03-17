import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, currency, provider } = await req.json();

    if (!amount || !currency) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Default to Payaza as primary, Paystack as secondary
    const selectedProvider = provider || "PAYAZA";
    const reference = `${selectedProvider.toLowerCase()}_${crypto.randomBytes(8).toString("hex")}`;

    // Create a pending transaction
    await prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: "PAYMENT",
        amount: parseFloat(amount),
        currency: currency,
        status: "PENDING",
        reference: reference,
        provider: selectedProvider,
      },
    });

    // In a real app, you'd call the provider's API to get a checkout URL
    // For demo, we'll return a simulated checkout URL
    let checkoutUrl = "";
    if (selectedProvider === "PAYAZA") {
      checkoutUrl = `https://payaza.com/checkout/${reference}`;
    } else {
      checkoutUrl = `https://paystack.com/checkout/${reference}`;
    }

    return NextResponse.json({ 
      checkoutUrl, 
      reference,
      provider: selectedProvider 
    });
  } catch (error: any) {
    console.error("Payment init error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
