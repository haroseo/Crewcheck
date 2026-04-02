import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check role
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "OWNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { title, content } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }

  try {
    // @ts-ignore
    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(notice);
  } catch (error) {
    console.error("Failed to create notice:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
