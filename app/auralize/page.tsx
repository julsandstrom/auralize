import Link from "next/link";

export default function Auralize() {
  return (
    <section
      aria-labelledby="auralize-heading"
      className="px-6 py-10 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col  gap-5 max-w-lg font-light lg:max-w-2xl leading-relaxed ">
        {" "}
        <div className="flex justify-start items-enter  md:mb-3">
          <h1
            id="auralize-heading"
            className=" text-3xl md:text-4xl font-bold font-display"
          >
            Auralize{" "}
            <span className="block font-extralight text-base md:text-2xl ">
              your website.{" "}
            </span>
          </h1>
        </div>
        <p className="md:text-xl text-base lg:text-2xl">
          Auralize is a tool that simulates how screen readers interpret your
          HTML in real time, from focus order and accessible names to roles,
          states, and spoken output.
        </p>
        <p className="md:text-xl text-base lg:text-2xl">
          Around 16% of the world’s population lives with a disability, while
          more of society’s essential services continue to move online.
        </p>
        <p className="md:text-xl text-base lg:text-2xl">
          Access to the web is becoming a basic requirement for participation in
          everyday life.
        </p>
        <p className="md:text-xl text-base lg:text-2xl">
          Understanding what screen readers actually announce is a powerful step
          toward making that access real.
        </p>
        <p className="md:text-xl text-base lg:text-2xl">
          By auralizing our websites and understanding what assistive
          technologies actually communicate, we can take meaningful steps toward
          a more accessible and inclusive digital world.
        </p>
      </div>
      <Link
        href="/"
        className="bg-none px-6 border-[0.3px] border-[#75CE55]/50 py-2 rounded-xl text-[#E0E0E0] mt-10 hover:bg-[#75CE55] hover:text-black   focus-ring"
      >
        Explore the project
      </Link>
    </section>
  );
}
