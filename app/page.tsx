"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="max-w-md flex flex-col">
          <h1 className="text-5xl font-bold">rpgpt.</h1>
          <h2 className="text-2xl font-bold mt-8">
            An AI-powered, human-driven text-based adventure role playing game
          </h2>
          <div className="mt-8 ml-auto">
            <Link href="/game">
              <button className="btn btn-primary ">Start game</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
