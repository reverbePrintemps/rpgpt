import { useEffect, useState } from "react";

export const useError = (errorCode: string | null) => {
  const [error, setError] = useState<string | null>(errorCode);

  useEffect(() => {
    switch (error) {
      case "authentication-required":
        setError("Please sign in or sign up before you can access this page.");
        break;
      default:
        setError(null);
        break;
    }
  }, []);

  return { error, setError };
};
