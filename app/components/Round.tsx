import { ReactNode, CSSProperties, useState } from "react";
import { completeJSON } from "../_utils/general";

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
        {round.prompt}
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
                className="bg-slate-300 text-stone-800 p-2 rounded-lg m-2 ml-auto text-left"
                onClick={() => {
                  onClick?.(o.text);
                }}
              >
                {o.text}
              </button>
            ))}
          </form>
        )}
      </div>
    </div>
  );
};
