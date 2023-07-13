"use client";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FormEvent, useRef } from "react";
import { auth, firestore } from "../firebase/config";
import Link from "next/link";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const SignUpForm = () => {
  // TODO Handle loading and error states
  const [signUp] = useCreateUserWithEmailAndPassword(auth);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    signUp(email, password).then((userCredential) => {
      if (userCredential)
        setDoc(doc(firestore, "users", userCredential.user.uid), {
          email: userCredential?.user.email,
          createdAt: serverTimestamp(),
        });
    });
  };

  return (
    <div className="prose">
      <h1>Sign Up</h1>
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
          Sign Up
        </button>
      </form>
      <Link href="/signin">
        <p className="link">Already have an account? Sign in</p>
      </Link>
    </div>
  );
};
