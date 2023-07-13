"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { ProfileButton } from "./ProfileButton";
import { usePathname } from "next/navigation";
import { auth } from "@/app/firebase/config";
import Link from "next/link";

export const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const pathName = usePathname();

  return (
    <nav className="navbar bg-neutral text-neutral-content flex flex-col">
      <div className="flex w-full justify-between max-w-4xl mx-auto">
        {pathName !== "/" && (
          <Link href="/">
            <button className="btn btn-neutral normal-case">Back</button>
          </Link>
        )}
        <button className="btn btn-ghost normal-case text-xl">rpgpt.</button>
        {loading ? (
          <div className="loading loading-spinner loading-sm mr-4" />
        ) : user ? (
          <ProfileButton />
        ) : (
          pathName !== "/signin" && (
            <Link href="/signin">
              <button className="btn btn-primary normal-case">Sign In</button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};
