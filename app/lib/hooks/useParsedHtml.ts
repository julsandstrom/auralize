"use client";
import { useMemo } from "react";
import { preprocessMarkupV1, PreprocessMeta } from "../analyze/preprocess";

export function useParsedHtml(html: string): {
  doc: Document | null;
  meta: PreprocessMeta | null;
} {
  return useMemo(() => {
    if (!html.trim()) return { doc: null, meta: null };

    const meta = preprocessMarkupV1(html);

    try {
      const doc = new DOMParser().parseFromString(meta.output, "text/html");
      return { doc, meta };
    } catch {
      return { doc: null, meta };
    }
  }, [html]);
}
