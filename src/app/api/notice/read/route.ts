import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { noticeId } = await req.json();
  if (!noticeId) {
    return NextResponse.json({ error: "Notice ID required" }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      // @ts-ignore
      data: { lastReadNoticeId: noticeId },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to mark notice as read:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
