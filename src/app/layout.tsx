import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Addition Intelligence",
  description: "Addition Intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${funnelSans.variable}`}>
        <QueryProvider>
          <Provider>{children}</Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
