import { CSSProperties, FormEvent, useState } from "react";
import Link from "next/link";

export type Round = {
  id: number;
  prompt: string;
  options?: {
    id: number;
    text: string;
  }[];
  freetext_prompt_placeholders: string[] | null;
  game_over?: "win" | "lose";
};

interface RoundProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onChoiceSelected?: (input: string) => void;
  style?: CSSProperties;
  className?: string;
  round: Round;
}

export const Round = ({
  style,
  round,
  onSubmit,
  className,
  onChoiceSelected: onClick,
}: RoundProps) => {
  const [optionSelected, setOptionSelected] = useState<number>();
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
          <form
            onSubmit={(e) => {
              onSubmit?.(e);
            }}
          >
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
                disabled={optionSelected !== undefined}
              >
                {o.text}
              </button>
            ))}
          </form>
        )}
        {/* {!round.options && (
          <TextInput
            input={input}
            placeholders={round.prompt_placeholders}
            isLoading={false}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        )} */}
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
