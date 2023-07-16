"use client";
import { Hero, Button, Link } from "react-daisyui";

export default function Page() {
  return (
    <Hero>
      <Hero.Content className="text-center">
        <div className="max-w-md prose">
          <h1 className="text-6xl">rpgpt.</h1>
          <p className="text-2xl">
            An AI-powered, human-driven text-based adventure role playing game.
          </p>
          <Link href="/game">
            <Button color="primary" className="mt-8">
              Start adventure
            </Button>
          </Link>
        </div>
      </Hero.Content>
    </Hero>
  );
}
