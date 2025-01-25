"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-primary" : "text-white";

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="bg-black py-6 px-10">
      <div className="container flex flex-col sm:flex-row items-center justify-between">
        <div onClick={handleLogoClick} className="cursor-pointer mb-4 sm:mb-0">
          <Image src="/images/Logo.svg" alt="Logo" width={200} height={100} />
        </div>

        <nav>
          <ul className="flex items-center space-x-4 underline">
            <li>
              <Link href="/events" className={isActive("/events")}>
                eventos
              </Link>
            </li>
            <li className={`${isActive("/carrinho")} cursor-pointer`}>
              carrinho
            </li>
            <li>
              <Link href="/auth" className={isActive("/auth")}>
                entrar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
