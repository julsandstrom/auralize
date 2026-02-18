"use client";
import { useEffect, useState } from "react";
import { FocusableItem } from "../lib/analyze/types";
import { speak, stopSpeaking } from "../lib/speech/speak";

export function ScreenReaderOutput({
  item,
  index,
}: {
  item: FocusableItem | null;
  index: number;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  function handleToggle() {
    if (!item) return;

    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      speak(item.info.srPreview, () => setIsSpeaking(false));

      setIsSpeaking(true);
    }
  }
  useEffect(() => {
    stopSpeaking();
  }, [index]);

  return (
    <>
      {!item ? (
        <p className="text-sm text-white">Nothing selected.</p>
      ) : (
        <div className="flex justify-center max-w-lg w-full">
          <div className="flex flex-col max-w-lg  w-full">
            {" "}
            <button
              type="button"
              onClick={handleToggle}
              className="rounded-md rounded-b-none border px-8 text-center py-2 text-base w-28 bg-[#FCA087] text-[#1C1C1C] -mb-px cursor-pointer hover:bg-[#ff8e6f] hover:text-black   focus-ring"
            >
              {isSpeaking ? "Stop" : "Play"}
            </button>
            <div className="rounded-md rounded-tl-none border-[0.3px] border-white/30 p-3 bg-[#2B2B33] max-h-56">
              <p className="mt-1 text-2xl ">{item?.info.srPreview}</p>
            </div>{" "}
            <div className="flex gap-2"></div>
          </div>
        </div>
      )}
    </>
  );
}
