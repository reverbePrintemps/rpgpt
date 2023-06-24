"use client";
import { initialMessages, placeholderPrompts } from "../constants/general";
import { AutogrowingInput } from "../components/AutogrowingInput";
import { useLatestRound } from "../hooks/latest-round";
import { typingEffect } from "../utils/typing-effect";
import { useEffect, useRef, useState } from "react";
import { scrollToBottom } from "../utils/general";
import { Round } from "../components/Round";
import { useChat } from "ai/react";

// TODO

// - [ ] Round probably doesn't need both an onClick and an onSubmit. Unify.
//2 - [ ] Rely on something else than messages to scroll to bottom to prevent slight jitter when messages are received but not yet able to be parsed and rendered

/* // TODO Use when implementing first person dialogue mode
content: `You are a text-based adventure game master. You will assume the role of various characters throughout the game and engage solely in dialogue with the player. The player will have the choice of various dialogue responses. All of your responses should be strictly formatted like so: ${JSON.stringify(
      roundExample
    )}.`,
*/

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
    // TD2
    scrollToBottom(ref, "smooth", "end");
  }, [messages]);

  const typingPlaceholders = typingEffect({
    cursor: true,
    typingSpeed: 30,
    repeat: Infinity,
    pauseLength: 1000,
    omitDeletionAnimation: true,
    sequence: placeholderPrompts,
  });

  return (
    <div ref={ref} className="scroll-m-52">
      <h1 className="text-5xl font-bold">Game</h1>
      {rounds.map((round) => (
        <Round
          round={round}
          key={round.id}
          onChoiceSelected={(input) => {
            setInput(input);
          }}
          onSubmit={(e) => {
            setIsLoading(true);
            handleSubmit(e);
          }}
        />
      ))}
      {isLoading && <p>Loading...</p>}
      {latestRound && (
        <>
          <Round
            round={latestRound}
            onChoiceSelected={(input) => {
              setInput(input);
              setRounds((prev) => [...prev, latestRound]);
              setLatestRound(null);
            }}
            onSubmit={(e) => {
              handleSubmit(e);
              setIsLoading(true);
              setRounds((prev) => [...prev, latestRound]);
              setLatestRound(null);
            }}
          />
          {latestRound.free_text && (
            <form
              className="flex flex-col mt-4"
              onSubmit={(e) => {
                setIsLoading(true);
                handleSubmit(e);
              }}
            >
              <div className="left-0 flex">
                <AutogrowingInput
                  onChange={handleInputChange}
                  placeholder={typingPlaceholders}
                  value={input}
                  onEnter={() =>
                    handleSubmit(
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
        </>
      )}
    </div>
  );
}
