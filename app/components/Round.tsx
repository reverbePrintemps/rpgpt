import { ReactNode, CSSProperties, useState } from "react";
import Link from "next/link";

export type Round = {
  prompt: string;
  options?: {
    id: number;
    text: string;
  }[];
  items?: [
    {
      id: number;
      name: string;
      owner?: string;
      current_holder: string;
      location?: string;
    }
  ];
  game_over?: "win" | "lose";
};

interface RoundProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  round: Round;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChoiceSelected?: (input: string) => void;
}

export const Round = ({
  children,
  className,
  style,
  round,
  onSubmit,
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
                disabled={optionSelected !== undefined}
              >
                {o.text}
              </button>
            ))}
          </form>
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
