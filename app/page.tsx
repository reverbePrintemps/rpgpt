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
              <button className="btn btn-primary">Start game</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
