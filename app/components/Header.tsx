"use client";
import { ReactNode, CSSProperties, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Navbar = ({ children, className, style }: HeaderProps) => {
  const pathName = usePathname();
  const [shouldShowBanner, setShouldShowBanner] = useState(true);
  const handleBannerDismiss = () => setShouldShowBanner(false);

  return (
    <nav className="navbar bg-neutral text-neutral-content flex flex-col">
      <div className="flex w-full justify-between max-w-4xl mx-auto">
        {pathName !== "/" && (
          <Link href="/">
            <button className="btn btn-neutral normal-case">Back</button>
          </Link>
        )}
        <button className="btn btn-ghost normal-case text-xl ml-auto">
          rpgpt.
        </button>
      </div>
      {shouldShowBanner && (
        <div className="alert alert-warning mt-2 flex max-w-4xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex flex-col items-end">
            <p className="ml-2">
              Due to a sudden and unexpected increase in popularity for this
              app, I am unable to incur the api costs for much longer. Consider
              donating to help keep this app alive. ❤️
            </p>
            <div className="flex mt-4">
              <button
                className="btn btn-md btn-ghost"
                onClick={handleBannerDismiss}
              >
                Dismiss
              </button>
              <Link
                href="https://www.buymeacoffee.com/jandreo"
                target="_blank"
                className="block"
              >
                <button className="btn btn-md btn-primary">Donate</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
