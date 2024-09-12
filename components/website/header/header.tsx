"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/components/global/logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="container">
      <nav
        className="flex section-wrapping items-center justify-between"
        aria-label="Global"
      >
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Offerado</span>
          {/* <Image src="/logo.svg" alt="Offerado" width={140} height={45} />
           */}
          <Logo />
        </Link>
        {pathname !== "/signup" && (
          <div className="flex lg:hidden flex-1 justify-end mr-[1rem]">
            <Link
              href="/signup"
              className="text-sm px-4 py-2 bg-red-500 rounded-xl text-white hover:bg-slate-900 w-fit"
            >
              Sign Up
            </Link>
          </div>
        )}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 relative z-50"
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? (
              <X className="h-10 w-10" />
            ) : (
              <Menu className="h-10 w-10" />
            )}
          </button>
        </div>

        <div
          className={`flex gap-x-12 items-center flex-col lg:flex-row p-[3rem] lg:p-0 bg-white absolute lg:relative lg:w-auto top-0 left-0 z-30 lg:top-auto w-full shadow-xl lg:shadow-none space-y-[3rem] lg:space-y-0 lg:flex lg:bg-transparent ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <Link
            href="/#features"
            className="text-md font-medium leading-6 hover:text-blue-400"
          >
            Features
          </Link>
          <Link
            href="/#faq"
            className="text-md font-medium leading-6 hover:text-blue-400"
          >
            FAQ
          </Link>
          <Link
            href="/#pricing"
            className="text-md font-medium leading-6 hover:text-blue-400"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-md font-medium leading-6 hover:text-blue-400"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 bg-red-500 rounded-xl text-white hover:bg-slate-900 w-fit"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
