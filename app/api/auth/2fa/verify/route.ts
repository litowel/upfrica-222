import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import speakeasy from "speakeasy";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { code } = await req.json();
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json({ error: "2FA not setup" }, { status: 400 });
    }

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: code,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { twoFactorEnabled: true },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("2FA verify error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
