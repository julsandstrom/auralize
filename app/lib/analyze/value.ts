const clean = (s: string) => s.trim().replace(/\s+/g, " ");
function isTextLikeInputType(type: string) {
  // MVP: include the common text-like types
  return [
    "text",
    "email",
    "search",
    "password",
    "tel",
    "url",
    "number",
  ].includes(type);
}
export function getValueTextV1(el: Element): string {
  const tag = el.tagName.toLowerCase();

  if (tag === "select" && el instanceof HTMLSelectElement) {
    const opt = el.selectedOptions?.[0];
    const txt = opt?.textContent ?? "";
    return clean(txt);
  }

  if (tag === "textarea" && el instanceof HTMLTextAreaElement) {
    const v = clean(el.value ?? "");
    return v ? v.slice(0, 60) : "blank";
  }

  if (tag === "input" && el instanceof HTMLInputElement) {
    const type = (el.getAttribute("type") ?? "text").toLowerCase();
    if (!isTextLikeInputType(type)) return "";

    const v = clean(el.value ?? "");
    return v || "blank";
  }

  return "";
}
