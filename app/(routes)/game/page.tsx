"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { MAX_TOKENS_FREE_USER } from "@/app/constants/general";
import { initialMessages } from "../../constants/prompt";
import { Alert, Button, Progress } from "react-daisyui";
import { scrollToBottom } from "../../utils/scrolling";
import { useUserData } from "@/app/hooks/firebase";
import { forceParse } from "../../utils/parsing";
import { InfoIcon } from "@/app/assets/InfoIcon";
import { Round } from "../../components/Round";
import { useChat } from "ai/react";
import Link from "next/link";
import { getTokens } from "@/app/utils/general";
import { updateTokenUsage, useTokenUsage } from "@/app/utils/database";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const { isPaying } = useUserData();
  const [isFinished, setIsFinished] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const {
    isLoading: isWriting,
    handleInputChange,
    handleSubmit,
    messages,
    setInput,
    reload,
  } = useChat({
    initialMessages,
    onResponse: () => {
      setIsLoading(false);
    },
    onFinish: (message) => {
      setIsFinished(true);
      if (!forceParse(message.content)) {
        setError(new Error("Failed to parse message"));
      }
    },
    onError: (error) => {
      setError(error);
      setIsLoading(false);
    },
  });

  const month = new Date().toLocaleDateString("default", { month: "long" });

  const tokenUsage = useTokenUsage(month);

  useEffect(() => {
    if (!isFinished) return;
    const lastTwoMessages = messages.slice(-2);
    const newTokens = getTokens(lastTwoMessages);
    if (newTokens) {
      updateTokenUsage(newTokens);
    }
  }, [isFinished, messages]);

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    const latestRound = latestMessage.content;
    const parsed = forceParse(latestRound) as Round;
    if (parsed) {
      setRounds((prevRounds) => {
        if (prevRounds[prevRounds.length - 1]?.id === parsed.id) {
          const updatedRounds = [...prevRounds];
          updatedRounds[updatedRounds.length - 1] = parsed;
          return updatedRounds;
        } else {
          return [...prevRounds, parsed];
        }
      });
    }
    scrollToBottom(ref, "smooth", "end");
    ["development", "test"].includes(process.env.NODE_ENV) &&
      console.log("messages", messages);
  }, [messages]);

  const handleRoundChoiceSelected = (input: string) => {
    setInput(input);
  };

  const handleRoundSubmit = (e: FormEvent<HTMLFormElement>) => {
    setError(undefined);
    setIsFinished(false);
    setIsLoading(true);
    handleSubmit(e);
  };

  const handleTryAgain = () => {
    setError(undefined);
    setIsFinished(false);
    reload();
  };

  const tokenUsagePercentage = tokenUsage
    ? Math.round((tokenUsage / MAX_TOKENS_FREE_USER) * 100)
    : 0;

  const exhaustedFreeTokens = tokenUsagePercentage >= 100;

  return (
    <div ref={ref} className="scroll-m-62 w-full relative">
      {!isPaying && (
        <Alert status="info" icon={<InfoIcon />}>
          <div className="w-full justify-between gap-2">
            <h3 className="text-lg font-bold">Current usage</h3>
            <div>
              <Progress className="w-56" value={tokenUsagePercentage / 100} />{" "}
              {Math.min(tokenUsagePercentage, 100)}%
            </div>
            <h4>
              As a Free user, your usage is limited to {MAX_TOKENS_FREE_USER}{" "}
              tokens.
            </h4>
          </div>
          <Link href="/pricing">
            <Button color="primary">Learn more</Button>
          </Link>
        </Alert>
      )}
      <div
        className={`
        ${exhaustedFreeTokens ? "bg-base-300 w-full h-full opacity-50 p-4" : ""}
        ${!isPaying ? "mt-8" : ""}`}
      >
        <h2 className="font-bold text-2xl">Game</h2>
        {rounds.map((round) => {
          const latestRound = rounds[rounds.length - 1].id === round.id;
          return (
            <Round
              key={round.id}
              round={round}
              error={error}
              isFinished={isFinished}
              latestRound={latestRound}
              onTryAgain={handleTryAgain}
              onSubmit={handleRoundSubmit}
              disabled={exhaustedFreeTokens}
              isLoading={latestRound && isWriting}
              onTextInputChange={handleInputChange}
              onChoiceSelected={handleRoundChoiceSelected}
            />
          );
        })}
      </div>
      {exhaustedFreeTokens && (
        <>
          <h2 className={`font-bold text-2xl ${!isPaying ? "mt-8" : ""}`}>
            Game over
          </h2>
          <p className="mt-8">
            To continue using <strong>rpgpt</strong>, simply enter your payment
            details to pay-as-you-go. For more information: check out out our{" "}
            <Link href="/pricing" className="link">
              pricing page
            </Link>
            .
          </p>
          <Link href="/pricing">
            <Button color="primary" className="mt-8">
              Enter payment details
            </Button>
          </Link>
        </>
      )}
      {!error && isLoading && (
        <>
          <div className="divider">
            <h3 className="font-semibold text-xl">Storyteller</h3>
          </div>
          <div className="mt-2">
            <p>Loading...</p>
          </div>
        </>
      )}
    </div>
  );
}
