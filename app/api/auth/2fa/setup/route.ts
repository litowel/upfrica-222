import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = speakeasy.generateSecret({
      name: `Upfrica FlowPay (${session.user.email})`,
    });

    const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

    // Temporarily store secret in DB
    await prisma.user.update({
      where: { id: session.user.id },
      data: { twoFactorSecret: secret.base32 },
    });

    return NextResponse.json({ secret: secret.base32, qrCode });
  } catch (error: any) {
    console.error("2FA setup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
