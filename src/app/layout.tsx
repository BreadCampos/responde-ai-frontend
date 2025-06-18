import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "./providers";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

export const metadata: Metadata = {
  title: "Responde aí",
  description: "Responde aí é um aplicativo de perguntas e respostas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
