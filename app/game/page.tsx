"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { initialMessages } from "../constants/prompt";
import { scrollToBottom } from "../utils/scrolling";
import { forceParse } from "../utils/parsing";
import { Round } from "../components/Round";
import { useChat } from "ai/react";
import Link from "next/link";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
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
  });

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
    process.env.NODE_ENV === "development" && console.log("messages", messages);
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
    </div>
  );
}
