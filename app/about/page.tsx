import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="p-6 flex flex-col justify-center items-center">
      <div className="flex flex-col  gap-5 max-w-lg ">
        {" "}
        <div className="flex justify-start items-end gap-10 md:gap-20 mb-10">
          <h1 className="flex flex-col items-start text-3xl md:text-4xl font-bold font-display">
            Hello!{" "}
            <span className="font-light text-base md:text-2xl font-display">
              I&apos;m Julian.
            </span>
          </h1>
          <Image
            src="/profile.png"
            height={800}
            width={800}
            alt=""
            className=" w-42.5"
          />
        </div>
        <p className="md:text-xl text-base">
          I started studying frontend development late 2024.{" "}
        </p>
        <p className="md:text-xl text-base">
          I’m currently doing my internship at Sprinto, where this project
          began. Jumping into an ongoing project, navigating the accessibility
          tree and understanding what screen readers actually announce proved
          harder than it should be.{" "}
        </p>
        <p className="md:text-xl text-base">
          Because I regularly test interfaces using screen readers like NVDA, I
          wanted a faster way to hear problems directly from the code.
        </p>
        <p className="md:text-xl text-base">
          Auralize is my attempt to create that shortcut. A simple tool that
          helps developers identify accessibility issues and better understand
          the screen reader experience.
        </p>
      </div>
      <Link
        href="/"
        className="bg-[#FCA087] px-6 py-2 rounded-xl text-[#1C1C1C] mt-10"
      >
        Return Home
      </Link>
    </main>
  );
}
