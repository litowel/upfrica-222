import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settlements = await prisma.settlement.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ settlements });
  } catch (error: any) {
    console.error("Settlements error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
