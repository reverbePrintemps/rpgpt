import "client-only";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, auth } from "./config";
import { AppUser } from "../types";
import { Message } from "ai";

export const fromMillis = (ms: number) => new Date(ms).toLocaleDateString();

export const updateUsage = async (messages: Message[]) => {
  // TODO There's currently no way to get token usage directly from the API when using the stream feature. As a rule of thumb, OpenAI counts ~4 chars as 1 token.
  const newTokens = messages.reduce((acc, message) => {
    return acc + Math.floor(message.content.length / 4);
  }, 0);

  const userRef = doc(firestore, `users/${auth.currentUser?.uid}`);
  const userDoc = await getDoc(userRef);
  const userDocData = userDoc.data() as AppUser;

  const month = new Date().toLocaleString("default", { month: "long" });

  const tokens = userDocData?.usage?.[month] || 0;

  await updateDoc(userRef, {
    usage: { [month]: tokens + newTokens },
  });
};
