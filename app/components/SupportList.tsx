const SupportList = () => {
  return (
    <section className="w-full mt-5 pt-10 px-4  text-center">
      <ul className="mx-auto w-fit text-left font-medium lg:text-2xl">
        <li className="">• Raw HTML</li>
        <li>
          • JSX code{" "}
          <span className="font-extralight">(best-effort parsing)</span>
        </li>
        <li>• Common components</li>
      </ul>

      <p className="pt-10 font-normal lg:text-2xl">
        We&apos;ll parse tab order, accessible names, roles, states, and more.
      </p>
    </section>
  );
};

export default SupportList;
