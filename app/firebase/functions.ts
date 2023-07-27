"use client";
import "client-only";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, auth } from "./config";
import { AppUser } from "../types";

export const fromMillis = (ms: number) => new Date(ms).toLocaleDateString();

export const updateFirestoreTokenUsage = async (newTokens: number) => {
  // TODO Can probably simply this by using some react-firebase-hooks
  const userRef = doc(firestore, `users/${auth.currentUser?.uid}`);
  const userDoc = await getDoc(userRef);
  const userDocData = userDoc.data() as AppUser;

  const month = new Date().toLocaleString("default", { month: "long" });

  const currentUsage = userDocData?.token_usage?.[month] || 0;

  await updateDoc(userRef, {
    usage: { [month]: currentUsage + newTokens },
  });
};
