"use client";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Alert, Button, Card, Input, Toast, Form } from "react-daisyui";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <>
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
      <div className="text-center prose">
        <h1 className="text-neutral-content">Sign in</h1>
      </div>
      <Card className="flex-shrink-0 w-full shadow-2xl mt-8 bg-neutral-content text-neutral">
        <Card.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              signInWithEmailAndPassword(email, password);
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
            <label className="label">
              <Link href="/auth/reset-password" className="label-text-alt link">
                Forgot password?
              </Link>
            </label>
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
                "Sign in"
              )}
            </Button>
          </Form>
          <Link href="/auth/signup">
            <label className="label link text-sm">
              Don't have an account? Sign up
            </label>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
