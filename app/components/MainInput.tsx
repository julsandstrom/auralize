import { useRouter } from "next/navigation";
import { useHtml } from "../providers";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";

const example = `<button aria-label="Read more about pricing">Read more</button>`;

const MainInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { html, setHtml } = useHtml();

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [html]);

  const router = useRouter();

  const charCount = html.replace(/\s/g, "").length;
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!html.trim()) return;
    router.push("/output");
  }
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl ">
      <div className="flex flex-col items-center gap-20">
        <div className="flex flex-col w-full items-center">
          <label className="block text-base font-semibold pb-2" htmlFor="html">
            HTML to analyze
          </label>
          <div
            className="
        w-full max-w-lg rounded-xl bg-[#2B2B33] text-white
        border-[0.3px] border-white/30
        focus-within:ring-1 focus-within:ring-white/80
        focus-within:ring-offset-2 focus-within:ring-offset-white/40
      "
          >
            <textarea
              ref={textareaRef}
              name="html"
              id="html"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="Paste your HTML e.g.<div> <button>Submit</button></div>"
              className="max-h-56 max-w-lg overflow-y-auto h-28 leading-8 w-full rounded-xl rounded-b-none border-[0.3px] border-white/30 bg-[#2B2B33] p-3 text-sm dark:bg-bg-[#2B2B33] text-white placeholder:text-white/70 placeholder:font-light focus:outline-none"
            />
            <div className="w-full max-w-lg flex justify-end rounded-xl rounded-t-none bg-[#2B2B33] px-4  py-3 text-white border-[0.3px] border-white/30">
              <div className="flex gap-3 items-center">
                <span
                  aria-live="polite"
                  className={charCount === 0 ? "opacity-50" : ""}
                >
                  chars: {charCount}
                </span>
                <button
                  type="submit"
                  disabled={charCount === 0}
                  className={`${charCount === 0 ? "opacity-50" : " cursor-pointer"} rounded-full bg-[#75CE55] text-[#242424] p-2 self-end   focus-ring hover:bg-[#30b400] hover:text-black
     disabled:cursor-not-allowed`}
                >
                  <ArrowUp size={25} />
                  <span className="sr-only">Analyze HTML</span>
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="flex justify-center  w-full max-w-lg ">
          <div className="flex min-w-0  whitespace-pre-wrap break-all flex-col justify-start items-start ">
            {" "}
            <button
              type="button"
              onClick={() => setHtml(example)}
              className="border-[0.3px]  border-white/30 rounded-xl rounded-b-none  px-6 py-2 bg-[#75CE55] hover:bg-[#30b400] font-base text-[#242424]  focus-ring   cursor-pointer    "
            >
              Try example
            </button>
            <pre className="w-full max-w-full max-h-[60vh] overflow-y-auto overflow-x-hidden whitespace-pre-wrap wrap-break-word  rounded-xl rounded-tl-none border border-white/30 bg-[#2B2B33] p-3 font-light text-base focus-ring">
              <code className="block wrap-break-word"> {example}</code>
            </pre>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MainInput;
