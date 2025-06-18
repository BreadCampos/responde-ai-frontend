import type { ReactNode } from "react";
import { Sidebar } from "./layout/sidebar";
import { Header } from "./layout/header";
import { useGetUserAndCompany } from "../../hooks/user-get-user-and-company";

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
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
};

export default DefaultLayout;
