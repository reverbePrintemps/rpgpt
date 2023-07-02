"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { initialMessages } from "../constants/prompt";
import { scrollToBottom } from "../utils/scrolling";
import { forceParse } from "../utils/parsing";
import { Round } from "../components/Round";
import { useChat } from "ai/react";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isLoading: isWriting,
    handleInputChange,
    handleSubmit,
    messages,
    setInput,
  } = useChat({
    initialMessages,
    onResponse: () => {
      setIsLoading(false);
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
    setIsLoading(true);
    handleSubmit(e);
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
            latestRound={latestRound}
            onSubmit={handleRoundSubmit}
            onChoiceSelected={handleRoundChoiceSelected}
            onTextInputChange={handleInputChange}
            isLoading={latestRound && isWriting}
          />
        );
      })}
      {isLoading && (
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
