"use client";
import { initialMessages, placeholderPrompts } from "../constants/general";
import { AutogrowingInput } from "../components/AutogrowingInput";
import { useLatestRound } from "../hooks/latest-round";
import { typingEffect } from "../utils/typing-effect";
import { useEffect, useRef, useState } from "react";
import { scrollToBottom } from "../utils/general";
import { Round } from "../components/Round";
import { useChat } from "ai/react";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    latestRound,
    setMessage,
    setRound: setLatestRound,
  } = useLatestRound();

  const {
    handleSubmit,
    messages,
    setInput,
    input,
    handleInputChange,
    isLoading: isWriting,
  } = useChat({
    initialMessages,
    onResponse: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    process.env.NODE_ENV === "development" && console.log("messages", messages);
    setMessage(messages[messages.length - 1]);
    scrollToBottom(ref, "smooth", "end");
  }, [messages]);

  useEffect(() => {
    if (latestRound) {
      if (latestRound.id === rounds[rounds.length - 1]?.id) {
        // Replace the latest round in rounds array
        setRounds((prevRounds) => {
          const updatedRounds = [...prevRounds];
          updatedRounds[updatedRounds.length - 1] = latestRound;
          return updatedRounds;
        });
      } else {
        // Append the latest round to the rounds array
        setRounds((prevRounds) => [...prevRounds, latestRound]);
      }
      setLatestRound(null);
    }
  }, [latestRound, setLatestRound, rounds]);

  const typingPlaceholders = typingEffect({
    cursor: true,
    typingSpeed: 30,
    repeat: Infinity,
    pauseLength: 1000,
    omitDeletionAnimation: true,
    sequence: placeholderPrompts,
  });

  const handleRoundChoiceSelected = (input: string) => {
    setInput(input);
  };

  const handleRoundSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    handleSubmit(e);
  };

  const handleFreeTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    handleSubmit(e);
  };

  const renderRounds = () => {
    return rounds.map((round) => (
      <Round
        round={round}
        key={round.id}
        onChoiceSelected={handleRoundChoiceSelected}
        onSubmit={handleRoundSubmit}
      />
    ));
  };

  return (
    <div ref={ref} className="scroll-m-52">
      <h1 className="text-5xl font-bold">Game</h1>
      {renderRounds()}
      {isLoading && <p>Loading...</p>}
      {latestRound && latestRound.free_text && (
        <form className="flex flex-col mt-4" onSubmit={handleFreeTextSubmit}>
          <div className="left-0 flex">
            <AutogrowingInput
              onChange={handleInputChange}
              placeholder={typingPlaceholders}
              value={input}
              onEnter={() =>
                handleRoundSubmit(
                  new Event("submit", {
                    cancelable: true,
                    bubbles: true,
                  }) as any
                )
              }
            />
            <button
              className="bg-slate-300 text-stone-800 p-2 rounded-lg ml-4 font-bold disabled:opacity-50"
              type="submit"
              disabled={isWriting || input === ""}
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
