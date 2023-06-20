"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl font-bold">rpgpt.</h1>
      <h2 className="text-2xl font-bold mt-8">
        An AI-powered, human-driven text-based adventure role playing game
      </h2>
      <Link
        href="/game"
        className="bg-slate-300 text-stone-800 p-4 rounded-lg mt-8 ml-auto"
      >
        <button className="font-bold">Start game</button>
      </Link>
    </div>
  );
}
