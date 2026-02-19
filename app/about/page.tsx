import Link from "next/link";

export default function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="p-6 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col  gap-5 max-w-lg lg:max-w-2xl leading-relaxed font-light">
        {" "}
        <h1 id="about-heading" className="text-3xl md:text-4xl  font-display">
          Hello!{" "}
          <span className="font-light text-xl md:text-2xl block ">
            I&apos;m Julian.
          </span>
        </h1>
        <p className=" text-base lg:text-2xl">
          I’m currently doing my internship at Sprinto, where this project
          began. Jumping into an ongoing project, navigating the accessibility
          tree and understanding what screen readers actually announce proved
          harder than it should be.{" "}
        </p>
        <p className=" text-base lg:text-2xl">
          Because I regularly test interfaces using screen readers like NVDA, I
          wanted a faster way to hear problems directly from the code.
        </p>
        <p className="text-base lg:text-2xl">
          Auralize is my attempt to create that shortcut. A simple tool that
          helps developers identify accessibility issues and better understand
          the screen reader experience.
        </p>
      </div>
      <Link
        href="/"
        className="bg-none px-6 border-[0.3px] border-[#75CE55]/50 py-2 rounded-xl text-[#E0E0E0] mt-10 hover:bg-[#75CE55] hover:text-black lg:text-xl   focus-ring"
      >
        Explore the project
      </Link>
    </section>
  );
}
