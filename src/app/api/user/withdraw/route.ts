import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reason } = await req.json();

  try {
    // @ts-ignore
    const request = await prisma.withdrawalRequest.upsert({
      where: { userId: session.user.id },
      update: { reason, status: "PENDING", createdAt: new Date() },
      create: { userId: session.user.id, reason, status: "PENDING" },
    });
    return NextResponse.json(request);
  } catch (error) {
    console.error("Failed to request withdrawal:", error);
    return NextResponse.json({ error: "Failed to request" }, { status: 500 });
  }
}
