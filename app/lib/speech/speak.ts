export function speak(text: string, onEnd?: () => void) {
  stopSpeaking();
  if (typeof window === "undefined") return;

  const t = text.trim();
  if (!t) return;

  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(t);

  utter.onend = () => {
    onEnd?.();
  };

  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}
