import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LandingView from "@/components/LandingView";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  // 로그인된 유저는 바로 대시보드(위젯 뷰)로 점프
  if (session) {
    redirect("/dashboard");
  }

  return <LandingView />;
}
