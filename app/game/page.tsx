"use client";
import { forceParse, scrollToBottom } from "../utils/general";
import { useLatestRound } from "../hooks/latest-round";
import { useEffect, useRef, useState } from "react";
import { Round } from "../components/Round";
import { useChat } from "ai/react";
import { Message } from "ai";

// TODO
// - [ ] Cleanup and commit
// - [ ] Throw JSON parsing errors to be able to improve completeJSON function
// - [ ] Show prompt options (ie buttons) as they are received
// - [ ] Append latest round to the rest of the rounds
// - [ ] Round probably doesn't need both an onClick and an onSubmit. Unify.
//3 - [ ] Rotating placeholder text (cf. Spork)
// - [ ] Autogrowing textarea (cf. Spork)
//2 - [ ] Rely on something else than messages to scroll to bottom to prevent slight jitter when messages are received but not yet able to be parsed and rendered

const roundExample: Round = {
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
    content: `{ "id": "0", "prompt": "What kind of adventure would you like to go on? You can provide as much or a little detail as you wish." }`,
  },
] as Message[];

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
    //TD3
    // initialInput: "",
  });

  useEffect(() => {
    setMessage(messages[messages.length - 1]);
    // TD2
    scrollToBottom(ref, "smooth", "end");
  }, [messages]);

  return (
    <div ref={ref} className="scroll-m-52">
      <h1 className="text-5xl font-bold">Game</h1>
      {rounds.map((round) => (
        <Round
          key={round.prompt}
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
      {/* // TODO A bit confusing. Should be simplified. */}
      {!isWriting && latestRound && !latestRound.options && (
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            setIsLoading(true);
            handleSubmit(e);
          }}
        >
          <div className="left-0 flex">
            <input
              className=" w-full max-w-md p-2 mt-8 border border-gray-300 rounded shadow-xl bg-stone-700"
              value={input}
              placeholder="Type your response here..."
              onChange={handleInputChange}
            />
            <button
              className="bg-slate-300 text-stone-800 p-4 rounded-lg mt-8 ml-4 font-bold disabled:opacity-50"
              type="submit"
              disabled={isWriting || input === ""}
            >
              Send
            </button>
          </div>
        </form>
      )}
      {/* 
      // TODO Throw isLoading into Round component
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
