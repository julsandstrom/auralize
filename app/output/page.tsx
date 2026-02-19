"use client";

import { useEffect, useState } from "react";
import { useHtml } from "../providers";
import { useParsedHtml } from "../lib/hooks/useParsedHtml";
import { useFocusables } from "../lib/hooks/useFocusables";
import { FocusableList } from "../components/FocusableList";

import { ScreenReaderOutput } from "../components/ScreenReaderOutput";
import { JsxBanner } from "../components/JsxBanner";
import { TriangleAlert } from "lucide-react";
import SummaryView from "../components/SummaryView";
import { speak, stopSpeaking } from "../lib/speech/speak";

// import { preprocessMarkupV1 } from "../lib/analyze/preprocess";

type ViewMode = "output" | "summary";

export default function OutputPage() {
  const { html } = useHtml();
  const [isSpeaking, setIsSpeaking] = useState(false);
  // const prep = useMemo(() => preprocessMarkupV1(html), [html]);
  // const preprocessedHtml = prep.output;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("output");
  const { doc, meta } = useParsedHtml(html);
  const focusables = useFocusables(doc);
  const pageWarnings = Array.from(
    new Set(focusables.flatMap((f) => f.info.warnings ?? [])),
  );

  const safeSelectedIndex =
    focusables.length === 0
      ? 0
      : Math.min(selectedIndex, focusables.length - 1);

  const selected = focusables[safeSelectedIndex] ?? null;

  function handleToggle() {
    if (!selected) return;

    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      speak(selected.info.srPreview, () => setIsSpeaking(false));

      setIsSpeaking(true);
    }
  }
  useEffect(() => {
    stopSpeaking();
  }, [safeSelectedIndex]);

  return (
    <main className=" dark:bg-[#1c1c1c] w-full flex justify-center mt-10  lg:mt-20">
      {" "}
      <div className="w-full  min-h-screen lg:grid lg:grid-cols-3 justify-center lg:items-start  lg:grid-rows-[80px_600px_auto] ">
        {viewMode === "output" && (
          <>
            <div className="flex justify-center  lg:row-start-1 lg:col-start-2 ">
              {" "}
              <button
                type="button"
                onClick={handleToggle}
                className="rounded-xl lg:text-2xl hidden lg:block border px-5  py-2 lg:py-3 text-base  bg-[#75CE55] text-[#242424] cursor-pointer hover:bg-[#79b463] hover:text-black   focus-ring  w-32 "
              >
                {isSpeaking ? "Stop" : "Listen"}
              </button>
            </div>
            <div className="flex flex-col items-center w-full lg:col-start-2 lg:row-start-2 lg:h-150">
              <button
                type="button"
                onClick={handleToggle}
                className="rounded-xl lg:hidden border px-5  py-2 text-base  bg-[#75CE55] text-[#242424] cursor-pointer hover:bg-[#79b463] hover:text-black   focus-ring"
              >
                {isSpeaking ? "Stop" : "Listen"}
              </button>
              <ScreenReaderOutput item={selected} index={safeSelectedIndex} />
              <JsxBanner meta={meta} />
              {/* {pageWarnings.length > 0 && (
                <div className="lg:hidden mx-auto p-2 mt-6 w-full max-w-lg border border-[#F4F4F4]/30 bg-[#2B2B33]  ">
                  <span className="font-medium text-base leading-none text-[#F4F4F4] flex items-end gap-2 ">
                    <TriangleAlert size={25} className="text-[#FFD65A]" />
                    Warnings
                  </span>
                  <ul className="mt-2 list-disc space-y-3 pl-5 text-sm text-[#F4F4F4] font-light lg:hidden">
                    {pageWarnings.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              )} */}
            </div>
            <div className="flex flex-col items-center w-full lg:col-start-1 lg:row-start-2 lg:h-150 max-h-150 lg:border-b-[0.3px] lg:border-white/40">
              <h2
                id="focusables-heading"
                className="text-xl bg-[#2B2B33] font-medium text-center mt-20 lg:mt-0 font-display border-t-[0.3px] border-b-[0.3px]  border-white/40 w-full py-4"
              >
                Focusable elements
              </h2>
              {!html.trim() ? (
                <p>No HTML found. Go back and paste something.</p>
              ) : (
                <>
                  <section
                    aria-labelledby="focusables-heading"
                    className="w-full  overflow-y-auto"
                  >
                    <FocusableList
                      items={focusables}
                      selectedIndex={safeSelectedIndex}
                      onSelect={setSelectedIndex}
                    />
                  </section>
                </>
              )}
            </div>
            <div className="hidden lg:block lg:col-start-3 lg:row-start-2 ">
              <SummaryView
                selected={selected}
                safeSelectedIndex={safeSelectedIndex}
                html={html}
              />
            </div>
          </>
        )}
        <div className="lg:flex flex-col hidden lg:row-start-3 lg:col-span-3">
          <h3
            id="focusables-heading"
            className="text-xl bg-[#2B2B33] font-medium text-center font-display border-t-[0.3px] border-b-[0.3px] border-white/40 w-full py-4"
          >
            Code
          </h3>
          <pre className=" w-full max-w-full max-h-[60vh] overflow-y-auto overflow-x-hidden whitespace-pre-wrap wrap-break-word    p-6 font-light text-base focus-ring">
            <code className="font-mono text-white/80">{html}</code>
          </pre>
        </div>

        <div className="fixed  inset-x-0 bottom-10  w-full flex justify-center lg:hidden">
          <div className="flex rounded-xl justify-between  bg-[#2B2B33] text-[#E0E0E0] border-[0.3px] border-white/40 w-80 ">
            {" "}
            <button
              onClick={() => setViewMode("output")}
              className={`h-full py-3 px-12 rounded-xl w-44  ${
                viewMode === "output"
                  ? "bg-[#E0E0E0] text-[#2B2B2B] shadow-inner font-semibold"
                  : "hover:bg-gray-200 active:bg-gray-300"
              }`}
            >
              Output
            </button>
            <button
              onClick={() => setViewMode("summary")}
              className={`h-full py-3 px-10 rounded-xl w-44 ${
                viewMode === "summary"
                  ? "bg-[#E0E0E0] text-[#2B2B2B] shadow-inner font-semibold"
                  : "hover:bg-gray-200 active:bg-gray-300"
              }`}
            >
              Summary
            </button>
          </div>
        </div>
        {/* <pre className="[#F4F4F4]space-pre-wrap rounded-lg border p-3 font-mono text-xs">
            {preprocessedHtml}
          </pre> */}
        {viewMode === "summary" && (
          <>
            <SummaryView
              selected={selected}
              safeSelectedIndex={safeSelectedIndex}
              html={html}
            />
          </>
        )}
      </div>
    </main>
  );
}
