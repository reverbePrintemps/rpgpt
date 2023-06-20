"use client";
import { ReactNode, CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Header = ({ children, className, style }: HeaderProps) => {
  const pathName = usePathname();
  return (
    <header className="fixed w-screen flex p-4 bg-slate-300 text-stone-800">
      <nav>
        {pathName !== "/" && (
          <Link
            href="/"
            className="mr-4 bg-stone-800 text-slate-300 p-2 rounded-lg"
          >
            <button>Back</button>
          </Link>
        )}
      </nav>
      <h1 className="ml-auto font-bold">rpgpt.</h1>
    </header>
  );
};
