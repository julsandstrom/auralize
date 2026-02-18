"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveRoute } from "../lib/isActiveRoute";
import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    isActiveRoute(pathname, href)
      ? "font-semibold underline underline-offset-4"
      : "text-white/80 hover:text-white hover:underline underline-offset-4";

  return (
    // <div className="flex justify-center">
    <>
      <header className="bg-[#1C1C1C] flex flex-col items-start lg:items-center px-6 py-3 w-full lg:justify-between 2xl:px-20">
        <div className="flex w-full justify-between items-start  ">
          <Link
            href="/"
            aria-label="Auralize home"
            className="inline-flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span className="flex">
              {" "}
              <span className="text-center   font-extralight text-base -mt-0.5 md:text-xl self-end ">
                Auralize
              </span>{" "}
              <Image
                src="/audiowaves.png"
                height={800}
                width={800}
                alt=""
                className="w-10"
              />
            </span>{" "}
            <span className=" text-left self-start text-lg md:text-2xl -mt-1 font-display">
              Hear your interface
            </span>
          </Link>{" "}
          <nav className="gap-16 hidden lg:flex lg:items-end font-light">
            {" "}
            <Link
              href="/about"
              className={linkClass("/about")}
              aria-current={isActive("/about") ? "page" : undefined}
            >
              About Me
            </Link>
            <Link
              href="/auralize"
              className={linkClass("/auralize")}
              aria-current={isActive("/auralize") ? "page" : undefined}
            >
              About Auralize
            </Link>
          </nav>
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="lg:hidden"
          >
            <Menu size={40} className="w-7.5 lg:hidden" />
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 bg-[#1C1C1C] flex flex-col items-center justify-start gap-10 text-2xl w-full py-20 font-display lg:hidden">
          <button
            className="absolute top-6 right-6 text-white"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <Link
            href="/"
            className={linkClass("/")}
            aria-current={isActive("/") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={linkClass("/about")}
            aria-current={isActive("/about") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            About Me
          </Link>

          <Link
            href="/auralize"
            className={linkClass("/auralize")}
            aria-current={isActive("/auralize") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            About Auralize
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
