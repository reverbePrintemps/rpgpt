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
          <div className="p-4 bg-neutral">
            <p className="p-4 bg-red-600 text-white rounded-lg">
              📣 Due to a sudden and unexpected increase in popularity for this
              app, I have had to revoke the API key as I cannot currently incur
              the costs. Instead you will find a "buy me a tea" button where you
              can donate in any way you can. Hopefully, with a bit of help we'll
              be able to bring the adventure back online very soon. Apologies
              for the inconvenience! 📣
            </p>
          </div>
        </header>
        <div className="flex flex-col w-full max-w-md mx-auto stretch px-4 pt-10 pb-40">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
