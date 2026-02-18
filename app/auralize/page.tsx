import Link from "next/link";

export default function Auralize() {
  return (
    <main className="px-6 py-10 flex flex-col justify-center items-center">
      <div className="flex flex-col  gap-5 max-w-lg">
        {" "}
        <div className="flex justify-start items-enter  md:mb-3">
          <h1 className=" text-3xl md:text-4xl font-bold font-display">
            Auralize{" "}
            <span className="block font-extralight text-base md:text-2xl ">
              your website.{" "}
            </span>
          </h1>
        </div>
        <p className="md:text-xl text-base">
          Around 16% of the world’s population lives with a disability, while
          more of society’s essential services continue to move online.
        </p>
        <p className="md:text-xl text-base">
          Access to the web is becoming a basic requirement for participation in
          everyday life.
        </p>
        <p className="md:text-xl text-base">
          Understanding what screen readers actually announce is a powerful step
          toward making that access real.
        </p>
        <p className="md:text-xl text-base">
          By auralizing our websites and understanding what assistive
          technologies actually communicate, we can take meaningful steps toward
          a more accessible and inclusive digital world.
        </p>
      </div>
      <Link
        href="/"
        className="bg-[#FCA087] px-6 py-2 rounded-xl text-[#1C1C1C] mt-10 hover:bg-[#ff8e6f] hover:text-black  focus-ring"
      >
        Return Home
      </Link>
    </main>
  );
}
