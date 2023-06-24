"use client";
import { AutogrowingInput } from "../components/AutogrowingInput";
import { forceParse, scrollToBottom } from "../utils/general";
import { useLatestRound } from "../hooks/latest-round";
import { typingEffect } from "../utils/typing-effect";
import { useEffect, useRef, useState } from "react";
import { Round } from "../components/Round";
import { useChat } from "ai/react";
import { Message } from "ai";

// TODO

// - [ ] Round probably doesn't need both an onClick and an onSubmit. Unify.
//2 - [ ] Rely on something else than messages to scroll to bottom to prevent slight jitter when messages are received but not yet able to be parsed and rendered

const roundExample: Round = {
  id: 0,
  prompt: "string",
  options: [{ id: 0, text: "string" }] || undefined,
  // A list of items that the player will get access to as the game progresses
  items:
    [
      {
        id: 0,
        name: "string",
        owner: "string" || undefined,
        current_holder: "player" || "npc" || "location" || undefined,
        location: "string" || undefined,
      },
    ] || undefined,
  // Property should only be defined when the game ends
  game_over: "win" || "lose" || undefined,
};

const initialMessages = [
  {
    id: "0",
    role: "system",
    content: `You are a text-based adventure game master. All of your responses should be strictly formatted like so: ${JSON.stringify(
      roundExample
    )}.`,
  },
  {
    id: "1",
    role: "assistant",
    // !Important: The prompt must be a stringified JSON object
    // TODO Add type safety to this somehow
    // Or make it safe for it to not be a stringified JSON object
    content:
      "What kind of adventure would you like to go on? You can provide as much or a little detail as you wish.",
  },
] as Message[];

const placeholderPrompts = [
  "I'm a hacker in a corrupt cyberpunk city. The Marauders are blackmailing me into hacking the Galactic Bank.",
  "I'm lazy, any adventure will do :)",
  "As an apprentice sorcerer, I must retrieve the artifact and restore balance to the kingdom!",
  "I'm a drunk pirate captain seeking the best rum in the Caribbean.",
  "What is love?",
  `"It's August 11, 2398, the Dyson Sphere around the Sun is complete. Humanity is now a Type II civilization."`,
  "World Sandwich Making Championship.",
  "Everybody was Kung Fu fighting when suddenly...",
  "Like Lord of the Rings, but with cats.",
  "What if Back to the Future was a horror movie?",
  "Surprise me!",
  "I am the high-priestess of Albondiga, the legendary capital city of the Meatballfolk and I must retrieve my spaghetti scepter.",
  "I have no inspiration, throw me a bone here.",
];

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const {
    latestRound,
    setMessage,
    setRound: setLatestRound,
  } = useLatestRound();

  const {
    isLoading: isWriting,
    handleInputChange,
    handleSubmit,
    messages,
    setInput,
    input,
  } = useChat({
    initialMessages,
    onResponse: () => setIsLoading(false),
    onFinish: (message) => {
      const parsed = forceParse(message.content) as Round;
      if (!parsed) return;
      setRounds((prev) => [...prev, parsed]);
      setLatestRound(null);
    },
  });

  const typingPlaceholders = typingEffect({
    cursor: true,
    typingSpeed: 30,
    repeat: Infinity,
    pauseLength: 1000,
    omitDeletionAnimation: true,
    sequence: placeholderPrompts,
  });

  useEffect(() => {
    process.env.NODE_ENV === "development" && console.log("messages", messages);
    setMessage(messages[messages.length - 1]);
    // TD2
    scrollToBottom(ref, "smooth", "end");
  }, [messages]);

  return (
    <div ref={ref} className="scroll-m-52">
      <h1 className="text-5xl font-bold">Game</h1>
      {rounds.map((round) => (
        <Round
          key={round.id}
          round={round}
          onChoiceSelected={setInput}
          onSubmit={(e) => {
            setIsLoading(true);
            handleSubmit(e);
          }}
        />
      ))}
      {latestRound && (
        <Round
          round={latestRound}
          onChoiceSelected={setInput}
          onSubmit={(e) => {
            setIsLoading(true);
            handleSubmit(e);
          }}
        />
      )}
      {!isWriting && !latestRound?.options && (
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
      {/* 
      // TODO Throw isLoading into Round component (?)
       */}
      {isLoading && (
        <div className="mt-6 whitespace-pre-wrap">
          <p className="text-xl font-bold border-b-2 pb-1 border-gray-300">
            Storyteller
          </p>
          <p className="mt-1">Loading...</p>
        </div>
      )}
    </div>
  );
}
