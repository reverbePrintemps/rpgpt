import { CSSProperties, ChangeEvent, FormEvent } from "react";
import { useTypingEffect } from "../utils/typing-effect";
import { AutogrowingInput } from "./AutogrowingInput";
import { Button } from "react-daisyui";

interface TextInputProps {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  placeholders?: string[];
  style?: CSSProperties;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  input?: string;
}

export const TextInput = ({
  placeholders,
  isLoading,
  className,
  onSubmit,
  onChange,
  disabled: disabledProp,
  input,
  style,
}: TextInputProps) => {
  const disabledInput = disabledProp || isLoading;
  const disabledButton = disabledProp || isLoading || !input?.length;
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
      className={`${className || ""} flex flex-col mt-4`}
      onSubmit={onSubmit}
      style={style}
    >
      <div className="flex items-end">
        <AutogrowingInput
          onChange={onChange}
          placeholder={
            isLoading
              ? "Loading..."
              : disabledInput
              ? input || ""
              : typingPlaceholders
          }
          value={input || ""}
          isLoading={isLoading}
          disabled={disabledInput}
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
        <Button className="ml-4" type="submit" disabled={disabledButton}>
          Send
        </Button>
      </div>
    </form>
  );
};
