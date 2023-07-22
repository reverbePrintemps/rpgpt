"use client";
import "client-only";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getTokens } from "../utils/general";
import { firestore, auth } from "./config";
import { AppUser } from "../types";
import { Message } from "ai";
import {
  setToLocalStorage,
  LocalStorageItems,
  getFromLocalStorage,
} from "../utils/local-storage";

export const fromMillis = (ms: number) => new Date(ms).toLocaleDateString();

export const updateUsage = async (messages: Message[]) => {
  const localTokenUsage =
    getFromLocalStorage(LocalStorageItems.TokenUsage) || 0;
  const newTokens = getTokens(messages);
  const loggedIn = auth.currentUser?.uid;

  setToLocalStorage({
    kind: LocalStorageItems.TokenUsage,
    value: localTokenUsage + newTokens,
  });

  if (loggedIn) {
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
