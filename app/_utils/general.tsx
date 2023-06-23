import { RefObject } from "react";

// TODO
// - [ ] Think about whether it should return a string or a JSON object
// - [ ] Use conditional types to make sure that the returned type is a JSON object

/**
 * @param  {string} fragment
 * @returns string
 * @description This function takes a string representation of a JSON object and completes any open strings, arrays, and objects while attempting to prevent common parsing errors.
 */
export const forceParse = (fragment: string): object | undefined => {
  let openQuotes = 0;
  let openBrackets = 0;
  let openBraces = 0;
  let completedToken = fragment;

  for (let i = 0; i < fragment.length; i++) {
    const char = fragment[i];

    if (char === '"') {
      // Skip if the quote is escaped with a backslash
      if (i > 0 && fragment[i - 1] === "\\") {
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

  try {
    const parsed = JSON.parse(completedToken);
    if (parsed) return parsed;
  } catch (error) {
    console.log("failed to parse:", completedToken);
  }
};

export const scrollToBottom = (
  ref: RefObject<HTMLDivElement>,
  behavior: ScrollOptions["behavior"],
  block: ScrollIntoViewOptions["block"]
) => ref.current?.scrollIntoView({ behavior, block });
