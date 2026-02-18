"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveRoute } from "../lib/isActiveRoute";

const Footer = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    isActiveRoute(pathname, href)
      ? "font-semibold underline underline-offset-4"
      : "text-[#F4F4F4]/80 hover:text-[#F4F4F4] hover:underline underline-offset-4";
  return (
    <footer
      aria-label="Footer navigation"
      className="px-4 w-full lg:flex flex-col mt-16 max-w-5xl md:mx-auto bg-[#1C1C1C] lg:py-10 hidden"
    >
      {/* <span className=" self-center font-extralight mb-2">
        Made with ❤️ for better a11y
      </span> */}
      <div className="border-t w-32 md:w-80 border-[#F4F4F4]/60 py-3 max-w-sm self-center"></div>
      <div>
        <h5 className="font-normal mb-3 text-lg">GENERAL</h5>
        <ul className="flex flex-col gap-3 text-[#F4F4F4] text-base">
          <li className=" focus-ring">
            <Link
              href="/about"
              className={linkClass("/about")}
              aria-current={isActive("/about") ? "page" : undefined}
            >
              About Me
            </Link>
          </li>{" "}
          <li className=" focus-ring">
            <Link
              href="/auralize"
              className={linkClass("/auralize")}
              aria-current={isActive("/auralize") ? "page" : undefined}
            >
              About Auralize
            </Link>{" "}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
