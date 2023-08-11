"use client";
import { Button } from "react-daisyui";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Thank you! 🎉</h1>
      <h2>Your payment has been processed.</h2>
      <p className="mt-8">Time to go on a new adventure!</p>
      <Link href="/game">
        <Button color="primary" className="mt-2">
          New Game
        </Button>
      </Link>
    </div>
  );
}
