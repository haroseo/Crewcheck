import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Crewcheck 로그인",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !user.hashedPassword) {
          // 보안을 위해 구체적인 에러는 뭉뚱그림
          throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isValid) {
          throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        return user;
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/onboarding", // 인증 완료 시 온보딩으로 이동
  },
  callbacks: {
    async jwt({ token, user }) {
      // 최초 로그인(user 객체 존재)이 넘어올 때, DB에서 role 체크
      if (user) {
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        token.role = dbUser?.role || "MEMBER";
        // @ts-ignore
        token.lastReadNoticeId = dbUser?.lastReadNoticeId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-ignore
        session.user.id = token.sub!;
        // @ts-ignore
        session.user.role = token.role;
        // @ts-ignore
        session.user.lastReadNoticeId = token.lastReadNoticeId;
      }
      return session;
    }
  }
};
