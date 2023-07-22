"use client";
import { Hero, Button, Link } from "react-daisyui";

export default function Page() {
  return (
    <Hero>
      <Hero.Content className="text-center" style={{ zIndex: "unset" }}>
        <div className="max-w-md prose text-neutral-content">
          <h1 className="text-5xl sticky top-0 text-neutral-content">rpgpt.</h1>
          <p className="text-2xl">
            An AI-powered, human-driven text-based adventure role playing game.
          </p>
          <p className="text-2xl">
            <strong className="text-neutral-content">Try for free.</strong>
          </p>
          <p className="text-xl">Then pay as you go.</p>
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
