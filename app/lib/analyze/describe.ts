import { computeDescriptionV1 } from "./description";
import { computeAccessibleNameTraceV1 } from "./name";
import { nvdaPreviewV1 } from "./nvdaPreview";
import { getRoleV1, getStateTokensV1 } from "./roleState";

import type { FocusableInfo } from "./types";
import { getValueTextV1 } from "./value";
import { getWarningsV1 } from "./warnings";

export function describe(el: Element, root: ParentNode): FocusableInfo {
  const { name, sources } = computeAccessibleNameTraceV1(el, root);

  const { description, parts } = computeDescriptionV1(el, root);

  const valueText = getValueTextV1(el);

  const warnings = getWarningsV1(el, root, name);
  const role = getRoleV1(el);
  const stateTokens = getStateTokensV1(el);
  const srPreview = nvdaPreviewV1({
    name,
    role,
    stateTokens,
    valueText,
    description,
  });
  const elAny = el as HTMLElement;
  const tag = el.tagName.toLowerCase();
  const nameAttr =
    tag === "select" || tag === "input" || tag === "textarea"
      ? (elAny.getAttribute("name") ?? "")
      : "";

  const listLabel = name ? `${tag} • "${name}"` : `${tag}`;
  const tagName = name && `${tag}`;

  const id = elAny.id ? `#${elAny.id}` : "";

  const text =
    tag === "button" || tag === "a" || tag === "summary"
      ? (elAny.innerText?.trim().replace(/\s+/g, " ").slice(0, 30) ?? "")
      : "";

  const ariaLabel = elAny.getAttribute?.("aria-label") ?? "";

  // const href = tag === "a" ? (el.getAttribute("href") ?? "") : "";

  const tabindex = elAny.getAttribute("tabindex") ?? "";

  const type = tag === "input" ? (elAny.getAttribute("type") ?? "text") : "";
  const hintParts = [
    `${tag}${id}`,
    type && `type="${type}"`,
    nameAttr && `name="${nameAttr}"`,
    ariaLabel && `aria-label="${ariaLabel}"`,
    text && `text="${text}"`,
    // href && `href="${href}"`,
    tabindex && `tabindex="${tabindex}"`,
  ].filter(Boolean);

  return {
    tag,
    hint: hintParts.join(" • "),
    listLabel,
    tagName,
    name,
    nameSources: sources,
    role,
    stateTokens,
    srPreview,
    warnings,
    valueText: valueText || undefined,
    description,
    descriptionSources: parts,
  };
}
