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
    <html lang="en">
      <body>
        {["test", "development"].includes(process.env.NODE_ENV) && (
          <div className="bg-info p-2 flex">
            <p className="m-auto text-info-content">
              {process.env.NODE_ENV.substring(0, 1)
                .toUpperCase()
                .concat(process.env.NODE_ENV.substring(1))}{" "}
              environment
            </p>
          </div>
        )}
        <Header />
        <div className="flex flex-col w-full px-4 pt-8 pb-40 min-h-screen bg-base-100 mb-40 shadow-2xl">
          <div className="max-w-4xl mx-auto w-full">{children}</div>
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
