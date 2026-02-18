import { useMemo } from "react";
import { getFocusables } from "../analyze/focusables";
import type { FocusableItem } from "../analyze/types";

export function useFocusables(parsed: Document | null) {
  return useMemo<FocusableItem[]>(() => {
    if (!parsed) return [];
    return getFocusables(parsed);
  }, [parsed]);
}
