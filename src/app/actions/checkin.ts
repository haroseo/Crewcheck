"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function toggleClockIn() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error("비정상적인 접근입니다 (인증 필요)");
  }

  const userId = session.user.id;

  // 진행 중인 출근 상태(clockOut이 없는 상태)가 있는지 확인
  const activeCheckIn = await prisma.checkIn.findFirst({
    where: { userId, clockOut: null },
    orderBy: { clockIn: 'desc' }
  });

  if (activeCheckIn) {
    // 1. 퇴근 로직: 작동 시간 계산
    const _now = new Date();
    const durationMins = Math.round((_now.getTime() - activeCheckIn.clockIn.getTime()) / 60000); // 분 단위

    // CheckIn 완료 처리
    await prisma.checkIn.update({
      where: { id: activeCheckIn.id },
      data: { 
        clockOut: _now, 
        duration: durationMins, 
        status: "COMPLETED" 
      }
    });

    // User 잔디 및 누적 시간 증가 처리 (인스타 뱃지 타겟용)
    await prisma.user.update({
      where: { id: userId },
      data: { 
        totalDuration: { increment: durationMins },
        currentStreak: { increment: 1 }, 
        totalCommits: { increment: 1 }
      }
    });

    return { success: true, isClockedIn: false, duration: durationMins };
    
  } else {
    // 2. 출근 로직 시작
    await prisma.checkIn.create({
      data: { userId }
    });
    
    return { success: true, isClockedIn: true, duration: 0 };
  }
}

export async function getActiveClockIn() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const activeCheckIn = await prisma.checkIn.findFirst({
    where: { userId: session.user.id, clockOut: null },
    orderBy: { clockIn: 'desc' }
  });

  if (activeCheckIn) {
    const durationMins = Math.round((new Date().getTime() - activeCheckIn.clockIn.getTime()) / 60000);
    return { isClockedIn: true, startTime: activeCheckIn.clockIn, currentDuration: durationMins };
  }
  return { isClockedIn: false, startTime: null, currentDuration: 0 };
}
