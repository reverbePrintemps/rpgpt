"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
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
        <details className="dropdown dropdown-end">
          <summary className="m-1 btn">Menu</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <Link href="/account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Account
              </Link>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  );
};
