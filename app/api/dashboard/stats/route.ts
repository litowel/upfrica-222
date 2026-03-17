import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        wallets: true,
        transactions: {
          take: 5,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalRevenue = user.transactions
      .filter((tx) => tx.type === "PAYMENT" && tx.status === "COMPLETED")
      .reduce((acc, tx) => acc + tx.amount, 0);

    const usdcWallet = user.wallets.find((w) => w.currency === "USDC");
    const walletBalance = usdcWallet?.balance || 0;

    const activeTransactions = await prisma.transaction.count({
      where: { userId, status: "PENDING" },
    });

    return NextResponse.json({
      totalRevenue,
      walletBalance,
      activeTransactions,
      kybStatus: user.kybStatus,
      businessName: user.businessName,
      userEmail: user.email,
      recentTransactions: user.transactions,
    });
  } catch (error: any) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
