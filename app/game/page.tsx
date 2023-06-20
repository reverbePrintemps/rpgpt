"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { Message } from "ai";

export type Round = {
  id: string;
  prompt: string;
  options:
    | {
        a: { text: string };
        b: { text: string };
      }
    | undefined;
  game_over: "win" | "lose" | undefined;
};

const roundExample: Round = {
  id: "string",
  prompt: "string",
  options:
    {
      a: { text: "string" },
      b: { text: "string" },
    } || undefined,
  game_over: "win" || "lose" || undefined,
};

// TODO, add to system message once found a JSON parser that works for streams
// , strictly formatted in valid JSON, like so: ${JSON.stringify(
//   roundExample
// )}, and nothing more.

const initMessages = [
  {
    id: "0",
    role: "system",
    content:
      "You are a text-based adventure game master. The game will take place in a specific universe that will soon be provided by the player and will last a maximum of three rounds. Each round, you will present the player with one prompt and two actions to choose from. Once the player has provided you with an action, you will provide a new prompt based on their choice. The game ends either with the player's death or with a successful completion of the game's objective.",
  },
  {
    id: "1",
    role: "assistant",
    content: "What universe would you like your game to take place in?",
  },
] as Message[];

function scrollToBottom(ref: RefObject<HTMLDivElement>) {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleInputChange,
    handleSubmit,
    setMessages,
    messages,
    input,
    isLoading: isWriting,
  } = useChat({ onResponse: () => setIsLoading(false) });

  useEffect(() => {
    setMessages(initMessages);
  }, []);

  useEffect(() => {
    scrollToBottom(ref);
  }, [messages, isWriting, input]);

  return (
    <div ref={ref}>
      {messages.length > 0
        ? messages.map((m) => {
            const isSystemMessage = m.role === "system";
            return (
              !isSystemMessage && (
                <div key={m.id} className="mt-6 whitespace-pre-wrap">
                  <p className="font-bold border-b border-gray-300">
                    {m.role === "user" ? "You " : "Game Master "}
                  </p>
                  <p className="mt-1">{m.content}</p>
                </div>
              )
            );
          })
        : null}
      {isLoading && (
        <div className="mt-6 whitespace-pre-wrap">
          <p className="font-bold border-b border-gray-300">Game Master</p>
          <p className="mt-1">Loading...</p>
        </div>
      )}
      {messages.length > 0 && (
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            setIsLoading(true);
            handleSubmit(e);
          }}
        >
          {!isWriting && (
            <input
              className="w-full max-w-md p-2 mt-8 border border-gray-300 rounded shadow-xl bg-stone-700 "
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
              autoFocus
            />
          )}
          {input && (
            <button
              className="bg-slate-300 text-stone-800 p-4 rounded-lg mt-8 ml-auto font-bold"
              type="submit"
            >
              Send
            </button>
          )}
        </form>
      )}
    </div>
  );
}
