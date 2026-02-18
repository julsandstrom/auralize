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
    <ol className="w-80 lg:w-96 max-w-lg">
      {items.map((item, i) => {
        const isActive = i === selectedIndex;
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              className={[
                "w-full max-w-lg rounded px-2 py-3 mt-3 font-extralight border-[#F4F4F4]/30 border-[0.3px] text-[#F4F4F4] flex justify-between",
                "",
                isActive
                  ? "bg-[#F4F4F4] dark:bg-[#F4F4F4]  dark:text-[#1E1E1E] font-semibold"
                  : "",
              ].join(" ")}
            >
              <span className="text-left"> {i + 1}. </span>{" "}
              {item.info.listLabel} <div className="w-5"></div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
