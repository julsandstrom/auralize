import { FocusableItem } from "../lib/analyze/types";

export function ScreenReaderOutput({
  item,
}: {
  item: FocusableItem | null;
  index: number;
}) {
  return (
    <>
      {!item ? (
        <p className="text-sm text-white">Nothing selected.</p>
      ) : (
        <div className="flex justify-center  w-full h-full">
          <div className="flex flex-col   w-full  lg:border-b-[0.3px] lg:border-r-[0.3px] lg:border-l-[0.3px] border-white/40 h-full">
            <h2
              id="focusables-heading"
              className="text-xl bg-[#2B2B33] font-medium text-center mt-10 lg:mt-0 font-display border-t-[0.3px] border-b-[0.3px]  border-white/40 w-full py-4"
            >
              Screen reader output
            </h2>
            <div className="  p-3 bg-none max-h-56">
              <p className="mt-1 text-xl lg:text-3xl text-center">
                {item?.info.srPreview}
              </p>
            </div>{" "}
            <div className="flex gap-2"></div>
          </div>
        </div>
      )}
    </>
  );
}
