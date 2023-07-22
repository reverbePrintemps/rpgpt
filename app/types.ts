import { Timestamp } from "firebase/firestore";

export type AppUser = {
  createdAt: Timestamp;
  email: string;
  // TODO key is a month. Type this better.
  usage: { [key: string]: number } | undefined;
  isPaying: boolean;
};

export type TokenUsage = number;
