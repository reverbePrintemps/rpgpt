"use client";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/app/firebase/config";
import { AuthForm } from "@/app/components/AuthForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "react-daisyui";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [createUser, user, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);
  const [error, setError] = useState(authError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  if (user) router.push("/auth/account");

  return (
    <AuthForm
      title="Sign up"
      mainCTALabel="Create account"
      error={error}
      loading={loading}
      onSubmit={(e) => {
        e.preventDefault();
        createUser(email, password).then((userCredential) => {
          if (userCredential)
            setDoc(doc(firestore, "users", userCredential.user.uid), {
              email: userCredential?.user.email,
              createdAt: serverTimestamp(),
            });
        });
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
      <label className="mt-4">Password</label>
      <Input
        type="password"
        placeholder="password"
        className="mt-2 text-base-content"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        disabled={loading}
      />
    </AuthForm>
  );
}
