"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartDrawer } from "@/context/Cart";
import { useAuth } from "@/context/Auth";

const Header: React.FC = () => {
  const { toggleDrawer } = useCartDrawer();
  const { isLoggedIn, logout } = useAuth();

  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-white border-b-[4px] border-white" : "text-white";

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const handleLogout = () => {
    logout();

    const isOnAuthPage = pathname === "/auth";

    if (!isOnAuthPage) {
      window.location.href = "/auth";
    }
  };

  return (
    <header className="fixed top-0 w-full bg-black py-6 px-10 z-50 shadow-lg">
      <div className="container flex flex-col sm:flex-row items-center justify-between">
        <div onClick={handleLogoClick} className="cursor-pointer mb-4 sm:mb-0">
          <Image src="/images/logo.svg" alt="logo" width={200} height={100} />
        </div>

        <nav>
          <ul className="flex items-center space-x-4 underline">
            <li>
              <Link href="/" className={isActive("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" className={isActive("/events")}>
                Events
              </Link>
            </li>
            <li
              onClick={toggleDrawer}
              className={`${isActive("/carrinho")} cursor-pointer`}
            >
              Cart
            </li>

            {isLoggedIn ? (
              <li
                onClick={() => handleLogout()}
                className={`${isActive("/carrinho")} cursor-pointer`}
              >
                Logout
              </li>
            ) : (
              <li>
                <Link href="/auth" className={isActive("/auth")}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
