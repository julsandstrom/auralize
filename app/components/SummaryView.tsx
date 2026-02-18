import { FocusableItem } from "../lib/analyze/types";
import { Inspector } from "./Inspector";
import { ScreenReaderOutput } from "./ScreenReaderOutput";

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
    <div className="flex flex-col gap-10 self-center pt-5 pb-28">
      <Inspector item={selected} index={safeSelectedIndex} />
      <div className="lg:hidden">
        <ScreenReaderOutput item={selected} index={safeSelectedIndex} />
      </div>
      <div className="max-h-56 max-w-lg overflow-y-auto leading-8 w-full rounded-xl border-[0.3px] border-white/30 bg-[#2B2B33] p-3 text-sm dark:bg-[#2B2B33] text-white placeholder:text-white placeholder:font-light ">
        <code className="font-mono">{html}</code>
      </div>
    </div>
  );
};

export default SummaryView;
