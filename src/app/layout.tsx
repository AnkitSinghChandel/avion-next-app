import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "animate.css";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";
import Loader from "@/src/components/common/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avion",
  description: "Enterprise operations platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <StoreProvider>{children}</StoreProvider> */}
        <StoreProvider>
          <Suspense fallback={<AppFallback />}>{children}</Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}

function AppFallback() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader />
    </div>
  );
}
