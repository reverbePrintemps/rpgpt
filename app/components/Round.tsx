import { CSSProperties, ChangeEvent, FormEvent, useState } from "react";
import { TextInput } from "./TextInput";
import Link from "next/link";

export type Round = {
  id: number;
  prompt: string;
  options:
    | {
        id: number;
        text: string;
      }[]
    | null;
  prompt_examples: string[] | null;
  game_over: "win" | "lose" | null;
};

interface RoundProps {
  onTextInputChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onChoiceSelected?: (input: string) => void;
  style?: CSSProperties;
  isLoading?: boolean;
  className?: string;
  round: Round;
}

const shouldRenderTextInput = (roundSubmitted: boolean, input: string) => {
  return !!input.length || !roundSubmitted;
};

export const Round = ({
  style,
  round,
  onSubmit,
  className,
  isLoading,
  onTextInputChange,
  onChoiceSelected: onClick,
}: RoundProps) => {
  const [input, setInput] = useState("");
  const [optionSelected, setOptionSelected] = useState<number>();
  const [roundSubmitted, setRoundSubmitted] = useState(false);
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    onTextInputChange?.(e);
  };
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    onSubmit?.(e);
    setRoundSubmitted(true);
  };

  return (
    <div
      key={round.prompt}
      className={`${className} mt-6 whitespace-pre-wrap`}
      style={style}
    >
      <p className="text-xl font-bold border-b-2 pb-1 border-gray-300">
        Storyteller
      </p>
      <div className="mt-2">
        <p>{round.prompt || "Loading..."}</p>
        {round.options && (
          <form onSubmit={handleOnSubmit}>
            {round.options.map((o) => (
              <button
                key={o.id}
                type="submit"
                className={`${
                  optionSelected === o.id ? "bg-slate-300" : "bg-stone-400"
                }
              ${optionSelected === undefined && "hover:bg-stone-600"}
              text-stone-800 p-2 rounded-lg m-2 ml-auto text-left disabled:opacity-40`}
                onClick={() => {
                  onClick?.(o.text);
                  setOptionSelected(o.id);
                }}
                // No basic tailwind for this
                style={{ minHeight: "40px" }}
                disabled={roundSubmitted}
              >
                {o.text}
              </button>
            ))}
          </form>
        )}
        {round.prompt_examples &&
          shouldRenderTextInput(roundSubmitted, input) && (
            <>
              {round.options && <p>or</p>}
              <TextInput
                input={input}
                isLoading={isLoading}
                onChange={handleOnChange}
                placeholders={round.prompt_examples}
                onSubmit={handleOnSubmit}
                disabled={roundSubmitted}
              />
            </>
          )}
        {round.game_over && (
          <Link
            href="/"
            className="bg-slate-300 text-stone-800 p-4 rounded-lg mt-8 ml-auto inline-block"
          >
            <button className="font-bold">New adventure</button>
          </Link>
        )}
      </div>
    </div>
  );
};
