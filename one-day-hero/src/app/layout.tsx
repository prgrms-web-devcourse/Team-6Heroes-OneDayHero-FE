import "./globals.css";

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import Toast from "@/components/common/Toast";
import ToastProvider from "@/contexts/ToastProvider";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body className={`${notoSansKR.className} flex flex-col items-center`}>
        <ToastProvider>
          <main className="flex min-h-screen w-full max-w-screen-sm flex-col items-center bg-background px-5 py-24 shadow">
            {children}
          </main>
          <Toast />
        </ToastProvider>
      </body>
    </html>
  );
}
