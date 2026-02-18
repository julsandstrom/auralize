"use client";

import MainInput from "./components/MainInput";
import SupportList from "./components/SupportList";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-1 focus:left-4 bg-black text-white px-3 py-2"
      >
        Skip to main content
      </a>
      <div className=" w-full flex flex-col items-center justify-between min-h-screen md:min-h-0   p-4 lg:p-6 dark:bg-[#1C1C1C]">
        <h3 className="text-center py-20 text-xl flex flex-col items-start font-display">
          Instant screen reader previews
          <span className="font-light text-left">
            for accessible development
          </span>
        </h3>{" "}
        <div className="flex items-center justify-center  p-6 dark:bg-[#1C1C1C] w-full">
          <MainInput />{" "}
        </div>
        <SupportList />
        {/* <span>“NVDA (Firefox), default verbosity, English</span> */}
        {/* <span>“Preview modeled after NVDA phrasing; actual output varies by settings/browser.”*/}
      </div>
    </>
  );
}
