import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { login } from "@/lib/auth";
import speakeasy from "speakeasy";

export async function POST(req: Request) {
  try {
    const { email, password, twoFACode } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Check 2FA
    if (user.twoFactorEnabled) {
      if (!twoFACode) {
        return NextResponse.json({ requires2FA: true }, { status: 200 });
      }

      const isValid = speakeasy.totp.verify({
        secret: user.twoFactorSecret!,
        encoding: "base32",
        token: twoFACode,
      });

      if (!isValid) {
        return NextResponse.json({ error: "Invalid 2FA code" }, { status: 401 });
      }
    }

    await login({ id: user.id, email: user.email });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
