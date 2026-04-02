import AppLayout from "@/components/AppLayout";
import { ReactNode } from "react";
export default function LearnLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
