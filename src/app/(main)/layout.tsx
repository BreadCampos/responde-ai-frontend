"use client";

import { useScreenSize } from "@/shared/hooks/use-screen-size";
import { useGetUserAndCompany } from "@/shared/hooks/user-get-user-and-company";
import { Footer } from "@/shared/layout/footer";
import { Header } from "@/shared/layout/header";
import { Sidebar } from "@/shared/layout/sidebar";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useGetUserAndCompany();
  const { isMobile } = useScreenSize();

  return (
    <div className="flex h-screen max-h-screen bg-background text-foreground  overflow-hidden">
      {!isMobile && <Sidebar />}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 ">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
