// TODO
// - [ ] Think about whether it should return a string or a JSON object
// - [ ] Use conditional types to make sure that the returned type is a JSON object

/**
 * @param  {string} fragment
 * @returns string
 * @description This function takes a string representation of a JSON object and completes any open strings, arrays, and objects while attempting to prevent common parsing errors.
 */
export const forceParse = (fragment: string): string | object | undefined => {
  const stack: Array<string> = []; // Stack to keep track of opening symbols
  let currentIndex = 0;

  while (currentIndex < fragment.length) {
    const char = fragment[currentIndex];

    if (char === '"') {
      // Skip if the quote is escaped with a backslash
      if (currentIndex > 0 && fragment[currentIndex - 1] === "\\") {
        currentIndex++;
        continue;
      }

      const quoteIndex = fragment.indexOf('"', currentIndex + 1);
      if (quoteIndex === -1) {
        // If closing quote not found, add it to the completed token
        fragment += '"';
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
        fragment += "]";
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
        fragment += "}";
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
    fragment += lastSymbol === "{" ? "}" : "]";
  }

  try {
    const parsed = JSON.parse(fragment);
    return parsed;
  } catch (error) {
    // Leaving this console log for now in an attempt to improve the function
    ["development", "test"].includes(process.env.NODE_ENV) &&
      console.log("failed to parse:", fragment);
  }

  return undefined; // Return undefined if parsing fails
};
