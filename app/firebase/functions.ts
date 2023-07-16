import "client-only";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MAX_TOKENS_FREE_USER } from "../constants/general";
import { firestore, auth } from "./config";
import { AppUser } from "../types";
import { Message } from "ai";

export const fromMillis = (ms: number) => new Date(ms).toLocaleDateString();

export const updateUsage = async (messages: Message[]) => {
  // TODO There's currently no way to get token usage directly from the API when using the stream feature. As a rule of thumb, OpenAI counts ~4 chars as 1 token.
  const newTokens = messages.reduce((acc, message) => {
    return acc + Math.floor(message.content.length / 4);
  }, 0);

  if (!auth.currentUser?.uid) {
    const currentUsage = JSON.parse(localStorage.getItem("token-usage") || "0");
    localStorage.setItem(
      "token-usage",
      JSON.stringify(currentUsage + newTokens)
    );
  } else {
    const userRef = doc(firestore, `users/${auth.currentUser?.uid}`);
    const userDoc = await getDoc(userRef);
    const userDocData = userDoc.data() as AppUser;

    const month = new Date().toLocaleString("default", { month: "long" });

    const tokens = userDocData?.usage?.[month] || 0;

    await updateDoc(userRef, {
      usage: { [month]: tokens + newTokens },
    });
  }
};
