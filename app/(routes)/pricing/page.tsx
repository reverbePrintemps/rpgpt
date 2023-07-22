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
          <div className="text-center prose">
            <h1 className="text-neutral-content">Pricing</h1>
          </div>
        </Hero.Content>
      </Hero>
      <div className="flex flex-col-reverse gap-8 mt-8 sm:flex-row ">
        <Card className="shadow-2xl flex-1 mt-8 sm:mt-0 bg-neutral-content">
          <Card.Body>
            <Card.Title>
              <div className="prose">
                <h2>
                  Free
                  <label className="label label-text-alt">
                    {MAX_TOKENS_FREE_USER} tokens
                  </label>
                </h2>
              </div>
            </Card.Title>
            <ul className="list-none prose ">
              <li>
                <h3>🗡️ It's dangerous to go alone! Take this</h3>
                <p>
                  {MAX_TOKENS_FREE_USER} tokens <strong>for free</strong>, on us
                </p>
              </li>
              <li>
                <h3>🎁 Full access</h3>
                <p>
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
        <Card className="shadow-2xl flex-1 relative text-neutral bg-neutral-content">
          <Badge className="absolute top-0 right-0 badge-accent  badge-lg m-4">
            Recommended
          </Badge>
          <Card.Body>
            <Card.Title>
              <div className="prose">
                <h2>
                  Pay-as-you-go
                  <label className="label label-text-alt">
                    {PRICE_PER_THOUSAND_TOKENS_USD.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 3,
                    })}{" "}
                    / 1000 tokens
                  </label>
                </h2>
              </div>
            </Card.Title>
            <ul className="list-none prose">
              <li>
                <h3>🆓 Start for free</h3>
                <p>
                  Start experimenting with{" "}
                  <strong>{MAX_TOKENS_FREE_USER} free tokens</strong>
                </p>
              </li>
              <li>
                <h3>😌 Pay only for what you use</h3>
                <p>
                  No minimum usage, no extra costs or hidden fees,{" "}
                  <strong className="text-neutral-focus">no shenanigans</strong>
                </p>
              </li>
              <li>
                <h3>📊 Real-time usage dashboard</h3>
                <p>
                  Keep track of your usage <strong>in real-time</strong>, right
                  from{" "}
                  <Link href="/auth/account" className="link ">
                    your account
                  </Link>
                </p>
              </li>
            </ul>
            <Card.Actions className="justify-end mt-auto">
              <button className="btn btn-primary">Pay as you go</button>
            </Card.Actions>
          </Card.Body>
        </Card>
      </div>
      <FAQ />
    </>
  );
}
