import type { FocusableItem } from "./types";
import { describe } from "./describe";
import { hasHiddenAncestor } from "./visibility";
import { isInDisabledFieldset } from "./isInsideDisabled";

const SELECTOR = [
  "a[href]",
  "button",
  "input:not([type='hidden'])",
  "select",
  "textarea",
  "summary",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function getFocusables(doc: Document): FocusableItem[] {
  const root = doc.body;
  const all = Array.from(root.querySelectorAll(SELECTOR));

  function readTabIndex(el: Element): number {
    const raw = el.getAttribute("tabindex");
    if (raw == null) return 0;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) ? n : 0;
  }

  const filtered = all.filter((el) => {
    if (el.hasAttribute("disabled")) return false;
    if (el.hasAttribute("inert")) return false;
    if (hasHiddenAncestor(el)) return false;
    if (isInDisabledFieldset(el)) return false;

    const raw = el.getAttribute("tabindex");
    if (raw != null) {
      const n = Number.parseInt(raw, 10);
      if (!Number.isFinite(n)) return false;
    }

    return true;
  });
  const items = filtered.map((el, domIndex) => ({
    el,
    info: describe(el, doc),
    domIndex,
    tabIndex: readTabIndex(el),
  }));
  const positives = items
    .filter((x) => x.tabIndex > 0)
    .sort((a, b) => a.tabIndex - b.tabIndex || a.domIndex - b.domIndex);

  const normal = items
    .filter((x) => x.tabIndex <= 0)
    .sort((a, b) => a.domIndex - b.domIndex);

  return [...positives, ...normal];
}
