function clean(s: string) {
  return s.trim().replace(/\s+/g, " ");
}
function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

const GENERIC_NAMES = new Set([
  "click here",
  "read more",
  "learn more",
  "more",
  "details",
  "submit",
  "go",
  "open",
  "next",
  "previous",
  "here",
  "link",
  "button",
]);

export function getWarningsV1(
  el: Element,
  root: ParentNode,
  computedName: string,
): string[] {
  const warnings: string[] = [];
  const tag = el.tagName.toLowerCase();

  if (tag === "a" || tag === "button") {
    const hasName =
      !!el.getAttribute("aria-label") ||
      !!el.getAttribute("aria-labelledby") ||
      clean((el as HTMLElement).innerText || el.textContent || "").length > 0;

    const hasImgAlt = !!el.querySelector("img[alt]:not([alt=''])");
    if (!hasName && !hasImgAlt) {
      warnings.push(
        `${tag === "a" ? "Link" : "Button"} has no accessible name.`,
      );
    }
    const imgs = Array.from(el.querySelectorAll("img"));
    for (const img of imgs) {
      const alt = img.getAttribute("alt");
      const isDecorative =
        alt === "" ||
        img.getAttribute("aria-hidden") === "true" ||
        img.getAttribute("role") === "presentation";

      if (!isDecorative && alt === null) {
        warnings.push(`Image inside ${tag} is missing alt text.`);
      }
    }
  }
  if (tag === "a" || tag === "button") {
    const n = normalize(computedName);

    if (n && GENERIC_NAMES.has(n)) {
      warnings.push(
        `Accessible name "${computedName}" is generic. Make it specific (e.g. "Read more about pricing").`,
      );
    }
  }

  const isFormControl =
    tag === "input" || tag === "select" || tag === "textarea";
  if (!isFormControl) return warnings;

  const elAny = el as HTMLElement;

  const hasNameFromAria =
    !!el.getAttribute("aria-label") || !!el.getAttribute("aria-labelledby");

  const wrapped = !!elAny.closest?.("label");
  const id = elAny.id;
  const hasForLabel =
    !!id && !!root.querySelector(`label[for="${CSS.escape(id)}"]`);

  if (!hasNameFromAria && !wrapped && !hasForLabel) {
    const prev = elAny.previousElementSibling;
    if (prev && prev.tagName.toLowerCase() === "label") {
      const labelText = clean(
        (prev as HTMLElement).innerText || prev.textContent || "",
      );
      if (labelText) {
        warnings.push(
          `Label text "${labelText}" is not associated. Use <label for="..."> + id, or wrap the control in <label>.`,
        );
      }
    }
  }

  const ariaInvalid = el.getAttribute("aria-invalid");
  if (ariaInvalid === "true") {
    const describedBy = (el.getAttribute("aria-describedby") ?? "")
      .split(/\s+/)
      .filter(Boolean);

    const missingIds: string[] = [];
    const emptyIds: string[] = [];

    for (const id of describedBy) {
      const node = root.querySelector(`#${CSS.escape(id)}`);
      if (!node) {
        missingIds.push(id);
        continue;
      }
      const text =
        (node as HTMLElement | null)?.innerText || node.textContent || "";
      if (text.trim().length === 0) emptyIds.push(id);
    }

    if (missingIds.length > 0) {
      warnings.push(
        `aria-describedby references missing id(s): ${missingIds.join(", ")}.`,
      );
    }

    if (emptyIds.length > 0) {
      warnings.push(
        `aria-describedby references id(s) with no readable text: ${emptyIds.join(", ")}.`,
      );
    }

    if (describedBy.length === 0) {
      warnings.push(
        `aria-invalid="true" is set but no aria-describedby is provided for an error message. Add an element with the error text and reference it via aria-describedby.`,
      );
    } else {
      const hasAnyText = describedBy.some((id) => {
        const node = root.querySelector(`#${CSS.escape(id)}`);
        const text =
          (node as HTMLElement | null)?.innerText || node?.textContent || "";
        return text.trim().length > 0;
      });

      if (!hasAnyText) {
        warnings.push(
          `aria-invalid="true" is set but aria-describedby does not resolve to any readable text. Ensure the referenced element(s) exist and contain the error message text.`,
        );
      }
    }
  }

  return warnings;
}
