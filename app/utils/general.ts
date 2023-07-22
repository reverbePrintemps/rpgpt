import { Message } from "ai";

// TODO There's currently no way to get token usage directly from the API when using the stream feature.
// * Also ran into issues with libs like gpt-3-encoder (can't use 'fs') and gpt-tokenizer (weird errors).
// * As a rule of thumb, OpenAI counts ~4 chars as 1 token.
// * This is a rough estimate, but it's good enough for now.
export const getTokens = (messages: Message[]) => {
  return messages.reduce(
    (acc, message) => acc + Math.floor(JSON.stringify(message).length / 4),
    0
  );
};
