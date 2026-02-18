import type { NameSource, NameSourceKind } from "./types";

const clean = (s: string) => s.trim().replace(/\s+/g, " ");
function stripJsxTextArtifacts(s: string) {
  return (
    s
      // remove {" "} / {' '} / {` `}
      .replace(/\{\s*["'`]\s*["'`]\s*\}/g, " ")
      // remove { ... } expressions
      .replace(/\{[\s\S]*?\}/g, " ")
      // collapse whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

function textFrom(node: Element | null): string {
  if (!node) return "";
  const el = node as HTMLElement;
  const raw = el.innerText || el.textContent || "";
  return stripJsxTextArtifacts(raw);
}

function push(
  sources: NameSource[],
  kind: NameSourceKind,
  value: string,
  decidedName: string,
) {
  const v = clean(value);
  if (!v) {
    sources.push({ kind, value: "", status: "none" });
    return decidedName;
  }

  if (!decidedName) {
    sources.push({ kind, value: v, status: "used" });
    return v;
  }

  sources.push({ kind, value: v, status: "ignored" });
  return decidedName;
}

function isLabelable(el: Element): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag === "input") {
    const type = (el as HTMLElement).getAttribute("type") ?? "text";
    return type !== "hidden";
  }
  return (
    tag === "select" ||
    tag === "textarea" ||
    tag === "meter" ||
    tag === "progress"
  );
}
function isImage(el: Element) {
  return el.tagName.toLowerCase() === "img";
}

function allowsAltFallback(el: Element): boolean {
  const tag = el.tagName.toLowerCase();

  return tag === "button" || tag === "a";
}

function altFromFirstImg(el: Element): string {
  if (el.tagName.toLowerCase() === "img") {
    return (el as HTMLElement).getAttribute("alt") ?? "";
  }

  const img = el.querySelector("img[alt]");
  return (img as HTMLElement | null)?.getAttribute("alt") ?? "";
}

function allowsTextFallback(el: Element): boolean {
  const tag = el.tagName.toLowerCase();
  return tag === "button" || tag === "a" || tag === "summary";
}

export function computeAccessibleNameTraceV1(el: Element, root: ParentNode) {
  const sources: NameSource[] = [];
  let decidedName = "";

  if (!decidedName) {
    const tag = el.tagName.toLowerCase();

    const alt =
      tag === "img"
        ? altFromFirstImg(el)
        : allowsAltFallback(el)
          ? altFromFirstImg(el)
          : "";

    if (tag === "img" || alt) {
      decidedName = push(sources, "alt", alt, decidedName);
    }
  }

  const labelledby = el.getAttribute("aria-labelledby");
  if (labelledby) {
    const ids = labelledby.split(/\s+/).filter(Boolean);
    const parts = ids
      .map((id) => root.querySelector(`#${CSS.escape(id)}`))
      .map((node) => textFrom(node as Element | null))
      .filter(Boolean);

    decidedName = push(
      sources,
      "aria-labelledby",
      parts.join(" "),
      decidedName,
    );
  } else {
    decidedName = push(sources, "aria-labelledby", "", decidedName);
  }

  const ariaLabel = el.getAttribute("aria-label") ?? "";
  decidedName = push(sources, "aria-label", ariaLabel, decidedName);

  if (isLabelable(el)) {
    if (isLabelable(el)) {
      let labelText = "";

      // Not covering htmlFor
      const id = (el as HTMLElement).id;
      if (id) {
        const label = root.querySelector(`label[for="${CSS.escape(id)}"]`);
        labelText = textFrom(label as Element | null);
      }

      if (!labelText) {
        const labelParent = (el as HTMLElement).closest?.("label");
        if (labelParent) {
          const clone = labelParent.cloneNode(true) as HTMLElement;

          clone
            .querySelectorAll("input, select, textarea")
            .forEach((n) => n.remove());

          labelText = clean(clone.innerText || clone.textContent || "");
        }
      }

      decidedName = push(sources, "label", labelText, decidedName);
    }
  }

  if (allowsTextFallback(el)) {
    const text = textFrom(el as Element);
    decidedName = push(sources, "text", text, decidedName);
  }

  return { name: decidedName, sources };
}
