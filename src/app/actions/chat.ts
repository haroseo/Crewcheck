"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";

/**
 * 프론트엔드에서 브라우저 WebCrypto(AES-GCM 등)로 이미 난독화한
 * 'encryptedBlob(외계어)' 덩어리만 서버로 전송받습니다. 
 * => 즉, Vercel 서버나 Prisma DB에는 원래 대화 내용이 전혀 남지 않습니다 (강력 E2EE).
 */
export async function sendEncryptedMessage(receiverId: string, encryptedBlob: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("인증 실패");
  
  const senderId = session.user.id;

  // 1. DB에는 평문(Plaintext)이 아닌 암호화 덩어리만 저장
  const msg = await prisma.chatMessage.create({
    data: {
      senderId,
      receiverId,
      encryptedBlob
    }
  });

  // 2. 1:1 대화방 고유 채널 식별자 (아이디 사전 순 정렬로 양방향 동일 채널 획득)
  const channelName = `private-chat-${[senderId, receiverId].sort().join("-")}`;
  
  // 3. 접속 중인 채팅방 유저들에게 "new-message" 이벤트 발송 (Pusher Webhook)
  await pusherServer.trigger(channelName, "new-message", {
    id: msg.id,
    senderId,
    receiverId,
    encryptedBlob,
    createdAt: msg.createdAt
  });

  return { success: true, messageId: msg.id };
}
