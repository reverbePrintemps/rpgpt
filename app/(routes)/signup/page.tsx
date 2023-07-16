"use client";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Alert, Button, Card, Hero, Input, Toast, Form } from "react-daisyui";
import { auth } from "@/app/firebase/config";
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

  if (user) router.push("/account");

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
          <h1>Sign up</h1>
        </div>
        <Card className="flex-shrink-0 w-full shadow-2xl">
          <Card.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                createUser(email, password);
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
            <Link href="/signin">
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
