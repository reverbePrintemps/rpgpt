"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect } from "react";

const initMessages = [
  {
    id: "0",
    role: "system",
    content:
      "You are a text-based adventure game master. The game will take place in the Star Wars universe and will last a maximum of three rounds. Each round, you will present the player with one prompt and two actions to choose from. Once the player has provided you with an action, you will provide a new prompt based on their choice. The game ends either with the player's death or with a successful completion of the game's objective.",
  },
  {
    id: "1",
    role: "user",
    content: "I'm ready to play!",
  },
] as Message[];

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    reload,
  } = useChat();

  useEffect(() => {
    setMessages(initMessages);
    reload();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0
        ? messages.map((m) => {
            return (
              m.id > "1" && (
                <div key={m.id} className="whitespace-pre-wrap">
                  {m.role === "user" ? "User: " : "AI: "}
                  {m.content}
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
