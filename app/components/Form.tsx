"use client";
import { ReactNode } from "react";

interface SignInFormProps {
  label: string;
  loading: boolean;
  children: ReactNode;
  onSubmit: () => void;
}

export const Form = ({
  label,
  loading,
  onSubmit,
  children,
}: SignInFormProps) => {
  return (
    <div className="prose">
      <h1>{label}</h1>
      <form className="form-control w-full max-w-xs" onSubmit={onSubmit}>
        {children}
        <button type="submit" className="btn btn-primary mt-4">
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Loading
            </>
          ) : (
            label
          )}
        </button>
      </form>
    </div>
  );
};
