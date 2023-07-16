"use client";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { Alert, Button, Card, Hero, Input, Toast, Form } from "react-daisyui";
import { auth } from "@/app/firebase/config";
import { useEffect, useState } from "react";
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
          <h1>Reset password</h1>
        </div>
        <Card className="flex-shrink-0 w-full shadow-2xl">
          <Card.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                sendPasswordResetEmail(email);
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
                  "Send password reset email"
                )}
              </Button>
            </Form>
            <Link href="/signin">
              <label className="label link text-sm">
                Remembered your password? Sign in
              </label>
            </Link>
          </Card.Body>
        </Card>
      </Hero.Content>
    </Hero>
  );
}
