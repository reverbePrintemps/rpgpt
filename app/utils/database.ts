import { updateFirestoreTokenUsage } from "../firebase/functions";
import { useUserData } from "../hooks/firebase";
import {
  useLocalStorage,
  LocalStorageItems,
  setToLocalStorage,
} from "./local-storage";

export const updateTokenUsage = async (
  newTokens: number,
  existingTokens?: number | null,
  subscriptionId?: string
) => {
  setToLocalStorage({
    kind: LocalStorageItems.TokenUsage,
    value: newTokens + (existingTokens || 0),
  });
  updateFirestoreTokenUsage(newTokens);
  // if (subscriptionId) reportUsageToStripe(subscriptionId, newTokens);
  console.log("subscriptionId client", subscriptionId);

  if (subscriptionId) {
    const response = await fetch("/api/stripe/update-token-usage", {
      method: "POST",
      body: JSON.stringify({
        subscriptionId,
        tokens: newTokens,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update token usage");
    }
  }
};

export const useTokenUsage = (month: string) => {
  const { value: localTokenUsage } = useLocalStorage(
    LocalStorageItems.TokenUsage,
    0
  );
  const { token_usage } = useUserData();

  const tokenUsage = token_usage?.[month] || localTokenUsage;

  return tokenUsage;
};
