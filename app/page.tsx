"use client";

import MainInput from "./components/MainInput";
import SupportList from "./components/SupportList";

export default function Home() {
  return (
    <>
      <div className=" w-full flex flex-col items-center justify-between min-h-screen md:min-h-0   p-4 lg:p-6 dark:bg-[#1C1C1C]">
        <h1 className="text-center py-10 lg:py-20 text-xl flex flex-col items-start font-display lg:text-2xl">
          Instant screen reader previews
          <span className="font-light text-left">
            for accessible development
          </span>
        </h1>{" "}
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
