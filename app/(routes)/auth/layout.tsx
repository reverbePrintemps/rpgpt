"use client";
import { Hero } from "react-daisyui";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Hero>
      <Hero.Content
        className="flex-col text-neutral-content"
        // Necessary to show the Toasts above the Hero
        style={{ zIndex: "unset" }}
      >
        {children}
      </Hero.Content>
    </Hero>
  );
}
