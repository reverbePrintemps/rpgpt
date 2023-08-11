export const MAX_TOKENS_GPT_3_5_TURBO_4K_CONTEXT = 4096;
export const MAX_TOKENS_FREE_USER = 10000;
// As of July 20, 2023, the cost per 1000 tokens for "GPT-3.5 Turbo" with "4K context" is:
// Input: 0.0015$
// Output: 0.002$
// Will start experimenting with 0.005$ per 1000 tokens
// Can always adjust later
const PRICE_PER_TOKEN = 0.000005;
export const PRICE_PER_THOUSAND_TOKENS_USD = PRICE_PER_TOKEN / 1000;
// Pricing tables do not support sub-cent pricing
const MINIMUM_PRICING_POSSIBLE_FOR_PRICING_TABLES = 0.01;
// Because we are currently using pricing tables (and these do not support sub-cent pricing),
// we need to communicate, and report to Stripe, the smallest number of tokens that can be
// charged for one cent.
export const MINIMUM_TOKENS_PER_SMALLEST_PRICE_UNIT = Math.ceil(
  MINIMUM_PRICING_POSSIBLE_FOR_PRICING_TABLES / PRICE_PER_TOKEN
);
