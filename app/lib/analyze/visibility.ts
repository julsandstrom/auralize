export function hasHiddenAncestor(el: Element): boolean {
  let cur: Element | null = el;

  while (cur) {
    if (cur.hasAttribute("hidden")) return true;
    if (cur.getAttribute("aria-hidden") === "true") return true;
    cur = cur.parentElement;
  }

  return false;
}
