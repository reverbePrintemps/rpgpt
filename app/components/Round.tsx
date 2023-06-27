import {
  CSSProperties,
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { Theme } from "../constants/theme";
import { TextInput } from "./TextInput";
import Link from "next/link";

type RoundOption = {
  id: number;
  text: string;
  ui_theme: Theme;
};

export type Round = {
  id: number;
  prompt: string;
  options: RoundOption[] | null;
  prompt_examples: string[] | null;
  game_over: "win" | "lose" | null;
  ui_theme: Theme;
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
  const [optionSelected, setOptionSelected] = useState<RoundOption>();
  const [roundSubmitted, setRoundSubmitted] = useState(false);
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    onTextInputChange?.(e);
  };
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    onSubmit?.(e);
    setRoundSubmitted(true);
  };

  useEffect(() => {
    if (optionSelected)
      window.document
        .querySelector("html")
        ?.setAttribute("data-theme", optionSelected.ui_theme);
  }, [optionSelected]);

  useEffect(() => {
    if (round.ui_theme)
      window.document
        .querySelector("html")
        ?.setAttribute("data-theme", round.ui_theme);
  }, [round]);

  return (
    <div
      className={`${className || ""} mt-6 whitespace-pre-wrap`}
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
                className={`btn btn-secondary normal-case ${
                  optionSelected?.id === o.id ? "btn-info" : ""
                }
               m-2 ml-auto text-left ${
                 roundSubmitted ? "opacity-30" : "opacity-100"
               }`}
                onClick={() => {
                  onClick?.(o.text);
                  setOptionSelected(o);
                }}
                // TODO Use actual disabled state but override styles because not very accessible by default
                // disabled={roundSubmitted}
              >
                {o.text}
              </button>
            ))}
          </form>
        )}
        {!isLoading &&
          !!round.prompt_examples?.length &&
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
      {isLoading && (
        <span className="loading loading-spinner loading-sm mt-2" />
      )}
    </div>
  );
};
