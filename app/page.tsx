"use client";
import Link from "next/link";
import { DiscordLogo } from "./assets/discord";

export default function Page() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="prose max-w-4xl flex flex-col">
          <h1>rpgpt.</h1>
          <h2>
            An AI-powered, human-driven text-based adventure role playing game
          </h2>
          <div className="alert alert-warning mt-2 flex flex-col sm:flex-row max-w-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex flex-col items-end">
              <p className="ml-2 text-left">
                Due to a sudden increase in popularity, I find myself unable to
                continue incurring the maintenance costs for rpgpt. If you
                enjoyed rpgpt and would like to see its development renewed,
                please consider donating to help cover the costs. Alternatively,
                join our Discord to express potential interest in a paid version
                of rpgpt. 💔
              </p>
              <div className="flex flex-col items-end">
                <Link
                  href="https://www.buymeacoffee.com/jandreo"
                  target="_blank"
                  className="block"
                >
                  <button className="btn btn-md btn-primary">
                    🍵 Buy me a tea
                  </button>
                </Link>
                <Link href="https://discord.gg/a22fWPUgQ" target="_blank">
                  <button className="btn btn-neutral mt-2">
                    <DiscordLogo style={{ fill: "#5965f2" }} />
                    Join our Discord
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
