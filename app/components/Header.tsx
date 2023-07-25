"use client";
import { CurrencyIconDollar } from "../assets/CurrencyIconDollar";
import { AccountCircleIcon } from "../assets/AccountCircleIcon";
import { Button, Dropdown, Navbar } from "react-daisyui";
import { usePathname } from "next/navigation";
import { MenuIcon } from "../assets/MenuIcon";
import { HomeIcon } from "../assets/HomeIcon";
import { DiceIcon } from "../assets/DiceIcon";
import { ThemePicker } from "./ThemePicker";
import Link from "next/link";

export const Header = () => {
  const pathName = usePathname();

  return (
    <Navbar className="sticky top-0 z-[1] bg-base-100">
      <div className="flex justify-between w-full max-w-4xl mx-auto">
        <Navbar.Start>
          {pathName !== "/" && (
            <Link href="/">
              <button className="btn btn-ghost normal-case">Back</button>
            </Link>
          )}
        </Navbar.Start>
        <Navbar.Center>
          {pathName !== "/" && (
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              rpgpt.
            </Link>
          )}
        </Navbar.Center>
        <Navbar.End className="text-end">
          <ThemePicker />
          <Dropdown end>
            <Button color="ghost" tabIndex={0}>
              <MenuIcon />
            </Button>
            <Dropdown.Menu tabIndex={0} className="w-52 menu-compact mt-3">
              <Dropdown.Item href="/">
                <HomeIcon />
                Home
              </Dropdown.Item>
              <Dropdown.Item href="/game">
                <DiceIcon />
                Game
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
      </div>
    </Navbar>
  );
};
