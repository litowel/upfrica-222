import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wallets = await prisma.wallet.findMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json({ wallets });
  } catch (error: any) {
    console.error("Wallets error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
