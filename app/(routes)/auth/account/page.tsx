"use client";

import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useUserData } from "@/app/hooks/firebase";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Page = () => {
  const router = useRouter();
  const { email, usage } = useUserData();
  // TODO Use loading and error for both
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading]);

  const month = new Date().toLocaleDateString("default", { month: "long" });
  const today = new Date().toLocaleDateString("default", {
    month: "short",
    day: "numeric",
  });
  const firstDayOfCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).toLocaleDateString("default", {
    month: "short",
    day: "numeric",
  });
  return (
    <div className="prose">
      <h1>Account</h1>
      <div className="flex justify-between items-center">
        <div>
          <h2>Email</h2>
          <p>{email}</p>
        </div>
        <button className="btn btn-primary normal-case" onClick={signOut}>
          Sign Out
        </button>
      </div>
      {usage?.[month] && (
        <>
          <h2>Usage</h2>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Tokens</div>
              <div className="stat-value">{usage[month]}</div>
              <div className="stat-desc">
                {firstDayOfCurrentMonth} - {today}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">USD</div>
              <div className="stat-value">
                {(usage[month] * 0.000003).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <div className="stat-desc">
                {firstDayOfCurrentMonth} - {today}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
