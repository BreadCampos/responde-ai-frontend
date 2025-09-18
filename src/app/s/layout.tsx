"use client";

import { CompanyHeader } from "@/shared/layout/company-header";
import { Footer } from "@/shared/layout/footer";

export default function LayoutCompany({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen max-h-screen bg-background text-foreground  overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <CompanyHeader />
        <main className="flex-1 overflow-y-auto p-4 ">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
