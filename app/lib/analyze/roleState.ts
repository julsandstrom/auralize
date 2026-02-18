const attrTrue = (el: Element, name: string) =>
  el.getAttribute(name) === "true";

export function getRoleV1(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const roleAttr = el.getAttribute("role");
  if (roleAttr) return roleAttr;

  if (tag === "button") return "button";
  // if (tag === "a" && el.getAttribute("href")) return "link";
  if (tag === "a" && (el as HTMLElement).hasAttribute("href")) return "link";
  if (tag === "select") return "combo box";
  if (tag === "textarea") return "multi-line edit";

  if (tag === "input") {
    const type = (el.getAttribute("type") ?? "text").toLowerCase();
    if (type === "checkbox") return "checkbox";
    if (type === "radio") return "radio button";
    if (type === "range") return "slider";
    if (type === "button" || type === "submit" || type === "reset")
      return "button";
    return "edit";
  }

  if (tag === "summary") return "button";

  return "generic";
}

export function getStateTokensV1(el: Element): string[] {
  const tokens: string[] = [];

  const requiredAttr = el.getAttribute("aria-required");
  if (requiredAttr === "true" || el.hasAttribute("required")) {
    tokens.push("required");
  }

  const invalidAttr = el.getAttribute("aria-invalid");
  if (invalidAttr === "true") {
    tokens.push("invalid");
  }

  if (el.hasAttribute("disabled") || attrTrue(el, "aria-disabled")) {
    tokens.push("unavailable");
  }
  // if (
  //   el.getAttribute("aria-required") === "true" ||
  //   el.hasAttribute("required")
  // ) {
  //   tokens.push("required");
  // }

  // if (el.getAttribute("aria-invalid") === "true") {
  //   tokens.push("invalid");
  // }
  const expanded = el.getAttribute("aria-expanded");
  if (expanded === "true") tokens.push("expanded");
  if (expanded === "false") tokens.push("collapsed");

  const ariaChecked = el.getAttribute("aria-checked");
  if (ariaChecked === "true") tokens.push("checked");
  if (ariaChecked === "false") tokens.push("not checked");
  if (ariaChecked === "mixed") tokens.push("partially checked");

  if (!ariaChecked && el instanceof HTMLInputElement) {
    if (el.type === "checkbox" || el.type === "radio") {
      tokens.push(el.checked ? "checked" : "not checked");
    }
  }

  return tokens;
}
