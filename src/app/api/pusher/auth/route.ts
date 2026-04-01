import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized (로그인 만료)", { status: 401 });
  }

  // Pusher-js 클라이언트가 보내는 인증 폼 데이터
  const data = await req.formData();
  const socketId = data.get("socket_id") as string;
  const channel = data.get("channel_name") as string;

  // 인가된 유저(동아리원)만 프라이빗 채널('private-*')에 접속할 수 있도록 서버 서명 부여
  try {
    const authResponse = pusherServer.authorizeChannel(socketId, channel, {
      user_id: session.user.id,
      user_info: {
        name: session.user.name,
      }
    });
    return NextResponse.json(authResponse);
  } catch(err) {
    console.error("Pusher Auth Error", err);
    return new NextResponse("Pusher 서버 인증 오류 발생", { status: 500 });
  }
}
