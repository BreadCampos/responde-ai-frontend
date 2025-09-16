import { APP_ENV } from "@/env";
import "@/shared/styled/embla.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Responde aí",
  description: "Responde aí é um aplicativo de perguntas e respostas",
  viewport: "width=device-width, initial-scale=1.0", // Aqui está a tag viewport!
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${APP_ENV.GOOGLE_ANALYTICS_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${APP_ENV.GOOGLE_ANALYTICS_ID}');
          `}
      </Script>
    </html>
  );
}
