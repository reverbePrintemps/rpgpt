"use client";
import { LocalStorageItems, getFromLocalStorage } from "./utils/local-storage";
import { Hero, Button, Link } from "react-daisyui";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = getFromLocalStorage(LocalStorageItems.Theme);
      theme && document.documentElement.setAttribute("data-theme", theme);
    }
  }, [
    typeof window !== "undefined" &&
      getFromLocalStorage(LocalStorageItems.Theme),
  ]);

  return (
    <Hero>
      <Hero.Content className="text-center" style={{ zIndex: "unset" }}>
        <div className="max-w-md">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline leading-[0]">
            rpgpt.
          </h1>
          <h2 className="mt-8">
            An AI-powered, human-driven text-based adventure role playing game.
          </h2>
          <h3 className="mt-16">”Be anyone, go anywhere, do anything.“</h3>
          <div className="mt-16">
            <Link href="/game">
              <Button color="primary" className="mt-8">
                Start adventure
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
