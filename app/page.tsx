"use client";
import { Hero, Button, Link } from "react-daisyui";

export default function Page() {
  return (
    <Hero>
      <Hero.Content className="text-center">
        <div>
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline">
            rpgpt.
          </h1>
          <label className="label">
            <div className="m-auto">
              An AI-powered, text-based adventure game.
            </div>
          </label>
          <h2 className="mt-8">Be anyone, go anywhere, do anything.</h2>
          <div className="mt-10">
            <Link href="/game">
              <Button color="primary" className="mt-8">
                New Game
              </Button>
            </Link>
            <label className="label label-text-alt mt-2">
              <div className="m-auto">
                <strong>Try for free.</strong> Then pay as you go.
              </div>
            </label>
          </div>
        </div>
      </Hero.Content>
    </Hero>
  );
}
