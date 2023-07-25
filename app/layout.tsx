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
    <html lang="en" data-theme="light">
      <body>
        <Header />
        <div className="flex flex-col w-full px-4 pt-8 pb-40 min-h-screen bg-base-100 mb-40 shadow-2xl">
          <div className="max-w-4xl mx-auto w-full">{children}</div>
        </div>
        <Footer />
        <Analytics />
      </body>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
    </html>
  );
}
