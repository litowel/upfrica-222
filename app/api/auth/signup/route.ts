import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, businessName, name } = await req.json();

    if (!email || !password || !businessName || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        businessName,
        name,
        wallets: {
          create: [
            { currency: "USDC", type: "CRYPTO", balance: 0 },
            { currency: "NGN", type: "FIAT", balance: 0 },
          ],
        },
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
