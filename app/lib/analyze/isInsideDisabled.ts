export function isInDisabledFieldset(el: Element): boolean {
  const fs = (el as HTMLElement).closest?.("fieldset[disabled]");
  return !!fs;
}
