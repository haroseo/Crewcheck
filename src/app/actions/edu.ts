"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function completeCurriculumNode(nodeId: number, xpReward: number, title: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("인증 실패");

  // 1. 유저 경험치 상승 빛 누적 잔디 횟수 증가
  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { 
      exp: { increment: xpReward }, 
      totalCommits: { increment: 1 } 
    }
  });

  // 2. 학습 완료는 = 활동 시간 = 동아리 잔디와 같다. (보상성 체류시간 증가 전략)
  // CheckIn 데이터베이스에 강제로 가짜 출석기록(완료상태)을 심어줍니다.
  await prisma.checkIn.create({
    data: {
      userId: session.user.id,
      duration: 30, // 가상의 코딩학습 30분 인정
      status: "COMPLETED",
      message: `성장 퀘스트 완료 🚀 [${title}] (EXP +${xpReward})`
    }
  });

  /* 
   원래라면 UserLearning 테이블도 업데이트하여 
   중복 지급을 방지하지만 1판 MVP이므로 무한 잔디 획득도 도파민 전략으로 놔둡니다.
  */

  return { success: true, newExp: updatedUser.exp };
}
