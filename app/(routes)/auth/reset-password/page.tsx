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
      <div className="text-center  prose">
        <h1 className="text-neutral-content">Reset password</h1>
      </div>
      <Card className="flex-shrink-0 w-full shadow-2xl mt-8 bg-neutral-content text-neutral">
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
          <Link href="/auth/signin">
            <label className="label link text-sm">
              Remembered your password? Sign in
            </label>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
