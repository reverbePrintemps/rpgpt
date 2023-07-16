"use client";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Alert, Button, Card, Hero, Input, Toast, Form } from "react-daisyui";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    <Hero>
      {error && (
        <Toast
          vertical="top"
          horizontal="center"
          className="z-[1] w-full whitespace-normal"
        >
          <Alert status="error" className="flex justify-between">
            <span>{error.message}</span>
            <Button color="neutral" onClick={() => setError(undefined)}>
              Dismiss
            </Button>
          </Alert>
        </Toast>
      )}
      <Hero.Content className="flex-col">
        <div className="text-center lg:text-left prose">
          <h1>Sign up</h1>
        </div>
        <Card className="flex-shrink-0 w-full shadow-2xl">
          <Card.Body>
            <Form
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
            >
              <Form.Label title="Email" />
              <Input
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={loading}
              />
              <Form.Label title="Password" />
              <Input
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                disabled={loading}
              />
              <Button
                color="primary"
                disabled={loading}
                type="submit"
                className="mt-8"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Loading
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </Form>
            <Link href="/auth/signin">
              <label className="label link text-sm">
                Already have an account? Sign in
              </label>
            </Link>
          </Card.Body>
        </Card>
      </Hero.Content>
    </Hero>
  );
}
