"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="prose max-w-md flex flex-col">
          <h1>rpgpt.</h1>
          <h2>
            An AI-powered, human-driven text-based adventure role playing game
          </h2>
          <div className="mt-8 ml-auto">
            <Link href="/game">
              <button className="btn btn-primary" disabled>
                Start game
              </button>
            </Link>
          </div>
          <a
            className="w-48 ml-auto"
            href="https://www.buymeacoffee.com/jandreo"
            target="_blank"
          >
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a tea&emoji=🍵&slug=jandreo&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00" />
          </a>
        </div>
      </div>
    </div>
  );
}
