"use client";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { AuthForm } from "@/app/components/AuthForm";
import { auth } from "@/app/firebase/config";
import { useEffect, useState } from "react";
import { Input } from "react-daisyui";
import Link from "next/link";

export default function Page() {
  const [sendPasswordResetEmail, loading, authError] =
    useSendPasswordResetEmail(auth);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(authError);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <AuthForm
      title="Reset password"
      mainCTALabel="Reset password"
      error={error}
      loading={loading}
      onSubmit={(e) => {
        e.preventDefault();
        sendPasswordResetEmail(email);
      }}
      onErrorDismiss={() => setError(undefined)}
      ctaAlternative={
        <Link href="/auth/signin">Already have an account? Sign in</Link>
      }
    >
      <label>Email</label>
      <Input
        type="email"
        placeholder="email"
        className="mt-2 text-base-content"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        disabled={loading}
      />
    </AuthForm>
  );
}
