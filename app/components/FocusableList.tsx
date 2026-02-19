import type { FocusableItem } from "../lib/analyze/types";

export function FocusableList({
  items,
  selectedIndex,
  onSelect,
}: {
  items: FocusableItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-[#F4F4F4]">No focusable elements found.</p>
    );
  }

  return (
    <ol className="  w-full flex flex-col items-center justify-center ">
      {items.map((item, i) => {
        const isActive = i === selectedIndex;
        return (
          <li className="w-full " key={i}>
            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(i)}
              className={[
                "w-full   font-extralight  text-[#F4F4F4] gap-2 focus-ring py-3",
                "",
                isActive
                  ? "bg-none border-2 border-[#75CE55]  dark:text-[#F4F4F4] text-[#F4F4F4]  font-semibold "
                  : "border-t-[0.3px] border-b-[0.3px] lg:border-r-[0.3px] border-white/20 ",
              ].join(" ")}
            >
              <span className="shrink-0 tabular-nums"> {i + 1}. </span>
              <span className="flex-1 text-left"> {item.info.tagName}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
