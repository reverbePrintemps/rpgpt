"use client";
import { Alert, Button, Toast } from "react-daisyui";
import { useSearchParams } from "next/navigation";
import { useError } from "@/app/hooks/error";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const params = useSearchParams();
  const { error, setError } = useError(params.get("error"));

  return (
    <>
      {error && (
        <Toast
          vertical="top"
          horizontal="center"
          className="z-[1] w-full whitespace-normal max-w-4xl"
        >
          <Alert status="error" className="flex justify-between">
            <span>{error}</span>
            <Button color="neutral" onClick={() => setError(null)}>
              Dismiss
            </Button>
          </Alert>
        </Toast>
      )}
      {children}
    </>
  );
}
