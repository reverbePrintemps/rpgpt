import { Analytics } from "@vercel/analytics/react";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "rpgpt",
  description: "An AI-powered, human driven text-based role playing game",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light" className="bg-neutral">
      <body className="bg-white">
        <header className="sticky top-0 z-[1]">
          <Header />
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
