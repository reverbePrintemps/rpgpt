import { RefObject } from "react";

/**
 * @param  {string} token
 * @returns string
 * @description This function takes a string representation of a JSON object and completes any open strings, arrays, and objects while attempting to prevent common parsing errors.
 */
export const completeJSON = (token: string): string => {
  let openQuotes = 0;
  let openBrackets = 0;
  let openBraces = 0;
  let completedToken = token;

  for (let i = 0; i < token.length; i++) {
    const char = token[i];

    if (char === '"') {
      // Skip if the quote is escaped with a backslash
      if (i > 0 && token[i - 1] === "\\") {
        continue;
      }

      openQuotes++;
    } else if (char === "[") {
      openBrackets++;
    } else if (char === "]") {
      if (openQuotes % 2 === 0) {
        if (openBrackets === 0) {
          // If ']' is unexpected, add it to the completed token
          completedToken += "]";
        } else {
          openBrackets--;
        }
      }
    } else if (char === "{") {
      openBraces++;
    } else if (char === "}") {
      if (openQuotes % 2 === 0) {
        if (openBraces === 0) {
          // If '}' is unexpected, add it to the completed token
          completedToken += "}";
        } else {
          openBraces--;
        }
      }
    }
  }

  // Complete any open quotes
  if (openQuotes % 2 !== 0) {
    completedToken += '"'.repeat(openQuotes % 2);
  }

  // Complete any open brackets
  if (openBrackets > 0) {
    completedToken += "]".repeat(openBrackets);
  }

  // Complete any open braces
  if (openBraces > 0) {
    completedToken += "}".repeat(openBraces);
  }

  return completedToken;
};

export const scrollToBottom = (
  ref: RefObject<HTMLDivElement>,
  behavior: ScrollOptions["behavior"],
  block: ScrollIntoViewOptions["block"]
) => ref.current?.scrollIntoView({ behavior, block });
