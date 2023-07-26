import { Alert, Button, Card, Toast, Form } from "react-daisyui";
import { FormEvent, ReactNode } from "react";
import { AuthError } from "firebase/auth";

interface AuthFormProps {
  title: string;
  loading: boolean;
  mainCTALabel: string;
  onErrorDismiss: () => void;
  ctaAlternative: ReactNode;
  error: AuthError | Error | undefined;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  // TODO Wish I could restrict this to InputProps
  children: ReactNode;
}

export const AuthForm = ({
  error,
  title,
  loading,
  children,
  onSubmit,
  mainCTALabel,
  onErrorDismiss,
  ctaAlternative,
}: AuthFormProps) => {
  return (
    <>
      {error && (
        <Toast
          vertical="top"
          horizontal="center"
          className="z-[1] w-full whitespace-normal max-w-4xl"
        >
          <Alert status="error" className="flex justify-between">
            <span>{error.message}</span>
            <Button color="neutral" onClick={onErrorDismiss}>
              Dismiss
            </Button>
          </Alert>
        </Toast>
      )}
      <div className="text-center">
        <h1>{title}</h1>
      </div>
      <Card className="max-w-xs m-auto flex-shrink-0 w-full shadow-2xl mt-8 bg-base-content text-base-100">
        <Card.Body>
          <Form onSubmit={onSubmit}>
            {children}
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
                mainCTALabel
              )}
            </Button>
          </Form>
          <label className="label link label-text-alt text-base-100">
            {ctaAlternative}
          </label>
        </Card.Body>
      </Card>
    </>
  );
};
