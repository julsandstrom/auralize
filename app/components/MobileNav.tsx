import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  linkClass: (href: string) => string;
  isActive: (href: string) => boolean;
};

const MobileNav = ({ setOpen, linkClass, isActive }: Props) => {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed inset-0 z-50 bg-[#1C1C1C] flex flex-col items-center justify-start gap-10 text-2xl w-full py-20 font-display lg:hidden "
      >
        <button
          className="absolute top-6 right-6 text-white"
          aria-label="Close menu"
          type="button"
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
    </div>
  );
};

export default MobileNav;
