export type PreprocessMeta = {
  output: string;
  detected: "html" | "jsx";
  notes: string[];
};

export function preprocessMarkupV1(input: string): {
  output: string;
  detected: "html" | "jsx";
  notes: string[];
} {
  let s = input;
  const notes: string[] = [];

  const looksJsx =
    /\bclassName=|\bhtmlFor=|\bon[A-Z][a-zA-Z]+=|\{|\}\s*\/>/.test(s);

  if (!looksJsx) return { output: input, detected: "html", notes };

  s = s.replace(/\bclassName=/g, "class=");

  s = s.replace(/\bhtmlFor=/g, "for=");

  s = s.replace(/<textarea\b([^>]*)\s*\/>/gi, "<textarea$1></textarea>");

  s = s.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

  s = s.replace(/\{[\s\S]*?\}/g, "");

  s = s.replace(/\s+on[A-Z][a-zA-Z]*=\{[\s\S]*?\}/g, "");

  s = s.replace(/=\{[\s\S]*?\}/g, '=""');

  s = s.replace(/\/>\s*<\/textarea>/gi, "></textarea>");

  s = s.replace(/<textarea([\s\S]*?)\/>/gi, "<textarea$1></textarea>");
  if (/<textarea[\s\S]*\/>/.test(s)) {
    notes.push(
      "Self-closing <textarea /> may parse incorrectly. Converted best-effort.",
    );
  }

  return { output: s, detected: "jsx", notes };
}
