import { AuthError, AuthErrorCodes } from "firebase/auth";
import { ReactNode } from "react";
import Link from "next/link";

export const translateAuthErrorToHuman = (error: AuthError): ReactNode => {
  switch (error.code) {
    case AuthErrorCodes.USER_DELETED:
      return (
        <span>
          We couldn't find any user with this email address, make sure you've
          entered the correct email address. Alternatively,{" "}
          <Link href="/auth/signup" className="link">
            you can create a new account
          </Link>
          .
        </span>
      );
    default:
      return error.message;
  }
};
