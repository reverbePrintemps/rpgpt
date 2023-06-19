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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
