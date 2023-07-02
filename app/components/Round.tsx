import {
  CSSProperties,
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { DiscordLogo } from "../assets/discord";
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
  onTryAgain?: () => void;
  style?: CSSProperties;
  latestRound?: boolean;
  isFinished?: boolean;
  isLoading?: boolean;
  className?: string;
  error?: Error;
  round: Round;
}

const shouldRenderTextInput = (roundSubmitted: boolean, input: string) => {
  return !!input.length || !roundSubmitted;
};

export const Round = ({
  style,
  round,
  error,
  onSubmit,
  className,
  isLoading,
  isFinished,
  onTryAgain,
  latestRound,
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
      <div className="divider">
        <h3 className="font-semibold text-xl">Storyteller</h3>
      </div>
      <div className="mt-2">
        <p>{round.prompt || "Loading..."}</p>
        {round.options && (
          <form className="flex flex-wrap" onSubmit={handleOnSubmit}>
            {round.options.map((o) => (
              <button
                key={o.id}
                type="submit"
                className={`btn btn-secondary normal-case ${
                  optionSelected?.id === o.id ? "btn-info" : ""
                }
               mr-2 my-2 text-left ${
                 roundSubmitted ? "opacity-30" : ""
                 //  TODO Probably a better way to do this than !important
               } !shrink`}
                onClick={() => {
                  onClick?.(o.text);
                  setOptionSelected(o);
                }}
                // TODO Use actual disabled state but override styles because not very accessible by default
                // disabled={isLoading || roundSubmitted}
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
              {round.options && <div className="divider">or</div>}
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
        {latestRound && round.game_over && (
          <>
            <Link href="/">
              <button className="btn btn-primary mt-8">New adventure</button>
            </Link>
            <div className="mt-4">
              <p className="prose">
                Enjoyed your adventure or have some feedback to share? Join our
                Discord!
              </p>
              <Link href="https://discord.gg/a22fWPUgQ" target="_blank">
                <button className="btn btn-secondary mt-4">
                  <DiscordLogo style={{ fill: "#5965f2" }} />
                  Join our Discord
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
      {isLoading && (
        <div className="w-full flex justify-center">
          <span className="loading loading-spinner loading-sm mt-4" />
        </div>
      )}
      {!round.options?.length &&
        !round.prompt_examples?.length &&
        isFinished &&
        error && (
          <div className="alert alert-error mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Oh no! Something went wrong.</span>
            <div className="flex">
              <button className="btn btn-primary" onClick={onTryAgain}>
                Try again
              </button>
              <Link href="/" className="btn btn-secondary ml-4">
                New game
              </Link>
            </div>
          </div>
        )}
    </div>
  );
};
