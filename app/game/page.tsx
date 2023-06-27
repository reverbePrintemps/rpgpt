"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { initialMessages } from "../constants/general";
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
  }, [messages]);

  const handleRoundChoiceSelected = (input: string) => {
    setInput(input);
  };

  const handleRoundSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    handleSubmit(e);
  };

  return (
    <div ref={ref} className="scroll-m-52">
      <h1 className="text-5xl font-bold">Game</h1>
      {rounds.map((round) => (
        <Round
          key={round.id}
          round={round}
          onSubmit={handleRoundSubmit}
          onChoiceSelected={handleRoundChoiceSelected}
          onTextInputChange={handleInputChange}
          isLoading={isWriting}
        />
      ))}
      {isLoading && (
        <>
          <p className="mt-6 text-xl font-bold border-b-2 pb-1 border-gray-300">
            Storyteller
          </p>
          <div className="mt-2">
            <p>Loading...</p>
          </div>
        </>
      )}
    </div>
  );
}
