type NvdaArgs = {
  name: string;
  role: string;
  stateTokens: string[];
  valueText?: string;
  level?: number;
  description?: string;
};

export function nvdaPreviewV1({
  name,
  role,
  stateTokens,
  valueText,
  description,
}: NvdaArgs): string {
  const parts: string[] = [];

  if (name.trim()) parts.push(name.trim());

  parts.push(nvdaRole(role));

  for (const s of stateTokens) parts.push(nvdaState(s));

  const v = (valueText ?? "").trim();
  if (v) parts.push(v);

  const d = (description ?? "").trim();
  if (d) parts.push(d);

  return parts.filter(Boolean).join(", ");
}

function nvdaRole(role: string): string {
  switch (role) {
    case "edit":
      return "edit";
    case "multi-line edit":
      return "multi line edit";
    case "combo box":
      return "combo box";
    case "link":
      return "link";
    case "button":
      return "button";
    case "checkbox":
      return "check box";
    case "radio button":
      return "radio button";
    default:
      return role || "generic";
  }
}

function nvdaState(state: string): string {
  switch (state) {
    case "unavailable":
      return "unavailable";
    case "expanded":
      return "expanded";
    case "collapsed":
      return "collapsed";
    case "checked":
      return "checked";
    case "not checked":
      return "not checked";
    case "required":
      return "required";
    case "invalid":
      return "invalid";
    default:
      return state;
  }
}
