import { TriangleAlert } from "lucide-react";
import type { FocusableItem } from "../lib/analyze/types";
import { speak, stopSpeaking } from "../lib/speech/speak";

export function Inspector({
  item,
  index,
}: {
  item: FocusableItem | null;
  index: number;
}) {
  return (
    <div className=" flex flex-col gap-5 max-w-lg">
      {!item ? (
        <p className="text-sm text-zinc-600">Nothing selected.</p>
      ) : (
        <>
          {" "}
          <h2 className="text-xl font-medium text-center text-[#FFFFFF] rounded-t-xl">
            <span className="font-light"> Inspecting: </span>
            {index + 1}. {item.info.role}
          </h2>
          <div className="rounded-xl border-[0.3px] border-white/30  bg-[#2B2B33]">
            {/* <p className="text-sm text-zinc-600">Selected #{index + 1}</p>
          <pre className="whitespace-pre-wrap rounded-md border p-3 font-mono text-sm">
            {item.info.hint}
          </pre> */}{" "}
            <div className="px-4 py-3">
              {" "}
              <p className="text-sm">
                <span className="text-white font-extralight">
                  Computed name:
                </span>{" "}
                <span className="font-medium">
                  {item.info.name || "(none)"}
                </span>
              </p>{" "}
              <p className="text-sm">
                <span className="text-white font-extralight">Role:</span>{" "}
                <span className="font-medium">{item.info.role}</span>
              </p>
              <p className="text-sm">
                <span className="text-white font-extralight">States:</span>{" "}
                <span className="font-medium">
                  {item.info.stateTokens.length
                    ? item.info.stateTokens.join(", ")
                    : "(none)"}
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-xl border-[0.3px] border-white/30  p-4 space-y-2 bg-[#2B2B33]">
            <ul className="text-base font-light grid grid-cols-[auto_1fr_auto]  gap-5">
              {item.info.nameSources.map((s) => (
                <li key={s.kind} className="contents">
                  <span className="font-medium">{s.kind}</span>{" "}
                  <span>{s.value ? `"${s.value}"` : "none"}</span>
                  <span
                    className={`${s.status === "used" && "text-[#53DF58]"} ${s.status === "ignored" && "text-[#FC4545]"}`}
                  >
                    {" "}
                    {s.status === "used"
                      ? "✓ used"
                      : s.status === "ignored"
                        ? "(ignored)"
                        : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="rounded-md border p-3">
            <p className="text-sm font-medium">Screen reader preview</p>
            <p className="mt-1 font-mono text-sm">{item.info.srPreview}</p>
          </div> */}
          {item.info.warnings.length > 0 && (
            <div className="rounded-md border-[0.3px] border-white/30 p-3 bg-[#2B2B33]">
              <p className="text-base leading-none font-medium flex items-end gap-2 pb-3 ">
                {" "}
                <TriangleAlert size={25} className="text-[#FFD65A]" />
                Warnings
              </p>
              <ul className="mt-1 list-disc pl-5 text-sm text-white font-light ">
                {item.info.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
          {/* <div className="flex gap-2">
            <button
              type="button"
              onClick={() => speak(item.info.srPreview)}
              className="rounded-md border px-3 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Speak
            </button>

            <button
              type="button"
              onClick={stopSpeaking}
              className="rounded-md border px-3 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Stop
            </button>
          </div> */}
          {/* {item.info.valueText && (
            <p className="text-sm">
              <span className="text-white font-extralight">Value:</span>{" "}
              <span className="font-medium">{item.info.valueText}</span>
            </p>
          )} */}
        </>
      )}
    </div>
  );
}
