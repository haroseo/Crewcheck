"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function updateUserProfile(data: { nickname: string; track: string; bannerColor: string }) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("보안 위험: 인증되지 않은 접근입니다.");
  }

  // 사용자의 초반 세팅 정보(닉네임, 직군, 배너색상) 업데이트
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      nickname: data.nickname,
      track: data.track,
      bannerColor: data.bannerColor,
    }
  });

  return { success: true };
}
