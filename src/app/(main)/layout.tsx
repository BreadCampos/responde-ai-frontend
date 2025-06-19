"use client";

import { useGetUserAndCompany } from "@/shared/hooks/user-get-user-and-company";
import { Header } from "@/shared/layout/default-layout/layout/header";
import { Sidebar } from "@/shared/layout/default-layout/layout/sidebar";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useGetUserAndCompany();

  return (
    <div className="flex h-screen max-h-screen bg-background text-foreground  overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 ">{children}</main>
      </div>
    </div>
  );
}
