const clean = (s: string) => s.trim().replace(/\s+/g, " ");

function textFrom(node: Element | null): string {
  if (!node) return "";
  const el = node as HTMLElement;
  return clean(el.innerText || el.textContent || "");
}

export function computeDescriptionV1(el: Element, root: ParentNode) {
  const raw = el.getAttribute("aria-describedby") ?? "";
  const ids = raw.split(/\s+/).filter(Boolean);

  const parts: { id: string; text: string }[] = [];

  for (const id of ids) {
    const node = root.querySelector(`#${CSS.escape(id)}`);
    const text = textFrom(node as Element | null);
    if (text) parts.push({ id, text });
  }

  const description = clean(parts.map((p) => p.text).join(" "));
  return { description, parts };
}
