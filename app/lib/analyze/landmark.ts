export type LandmarkInfo =
  | { kind: "none" }
  | { kind: "landmark"; role: string; name?: string };

const landmarkRoles = new Set([
  "banner",
  "navigation",
  "main",
  "contentinfo",
  "complementary",
  "region",
  "form",
  "search",
]);

function clean(s: string) {
  return s.trim().replace(/\s+/g, " ");
}

function landmarkLabel(el: Element, root: ParentNode): string {
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel) return clean(ariaLabel);

  const labelledby = el.getAttribute("aria-labelledby");
  if (labelledby) {
    const ids = labelledby.split(/\s+/).filter(Boolean);
    const text = ids
      .map((id) => root.querySelector(`#${CSS.escape(id)}`))
      .map((n) => (n as HTMLElement | null)?.innerText || n?.textContent || "")
      .map(clean)
      .filter(Boolean)
      .join(" ");
    return text;
  }

  return "";
}

export function getLandmarkInfoV1(el: Element, root: ParentNode): LandmarkInfo {
  let cur: Element | null = el;

  while (cur) {
    const tag = cur.tagName.toLowerCase();

    const nativeRole =
      tag === "header"
        ? "banner"
        : tag === "nav"
          ? "navigation"
          : tag === "main"
            ? "main"
            : tag === "footer"
              ? "contentinfo"
              : tag === "aside"
                ? "complementary"
                : tag === "form"
                  ? "form"
                  : "";

    const explicitRole = (cur.getAttribute("role") ?? "").toLowerCase();
    const role = (explicitRole || nativeRole).trim();

    if (role && landmarkRoles.has(role)) {
      const name = landmarkLabel(cur, root);

      if (role === "region" && !name) {
        cur = cur.parentElement;
        continue;
      }

      return { kind: "landmark", role, name: name || undefined };
    }

    cur = cur.parentElement;
  }

  return { kind: "none" };
}
