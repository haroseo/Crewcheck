import Pusher from "pusher";

// 환경변수가 없더라도 프로젝트가 죽지 않도록 방어 코드 삽입 (Vercel 배포 시 필요)
export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || "12345",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "mock-key",
  secret: process.env.PUSHER_SECRET || "mock-secret",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap3",
  useTLS: true,
});
