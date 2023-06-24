"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        className="bg-slate-300 text-stone-800 p-4 rounded-lg mt-8 ml-auto"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
