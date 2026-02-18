import { TriangleAlert } from "lucide-react";
import type { PreprocessMeta } from "../lib/analyze/preprocess";

export function JsxBanner({ meta }: { meta: PreprocessMeta | null }) {
  if (!meta || meta.detected !== "jsx") return null;

  return (
    <div className="rounded-xl border border-white/30  p-3 text-sm bg-[#2B2B33] mt-5">
      <div className="font-medium flex items-end gap-2">
        <TriangleAlert size={25} className="text-[#FFD65A]" /> JSX detected
        (best-effort)
      </div>
      <p className="mt-1 text-white/80">
        Dynamic expressions were removed before parsing, so output may differ
        from runtime React.
      </p>

      {meta.notes.length > 0 && (
        <ul className="mt-2   text-white/80 font-light">
          {meta.notes.slice(0, 4).map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
