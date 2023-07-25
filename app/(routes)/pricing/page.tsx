"use client";
import { Badge, Card, Hero } from "react-daisyui";
import { FAQ } from "@/app/components/FAQ";
import Link from "next/link";
import {
  MAX_TOKENS_FREE_USER,
  PRICE_PER_THOUSAND_TOKENS_USD,
} from "@/app/constants/general";

export default function Page() {
  return (
    <>
      <Hero>
        <Hero.Content>
          <div className="text-center">
            <h1>Pricing</h1>
          </div>
        </Hero.Content>
      </Hero>
      <div className="flex flex-col-reverse gap-8 mt-8 sm:flex-row">
        <Card className="shadow-2xl flex-1 mt-8 sm:mt-0 bg-base-content text-base-100">
          <Card.Body>
            <Card.Title>
              <h2>
                Free
                <label className="label label-text-alt text-base-200">
                  {MAX_TOKENS_FREE_USER} tokens
                </label>
              </h2>
            </Card.Title>
            <ul className="mt-8">
              <li>
                <h3>🗡️ It's dangerous to go alone! Take this</h3>
                <p className="mt-4 text-base-200">
                  {MAX_TOKENS_FREE_USER} tokens <strong>for free</strong>, on us
                </p>
              </li>
              <li>
                <h3>🎁 Full access</h3>
                <p className="mt-4 text-base-200">
                  Try out all the features, <strong>no time limit</strong>
                </p>
              </li>
            </ul>
            <Card.Actions className="justify-end mt-auto">
              <Link href="/game">
                <button className="btn btn-primary">Get started</button>
              </Link>
            </Card.Actions>
          </Card.Body>
        </Card>
        <Card className="shadow-2xl flex-1 relative bg-base-content text-base-100">
          <Badge className="absolute top-0 right-0 badge-accent badge-lg m-4">
            Recommended
          </Badge>
          <Card.Body>
            <Card.Title>
              <h2>
                Pay-as-you-go
                <label className="label label-text-alt text-base-200">
                  {PRICE_PER_THOUSAND_TOKENS_USD.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 3,
                  })}{" "}
                  / 1000 tokens
                </label>
              </h2>
            </Card.Title>
            <ul className="mt-8">
              <li>
                <h3>🆓 Start for free</h3>
                <p className="mt-4 text-base-200">
                  Start experimenting with{" "}
                  <strong>{MAX_TOKENS_FREE_USER} free tokens</strong>
                </p>
              </li>
              <li>
                <h3>😌 Pay only for what you use</h3>
                <p className="mt-4 text-base-200">
                  No minimum usage, no extra costs or hidden fees,{" "}
                  <strong>no shenanigans</strong>
                </p>
              </li>
              <li>
                <h3>📊 Real-time usage dashboard</h3>
                <p className="mt-4 text-base-200">
                  Keep track of your usage <strong>in real-time</strong>, right
                  from{" "}
                  <Link href="/auth/account" className="link ">
                    your account
                  </Link>
                </p>
              </li>
            </ul>
            <Card.Actions className="justify-end mt-8">
              <button className="btn btn-primary">Pay as you go</button>
            </Card.Actions>
          </Card.Body>
        </Card>
      </div>
      <FAQ />
    </>
  );
}
