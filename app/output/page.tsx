"use client";

import { useState } from "react";
import { useHtml } from "../providers";
import { useParsedHtml } from "../lib/hooks/useParsedHtml";
import { useFocusables } from "../lib/hooks/useFocusables";
import { FocusableList } from "../components/FocusableList";
import { Inspector } from "../components/Inspector";
import { ScreenReaderOutput } from "../components/ScreenReaderOutput";
import { JsxBanner } from "../components/JsxBanner";
import { TriangleAlert } from "lucide-react";
import SummaryView from "../components/SummaryView";

// import { preprocessMarkupV1 } from "../lib/analyze/preprocess";

type ViewMode = "output" | "summary";

export default function OutputPage() {
  const { html } = useHtml();
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

  return (
    <main className=" dark:bg-[#1C1C1C] w-full flex justify-center lg:mt-20">
      <div className="max-w-6xl  min-h-screen lg:grid lg:grid-cols-2 justify-center md:items-start lg:gap-36  p-6">
        {viewMode === "output" && (
          <>
            <div className="flex flex-col items-center lg:block">
              <ScreenReaderOutput item={selected} index={safeSelectedIndex} />
              <JsxBanner meta={meta} />
              {pageWarnings.length > 0 && (
                <div className="lg:hidden mx-auto mt-6 w-full max-w-lg rounded-xl border border-white/30 bg-[#2B2B33] p-4 ">
                  <div className="font-medium text-base leading-none text-white flex items-end gap-2 ">
                    <TriangleAlert size={25} className="text-[#FFD65A]" />
                    Warnings
                  </div>
                  <ul className="mt-2 list-disc space-y-3 pl-5 text-sm text-white font-light lg:hidden">
                    {pageWarnings.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              <h1 className="text-xl font-medium text-center mt-10 font-display">
                Focusable elements
              </h1>
              {!html.trim() ? (
                <p>No HTML found. Go back and paste something.</p>
              ) : (
                <>
                  <section className="grid gap-4 justify-center w-full">
                    <FocusableList
                      items={focusables}
                      selectedIndex={safeSelectedIndex}
                      onSelect={setSelectedIndex}
                    />
                  </section>
                </>
              )}
            </div>
            <div className="hidden lg:block">
              <SummaryView
                selected={selected}
                safeSelectedIndex={safeSelectedIndex}
                html={html}
              />
            </div>
          </>
        )}

        <div className="fixed  inset-x-0 bottom-10  w-full flex justify-center lg:hidden">
          <div className="flex rounded-xl justify-between  bg-[#E4E4E4] text-[#1C1C1C] w-80 ">
            {" "}
            <button
              onClick={() => setViewMode("output")}
              className={`h-full py-3 px-12 rounded-xl w-44  ${
                viewMode === "output"
                  ? "bg-[#FF7954] text-[#1C1C1C] shadow-inner font-semibold"
                  : "hover:bg-gray-200 active:bg-gray-300"
              }`}
            >
              Output
            </button>
            <button
              onClick={() => setViewMode("summary")}
              className={`h-full py-3 px-10 rounded-xl w-44 ${
                viewMode === "summary"
                  ? "bg-[#FF7954] text-[#1C1C1C] shadow-inner font-semibold"
                  : "hover:bg-gray-200 active:bg-gray-300"
              }`}
            >
              Summary
            </button>
          </div>
        </div>
        {/* <pre className="whitespace-pre-wrap rounded-lg border p-3 font-mono text-xs">
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
