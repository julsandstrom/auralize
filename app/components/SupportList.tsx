const SupportList = () => {
  return (
    <section className="w-full mt-5 pt-10 px-4  text-center">
      <ul className="mx-auto w-fit text-left font-medium">
        <li className="">• Raw HTML</li>
        <li>
          • JSX code{" "}
          <span className="font-extralight">(best-effort parsing)</span>
        </li>
        <li>• Common components</li>
      </ul>

      <h4 className="pt-10 font-normal">
        We&apos;ll parse tab order, accessible names, roles, states, and more.
      </h4>
    </section>
  );
};

export default SupportList;
