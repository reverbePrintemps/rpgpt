import { CSSProperties, ChangeEvent, FormEvent } from "react";
import { AutogrowingInput } from "./AutogrowingInput";
import { useTypingEffect } from "../utils/typing-effect";

interface TextInputProps {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  placeholders?: string[];
  style?: CSSProperties;
  isLoading?: boolean;
  className?: string;
  input?: string;
}

export const TextInput = ({
  placeholders,
  isLoading,
  className,
  onSubmit,
  onChange,
  input,
  style,
}: TextInputProps) => {
  // TODO: Implement typing effect but careful with "Maximum depth exceeded" error
  const typingPlaceholders = useTypingEffect({
    cursor: true,
    typingSpeed: 30,
    repeat: Infinity,
    pauseLength: 1000,
    omitDeletionAnimation: true,
    sequence: placeholders || ["Type your response here..."],
  });

  return (
    <form
      className={`${className} flex flex-col mt-4`}
      onSubmit={onSubmit}
      style={style}
    >
      <div className="left-0 flex">
        <AutogrowingInput
          onChange={onChange}
          placeholder={typingPlaceholders}
          value={input || ""}
          onEnter={() =>
            onSubmit &&
            onSubmit(
              new Event("submit", {
                cancelable: true,
                bubbles: true,
              }) as any
            )
          }
        />
        <button
          className="bg-slate-300 text-stone-800 p-2 rounded-lg ml-4 font-bold disabled:opacity-50"
          type="submit"
          disabled={isLoading || input === ""}
        >
          Send
        </button>
      </div>
    </form>
  );
};
