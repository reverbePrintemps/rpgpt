"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect } from "react";

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

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();

  useEffect(() => {
    setMessages(initMessages);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0
        ? messages.map((m) => {
            const isSystemMessage = m.role === "system";
            return (
              !isSystemMessage && (
                <div key={m.id} className="mt-6 whitespace-pre-wrap">
                  <p>{m.role === "user" ? "User " : "Game Master "}</p>
                  <p className="mt-1">{m.content}</p>
                </div>
              )
            );
          })
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
