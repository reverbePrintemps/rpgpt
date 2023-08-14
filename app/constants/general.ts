export const MAX_TOKENS_GPT_3_5_TURBO_4K_CONTEXT = 4096;
export const MAX_TOKENS_FREE_USER = 10000;
// As of July 20, 2023, the cost per 1000 tokens for "GPT-3.5 Turbo" with "4K context" is:
// Input: 0.0015$
// Output: 0.002$
// Will start experimenting with 0.005$ per 1000 tokens
// Can always adjust later
export const PRICE_PER_TOKEN_USD = 0.000005;
export const PRICE_PER_THOUSAND_TOKENS_USD = 0.005;
