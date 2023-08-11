import { Timestamp } from "firebase/firestore";

export type AppUser = {
  createdAt: Timestamp;
  email: string;
  // TODO key is a month. Type this better.
  token_usage: { [key: string]: number } | undefined;
  isPaying: boolean | undefined;
  stripe:
    | {
        customerId: string | undefined;
        subscriptionItemId: string | undefined;
      }
    | undefined;
};

export type TokenUsage = number;
