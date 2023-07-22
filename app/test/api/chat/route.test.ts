import { MAX_TOKENS_GPT_3_5_TURBO_4K_CONTEXT } from "@/app/constants/general";
import { initialMessages } from "@/app/constants/prompt";
import { getTokens } from "@/app/utils/general";

describe("Chat API", () => {
  describe("max_tokens", () => {
    it("plus length of initial messages should not exceed model context length", () => {
      const modelContextLength = MAX_TOKENS_GPT_3_5_TURBO_4K_CONTEXT;
      const initialMessagesTokens = getTokens(initialMessages);
      const maxTokens =
        MAX_TOKENS_GPT_3_5_TURBO_4K_CONTEXT - initialMessagesTokens;
      expect(maxTokens).toBe(modelContextLength - initialMessagesTokens);
    });
  });
});
