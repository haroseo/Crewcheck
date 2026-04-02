import AppLayout from "@/components/AppLayout";
import { ReactNode } from "react";
export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
