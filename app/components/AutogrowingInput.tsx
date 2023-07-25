import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import "../styles/AutogrowingInput.css";

interface AutogrowingInputProps {
  rows?: number;
  cols?: number;
  value: string;
  focus?: boolean;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onEnter?: () => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const AutogrowingInput = ({
  rows,
  cols,
  value,
  focus,
  onBlur,
  onEnter,
  onFocus,
  onChange,
  disabled,
  isLoading,
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

  const handleFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur && onBlur();
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter && onEnter();
    }
  };

  return (
    <div className="AutogrowingInput__container">
      <div
        className="AutogrowingInput textarea textarea-bordered"
        data-replicated-value={
          isFocused ? inputValue : inputValue || placeholder
        }
      >
        <textarea
          ref={inputRef}
          rows={rows ?? 1}
          cols={cols ?? 1}
          placeholder={isFocused ? "" : placeholder}
          className={`AutogrowingInput__textarea ${
            className || ""
          } textarea textarea-bordered textarea-primary`}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus={focus}
          value={inputValue}
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
          spellCheck={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled || isLoading}
        />
      </div>
    </div>
  );
};
