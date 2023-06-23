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
  const stack: Array<string> = []; // Stack to keep track of opening symbols
  let completedToken = fragment;
  let currentIndex = 0;

  while (currentIndex < completedToken.length) {
    const char = completedToken[currentIndex];

    if (char === '"') {
      // Skip if the quote is escaped with a backslash
      if (currentIndex > 0 && completedToken[currentIndex - 1] === "\\") {
        currentIndex++;
        continue;
      }

      const quoteIndex = completedToken.indexOf('"', currentIndex + 1);
      if (quoteIndex === -1) {
        // If closing quote not found, add it to the completed token
        completedToken += '"';
        break;
      } else {
        currentIndex = quoteIndex + 1;
      }
    } else if (char === "[") {
      stack.push("[");
      currentIndex++;
    } else if (char === "]") {
      if (stack.length === 0 || stack[stack.length - 1] !== "[") {
        // If closing bracket is unexpected, add it to the completed token
        completedToken += "]";
        break;
      } else {
        stack.pop();
        currentIndex++;
      }
    } else if (char === "{") {
      stack.push("{");
      currentIndex++;
    } else if (char === "}") {
      if (stack.length === 0 || stack[stack.length - 1] !== "{") {
        // If closing brace is unexpected, add it to the completed token
        completedToken += "}";
        break;
      } else {
        stack.pop();
        currentIndex++;
      }
    } else {
      currentIndex++;
    }
  }

  while (stack.length > 0) {
    // Close any remaining unclosed symbols
    const lastSymbol = stack.pop();
    completedToken += lastSymbol === "{" ? "}" : "]";
  }

  try {
    const parsed = JSON.parse(completedToken);
    return parsed;
  } catch (error) {
    // Leaving this console log for now in an attempt to improve the function
    process.env.NODE_ENV === "development" &&
      console.log("failed to parse:", completedToken);
  }

  return undefined; // Return undefined if parsing fails
};

export const scrollToBottom = (
  ref: RefObject<HTMLDivElement>,
  behavior: ScrollOptions["behavior"],
  block: ScrollIntoViewOptions["block"]
) => ref.current?.scrollIntoView({ behavior, block });
