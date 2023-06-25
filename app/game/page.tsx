"use client";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { forceParse, scrollToBottom } from "../utils/general";
import { initialMessages } from "../constants/general";
import { TextInput } from "../components/TextInput";
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
    input,
  } = useChat({
    initialMessages,
    onResponse: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    process.env.NODE_ENV === "development" && console.log("messages", messages);
    const latestMessage = messages[messages.length - 1];
    const parsed = forceParse(latestMessage.content) as Round;
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

  const handleFreeTextSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    handleSubmit(e);
  };

  return (
    <div ref={ref} className="scroll-m-52">
      <h1 className="text-5xl font-bold">Game</h1>
      {rounds.map((round) => (
        <Fragment key={round.id}>
          <Round
            round={round}
            onSubmit={handleRoundSubmit}
            onChoiceSelected={handleRoundChoiceSelected}
          />
          {!isWriting &&
            round.id === rounds[rounds.length - 1].id &&
            !round.options && (
              <TextInput
                input={input}
                isLoading={isWriting}
                onChange={(e) => handleInputChange(e)}
                // placeholders={round.freetext_prompt_placeholders}
                onSubmit={handleFreeTextSubmit}
              />
            )}
        </Fragment>
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
