import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // @ts-ignore
    const latestNotice = await prisma.notice.findFirst({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(latestNotice);
  } catch (error) {
    console.error("Failed to fetch latest notice:", error);
    return NextResponse.json({ error: "Failed to fetch notice" }, { status: 500 });
  }
}
