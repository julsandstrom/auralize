import { FocusableItem } from "../lib/analyze/types";
import { Inspector } from "./Inspector";

type SummaryViewProps = {
  selected: FocusableItem | null;
  safeSelectedIndex: number;
  html: string;
};

const SummaryView = ({
  selected,
  safeSelectedIndex,
  html,
}: SummaryViewProps) => {
  return (
    <div className="flex flex-col gap-10 self-center pb-28 ">
      <Inspector item={selected} index={safeSelectedIndex} />
      <div className="lg:hidden"></div>

      <div className="flex flex-col lg:hidden">
        <h3
          id="focusables-heading"
          className="text-xl bg-[#2B2B33] font-medium text-center mt-10 font-display border-t-[0.3px] border-b-[0.3px] border-white/40 w-full py-4"
        >
          Code
        </h3>
        <pre className=" w-full max-w-full max-h-60 border-b-[0.3px] lg:border-white/40 overflow-y-auto overflow-x-hidden whitespace-pre-wrap wrap-break-word    p-3 font-light text-base focus-ring">
          <code className="font-mono">{html}</code>
        </pre>
      </div>
    </div>
  );
};

export default SummaryView;
