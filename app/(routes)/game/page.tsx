"use client";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { MAX_TOKENS_FREE_USER } from "@/app/constants/general";
import { initialMessages } from "../../constants/prompt";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert, Badge, Button, Progress } from "react-daisyui";
import { scrollToBottom } from "../../utils/scrolling";
import { updateUsage } from "@/app/firebase/functions";
import { useUserData } from "@/app/hooks/firebase";
import { forceParse } from "../../utils/parsing";
import { InfoIcon } from "@/app/assets/InfoIcon";
import { Round } from "../../components/Round";
import { auth } from "@/app/firebase/config";
import { useChat } from "ai/react";
import Link from "next/link";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const [user] = useAuthState(auth);
  const { isPaying } = useUserData();
  const [isFinished, setIsFinished] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const localTokenUsage = localStorage.getItem("token-usage");

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
      } else {
        updateUsageCallback();
      }
    },
  });

  const updateUsageCallback = useCallback(() => {
    // TODO We're passing the last 2 messages to update usage for a prompt-response cycle. Not great but it'll do for now.
    const lastTwoMessages = messages.slice(-2);
    updateUsage(lastTwoMessages);
  }, [messages]);

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
    (Number(localTokenUsage) / MAX_TOKENS_FREE_USER) * 100
  );

  return (
    <div ref={ref} className="scroll-m-52 w-full">
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
      {!isPaying && (
        <Alert status="info" icon={<InfoIcon />} className="mt-8">
          <div className="w-full flex-row justify-between gap-2">
            <h3 className="text-lg font-bold">Current usage</h3>
            <div>
              <Progress className="w-56" value={tokenUsagePercentage / 100} />
              {tokenUsagePercentage && (
                <Badge className="ml-4">
                  {`${localTokenUsage} tokens  (${tokenUsagePercentage}%)`}
                </Badge>
              )}
            </div>
            <h4>
              As a Free user, your usage is limited to
              <Badge className="mx-2">{MAX_TOKENS_FREE_USER}</Badge>
              tokens.
            </h4>
            <Link href="/auth/signin">
              <h4 className="link">Paying user? Sign in</h4>
            </Link>
          </div>
          <Link href="/pricing">
            <Button color="primary">Learn more</Button>
          </Link>
        </Alert>
      )}
    </div>
  );
}
