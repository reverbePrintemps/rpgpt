"use client";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FormEvent, useRef } from "react";
import { auth } from "../firebase/config";
import Link from "next/link";

export const SignInForm = () => {
  // TODO Handle loading and error states
  const [signInWithEmailAndPassword, user] =
    useSignInWithEmailAndPassword(auth);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    signInWithEmailAndPassword(email, password);
  };

  return (
    <div className="prose">
      <h1>Sign in</h1>
      <form className="form-control w-full max-w-xs" onSubmit={handleSubmit}>
        <label className="label">
          <span className="label-text">Email address</span>
        </label>
        <input
          type="email"
          placeholder="jane.doe@example.com"
          className="input input-bordered w-full max-w-xs"
          ref={emailRef}
        />
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered w-full max-w-xs"
          ref={passwordRef}
        />
        <button type="submit" className="btn btn-primary mt-4">
          Sign in
        </button>
      </form>
      <Link href="/signup">
        <p className="link">Don't have an account? Sign up</p>
      </Link>
    </div>
  );
};
