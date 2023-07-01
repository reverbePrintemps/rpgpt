import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Header";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rpgpt",
  description: "An AI-powered, human driven text-based role playing game",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <header>
          <Navbar />
        </header>
        <div className="flex flex-col w-full max-w-md mx-auto stretch px-4 pt-10 pb-40">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
