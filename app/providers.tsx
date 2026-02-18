"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type HtmlState = {
  html: string;
  setHtml: (v: string) => void;
};

const HtmlContext = createContext<HtmlState | null>(null);

const STORAGE_KEY = "pasted-html";

export function HtmlProvider({ children }: { children: React.ReactNode }) {
  const [html, setHtml] = useState(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem(STORAGE_KEY) ?? "";
  });

  useEffect(() => {
    if (!html) return sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.setItem(STORAGE_KEY, html);
  }, [html]);

  const value = useMemo(() => ({ html, setHtml }), [html]);

  return <HtmlContext.Provider value={value}>{children}</HtmlContext.Provider>;
}

export function useHtml() {
  const ctx = useContext(HtmlContext);
  if (!ctx) throw new Error("useHtml must be used inside HtmlProvider");
  return ctx;
}
