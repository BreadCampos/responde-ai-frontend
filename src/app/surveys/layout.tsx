"use client";

import { CompanyHeader } from "@/shared/layout/company-header";

export default function LayoutCompany({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col  h-screen max-h-screen bg-background text-foreground  overflow-hidden">
      <CompanyHeader />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
