"use client";
import { LocalStorageItems, useLocalStorage } from "@/app/utils/local-storage";
import { PRICE_PER_THOUSAND_TOKENS_USD } from "@/app/constants/general";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { getLocalizedDateString } from "@/app/utils/datetime";
import { useUserData } from "@/app/hooks/firebase";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { email, token_usage } = useUserData();
  // TODO Use loading and error for both
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const { setValue: setLocalTokenUsage } = useLocalStorage(
    LocalStorageItems.TokenUsage,
    0
  );

  const month = getLocalizedDateString({ month: "long" });
  const today = getLocalizedDateString({
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading]);

  useEffect(() => {
    // Update local storage with usage from firebase
    if (token_usage) {
      setLocalTokenUsage(token_usage[month]);
    }
  }, [token_usage]);

  return (
    <div className="prose">
      <h1>Account</h1>
      <div className="flex justify-between items-center">
        <div className="prose">
          <h2>Email</h2>
          <p>{email}</p>
          <button className="btn btn-primary normal-case" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
      {token_usage?.[month] && (
        <>
          <h2 id="usage">Usage</h2>
          <div className="stats shadow bg-info text-info-content">
            <div className="stat">
              <div className="stat-title text-info-content">Tokens</div>
              <div className="stat-value">{token_usage[month]}</div>
              <div className="stat-desc text-info-content">1 - {today}</div>
            </div>
            <div className="stat">
              <div className="stat-title text-info-content">USD</div>
              <div className="stat-value">
                {(
                  (token_usage[month] * PRICE_PER_THOUSAND_TOKENS_USD) /
                  1000
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 3,
                })}
              </div>
              <div className="stat-desc text-info-content">1 - {today}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
