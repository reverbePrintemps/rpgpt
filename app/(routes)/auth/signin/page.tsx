"use client";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { AuthForm } from "@/app/components/AuthForm";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { Input } from "react-daisyui";
import Link from "next/link";
import { ButtonProps } from "react-daisyui/dist/Button";

export default function Page() {
  const router = useRouter();
  const [signInWithEmailAndPassword, credentials, loading, authError] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(authError);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  if (credentials?.user) router.push("/auth/account");

  return (
    <AuthForm
      title="Sign in"
      mainCTALabel="Sign in"
      error={error}
      loading={loading}
      onSubmit={(e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
      }}
      onErrorDismiss={() => setError(undefined)}
      ctaAlternative={
        <Link href="/auth/signup">Don't have an account? Sign up</Link>
      }
    >
      <label>Email</label>
      <Input
        type="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        disabled={loading}
        className="mt-2 text-base-content"
      />
      <label className="mt-4">Password</label>
      <Input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        disabled={loading}
        className="mt-2 text-base-content"
      />
      <label className="label label-text-alt text-base-100">
        <Link href="/auth/reset-password" className="link">
          Forgot password?
        </Link>
      </label>
    </AuthForm>
  );
}
