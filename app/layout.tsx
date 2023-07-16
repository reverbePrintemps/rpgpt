import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Header";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rpgpt",
  description: "An AI-powered, human driven text-based role playing game",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <header className="sticky top-0 z-[1]">
          <Navbar />
        </header>
        <div className="flex flex-col w-full max-w-4xl mx-auto stretch px-4 pt-10 pb-40 min-h-screen">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
    </html>
  );
}
