import { Header } from "./components/Header";
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
    <html lang="en" className="bg-stone-800 text-slate-300">
      <body className={inter.className}>
        <Header />
        <div className="flex flex-col w-full max-w-md py-8 mx-auto stretch px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
