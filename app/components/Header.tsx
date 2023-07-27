"use client";
import { CurrencyIconDollar } from "../assets/CurrencyIconDollar";
import { AccountCircleIcon } from "../assets/AccountCircleIcon";
import { DropdownArrowIcon } from "../assets/DropdownArrowIcon";
import { Button, Dropdown, Menu, Navbar } from "react-daisyui";
import { usePathname } from "next/navigation";
import { MenuIcon } from "../assets/MenuIcon";
import { HomeIcon } from "../assets/HomeIcon";
import { DiceIcon } from "../assets/DiceIcon";
import { useRouter } from "next/navigation";
import { ThemePicker } from "./ThemePicker";
import Link from "next/link";

export const Header = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navbar className="sticky top-0 z-[1] bg-base-100">
      <div className="flex justify-between w-full max-w-4xl mx-auto">
        <Navbar.Start>
          {pathName !== "/" && (
            <button
              onClick={handleBackClick}
              className="btn btn-ghost normal-case"
            >
              <DropdownArrowIcon classname="rotate-90" />
              Back
            </button>
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
          <Dropdown title="Menu" end>
            <Button color="ghost" tabIndex={0} className="btn-sm sm:btn-md">
              <MenuIcon />
            </Button>
            <Dropdown.Menu
              tabIndex={0}
              className="w-52 menu-compact mt-3 bg-base-content"
            >
              <Menu.Item>
                <Link
                  href="/"
                  className={`bg-base-100 ${pathName === "/" ? "active" : ""}`}
                >
                  <HomeIcon />
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href="/game"
                  className={`bg-base-100 ${
                    pathName === "/game" ? "active" : ""
                  } `}
                >
                  <DiceIcon />
                  Game
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href="/auth/account"
                  className={`bg-base-100 ${
                    pathName.includes("auth") ? "active" : ""
                  }`}
                >
                  <AccountCircleIcon />
                  Account
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href="/pricing"
                  className={`bg-base-100 ${
                    pathName === "/pricing" ? "active" : ""
                  }`}
                >
                  <CurrencyIconDollar />
                  Pricing
                </Link>
              </Menu.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.End>
      </div>
    </Navbar>
  );
};
