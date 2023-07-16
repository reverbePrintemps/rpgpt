"use client";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Hero, Input, Toast, Form } from "react-daisyui";
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

  if (credentials?.user) router.push("/account");

  return (
    <Hero>
      {error && (
        <Toast
          vertical="top"
          horizontal="center"
          // TODO - Figure out how to always apply these styles to a Toast (ie. override the default styles)
          style={{ zIndex: 1, width: "100%", whiteSpace: "unset" }}
        >
          <Alert status="error">
            {error.message}
            <Button color="neutral" onClick={() => setError(undefined)}>
              Dismiss
            </Button>
          </Alert>
        </Toast>
      )}
      <Hero.Content className="flex-col">
        <div className="text-center lg:text-left prose">
          <h1>Sign in</h1>
        </div>
        <Card className="flex-shrink-0 w-full shadow-2xl">
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
                <Link href="/reset-password" className="label-text-alt">
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
            <Link href="/signup">
              <label className="label link text-sm">
                Don't have an account? Sign up
              </label>
            </Link>
          </Card.Body>
        </Card>
      </Hero.Content>
    </Hero>
  );
}
