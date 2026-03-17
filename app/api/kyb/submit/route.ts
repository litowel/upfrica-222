import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { registrationNumber, taxId, website, industry } = await req.json();

    if (!registrationNumber || !taxId || !website || !industry) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Update user KYB status to PENDING (if it was something else)
    // In a real app, you'd trigger an external KYB provider like Idnorm here
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        kybStatus: "PENDING",
        // You'd store the metadata in a separate KYB table or JSON field
      },
    });

    // Simulate auto-verification for demo purposes if certain conditions are met
    if (registrationNumber.startsWith("RC-")) {
      setTimeout(async () => {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { kybStatus: "VERIFIED" },
        });
      }, 5000);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("KYB submit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
