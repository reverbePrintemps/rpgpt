import { useEffect, useRef, useState } from "react";

import "../styles/AutogrowingInput.css";

type AutogrowingInputProps = {
  rows?: number;
  cols?: number;
  value: string;
  focus?: boolean;
  className?: string;
  placeholder: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onEnter?: () => void;
  onChange: (value: any) => void;
};

export const AutogrowingInput = ({
  rows,
  cols,
  focus,
  value,
  onBlur,
  onEnter,
  onFocus,
  onChange,
  className,
  placeholder,
}: AutogrowingInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(focus || false);
  const [inputValue, setInputValue] = useState<string>(value);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    focus && inputRef.current?.focus();
  }, [focus]);

  return (
    <div className="AutogrowingInput__container">
      <div
        className="AutogrowingInput"
        data-replicated-value={isFocused ? "" : inputValue || placeholder}
      >
        <textarea
          ref={inputRef}
          rows={rows ?? 1}
          cols={cols ?? 1}
          placeholder={isFocused ? "" : placeholder}
          className={`AutogrowingInput__textarea ${className || ""}`}
          // * Not sure about difference from using onInput
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter && onEnter();
            }
          }}
          autoFocus={focus}
          value={inputValue}
          autoComplete={"off"}
          data-lpignore={"true"}
          data-form-type={"other"}
          spellCheck={false}
          onFocus={(e) => {
            setIsFocused(true);
            e.target.setSelectionRange(
              e.target.value.length,
              e.target.value.length
            );
            onFocus && onFocus();
          }}
          onBlur={() => {
            onBlur && onBlur();
          }}
        />
      </div>
    </div>
  );
};
