"use client";
import { CurrencyIconDollar } from "../assets/CurrencyIconDollar";
import { AccountCircleIcon } from "../assets/AccountCircleIcon";
import { Button, Dropdown, Navbar } from "react-daisyui";
import { usePathname } from "next/navigation";
import { MenuIcon } from "../assets/MenuIcon";
import { HomeIcon } from "../assets/HomeIcon";
import Link from "next/link";

export const Header = () => {
  const pathName = usePathname();

  return (
    <Navbar className="bg-neutral">
      <Navbar.Start>
        {pathName !== "/" && (
          <Link href="/">
            <button className="btn btn-ghost normal-case text-neutral-content">
              Back
            </button>
          </Link>
        )}
      </Navbar.Start>
      <Navbar.Center>
        {pathName !== "/" && (
          <Link
            href="/"
            className="btn btn-ghost normal-case text-xl text-neutral-content"
          >
            rpgpt.
          </Link>
        )}
      </Navbar.Center>
      <Navbar.End>
        <Dropdown className="dropdown-end">
          <Button color="neutral" tabIndex={0}>
            <MenuIcon />
          </Button>
          <Dropdown.Menu tabIndex={0} className="w-52 menu-compact mt-3">
            <Dropdown.Item href="/">
              <HomeIcon />
              Home
            </Dropdown.Item>
            <Dropdown.Item href="/auth/account">
              <AccountCircleIcon />
              Account
            </Dropdown.Item>
            <Dropdown.Item href="/pricing">
              <CurrencyIconDollar />
              Pricing
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.End>
    </Navbar>
  );
};
