"use client";
import { ReactNode, CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Navbar = ({ children, className, style }: HeaderProps) => {
  const pathName = usePathname();
  return (
    <nav className="navbar bg-neutral text-neutral-content">
      {pathName !== "/" && (
        <Link href="/">
          <button className="btn btn-neutral normal-case">Back</button>
        </Link>
      )}
      <button className="btn btn-ghost normal-case text-xl ml-auto">
        rpgpt.
      </button>
    </nav>
  );
};
