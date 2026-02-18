import { Check, TriangleAlert, X } from "lucide-react";
import type { FocusableItem } from "../lib/analyze/types";

export function Inspector({
  item,
  index,
}: {
  item: FocusableItem | null;
  index: number;
}) {
  return (
    <div className=" flex flex-col gap-5 border-b-[0.3px]  border-white/40 lg:h-120">
      {!item ? (
        <p className="text-sm text-zinc-600">Nothing selected.</p>
      ) : (
        <>
          {" "}
          <h2
            id="focusables-heading"
            className="text-xl bg-[#2B2B33] font-medium text-center font-display border-t-[0.3px] border-b-[0.3px] border-white/40 w-full py-4"
          >
            Details
          </h2>
          <div className=" bg-none px-4 lg:px-4 flex flex-col gap-3">
            {" "}
            <p className="text-sm">
              <span className="text-[#F4F4F4] font-extralight">
                Computed name:
              </span>{" "}
              <span className="font-medium">{item.info.name || "(none)"}</span>
            </p>{" "}
            <p className="text-sm">
              <span className="text-[#F4F4F4] font-extralight">Role:</span>{" "}
              <span className="font-medium">{item.info.role}</span>
            </p>
            <p className="text-sm">
              <span className="text-[#F4F4F4] font-extralight">States:</span>{" "}
              <span className="font-medium">
                {item.info.stateTokens.length
                  ? item.info.stateTokens.join(", ")
                  : "(none)"}
              </span>
            </p>
          </div>
          <ul className="text-base font-light grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_auto_auto] justify-between  gap-5 pl-4 pr-6 py-5">
            {item.info.nameSources.map((s) => (
              <li key={s.kind} className="contents">
                <span className="font-extralight">{s.kind}</span>{" "}
                <span className="font-medium">
                  {s.value ? `"${s.value}"` : "none"}
                </span>
                <span
                  className={`${s.status === "used" && "text-[#53DF58]"} ${s.status === "ignored" && "text-[#FC4545]"}`}
                >
                  {" "}
                  {s.status === "used" ? (
                    <>
                      <div className="flex gap-1">
                        <Check />
                        <span className="text-[#F4F4F4]"> used</span>
                      </div>
                    </>
                  ) : s.status === "ignored" ? (
                    <>
                      <div className="flex gap-1">
                        <X />
                        <span className="text-[#F4F4F4]"> ignored</span>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </li>
            ))}
          </ul>
          {item.info.warnings.length > 0 && (
            <div className="border-[0.3px] border-[#F4F4F4]/30 p-3 bg-[#2B2B33]">
              <p className="text-base leading-none font-medium flex items-end gap-2 pb-3 ">
                {" "}
                <TriangleAlert size={25} className="text-[#FFD65A]" />
                Warnings
              </p>
              <ul className="mt-1 list-disc pl-5 text-sm text-[#F4F4F4] font-light ">
                {item.info.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
