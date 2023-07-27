import { LocalStorageItems, setToLocalStorage } from "./local-storage";
import { updateFirestoreTokenUsage } from "../firebase/functions";
import { useUserData } from "../hooks/firebase";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";

export const updateTokenUsage = (tokens: number) => {
  setToLocalStorage({
    kind: LocalStorageItems.TokenUsage,
    value: tokens,
  });
  // ! Culprit 1
  updateFirestoreTokenUsage(tokens);
};

export const useTokenUsage = (month: string) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [localTokenUsage] = useLocalStorage(LocalStorageItems.TokenUsage, 0);
  // ! Culprit 2
  const { token_usage } = useUserData();

  // * Need to use this ridiculousness to avoid hydration mismatch errors from useLocalStorage ¯\_(ツ)_/¯
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  const tokenUsage = token_usage?.[month] || localTokenUsage;

  return tokenUsage;
};
