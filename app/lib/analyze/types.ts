export type NameSourceKind =
  | "aria-labelledby"
  | "aria-label"
  | "label"
  | "text"
  | "alt";

export type NameSource = {
  kind: NameSourceKind;
  value: string;
  status: "none" | "used" | "ignored";
};

export type FocusableInfo = {
  tag: string;
  hint: string;
  listLabel: string;

  name: string;
  nameSources: NameSource[];

  role: string;
  stateTokens: string[];

  srPreview: string;

  warnings: string[];

  valueText?: string;

  description: string;
  descriptionSources: { id: string; text: string }[];
};

export type FocusableItem = {
  el: Element;
  info: FocusableInfo;
  domIndex: number;
  tabIndex: number;
};
