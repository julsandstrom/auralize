export function buildSrPreviewV1(args: {
  name: string;
  role: string;
  stateTokens: string[];
}): string {
  const name = args.name.trim();
  const role = args.role.trim();
  const states = args.stateTokens.map((s) => s.trim()).filter(Boolean);

  const parts = [name || "(no name)", role || "generic", ...states];

  return parts.join(", ");
}
