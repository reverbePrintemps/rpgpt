"use client";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin?error=authentication-required");
    }
  }, [user, loading]);

  return (
    <form>
      <button>Submit</button>
    </form>
  );
}
