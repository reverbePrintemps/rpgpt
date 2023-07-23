"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { MAX_TOKENS_FREE_USER } from "@/app/constants/general";
import { initialMessages } from "../../constants/prompt";
import { Alert, Button, Progress } from "react-daisyui";
import { scrollToBottom } from "../../utils/scrolling";
import { updateUsage } from "@/app/firebase/functions";
import { useUserData } from "@/app/hooks/firebase";
import { forceParse } from "../../utils/parsing";
import { InfoIcon } from "@/app/assets/InfoIcon";
import { Round } from "../../components/Round";
import { auth } from "@/app/firebase/config";
import { TokenUsage } from "@/app/types";
import { useChat } from "ai/react";
import Link from "next/link";
import {
  LocalStorageItems,
  getFromLocalStorage,
} from "@/app/utils/local-storage";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const { isPaying, usage } = useUserData();
  const [isFinished, setIsFinished] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const signedIn = auth.currentUser?.uid;
  // TODO Unify usage from local storage and firebase
  const month = new Date().toLocaleDateString("default", { month: "long" });
  const [localTokenUsage, setLocalTokenUsage] = useState<TokenUsage | null>(
    null
  );
  const tokenUsage = signedIn ? usage?.[month] || 0 : localTokenUsage;

  // Need to wrap this in a useEffect to make sure window is defined before using local storage even though this is a client component. Not sure why.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localUsage = getFromLocalStorage(LocalStorageItems.TokenUsage);
      setLocalTokenUsage(localUsage);
    }
  }, []);

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
  });

  useEffect(() => {
    if (!isFinished) return;
    const lastTwoMessages = messages.slice(-2);
    updateUsage(lastTwoMessages);
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

  const tokenUsagePercentage = Math.round(
    (Number(tokenUsage) / MAX_TOKENS_FREE_USER) * 100
  );

  return (
    <div ref={ref} className="scroll-m-52 w-full text-neutral-content relative">
      {!isPaying && (
        <Alert status="info" icon={<InfoIcon />}>
          <div className="w-full justify-between gap-2">
            <h3 className="text-lg font-bold">Current usage</h3>
            <div>
              <Progress className="w-56" value={tokenUsagePercentage / 100} />{" "}
              {tokenUsagePercentage}%
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
      <h2 className={`font-bold text-2xl ${!isPaying ? "mt-8" : ""}`}>Game</h2>
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
            isLoading={latestRound && isWriting}
            onTextInputChange={handleInputChange}
            onChoiceSelected={handleRoundChoiceSelected}
          />
        );
      })}
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
