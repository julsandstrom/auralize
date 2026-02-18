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
          <div className="rounded-xl border-[0.3px] border-[#F4F4F4]/30  bg-[#2B2B33]">
            <div className="px-4 py-3">
              {" "}
              <p className="text-sm">
                <span className="text-[#F4F4F4] font-extralight">
                  Computed name:
                </span>{" "}
                <span className="font-medium">
                  {item.info.name || "(none)"}
                </span>
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
          </div>
          <div className="rounded-xl border-[0.3px] border-[#F4F4F4]/30  p-4 space-y-2 bg-[#2B2B33]">
            <ul className="text-base font-light grid grid-cols-[auto_1fr_auto]  gap-5">
              {item.info.nameSources.map((s) => (
                <li key={s.kind} className="contents">
                  <span className="font-medium">{s.kind}</span>{" "}
                  <span>{s.value ? `"${s.value}"` : "none"}</span>
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
          </div>
          {item.info.warnings.length > 0 && (
            <div className="rounded-md border-[0.3px] border-[#F4F4F4]/30 p-3 bg-[#2B2B33]">
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
