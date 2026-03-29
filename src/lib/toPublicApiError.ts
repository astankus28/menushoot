/**
 * Never forward low-level parse / gateway errors to the client JSON body.
 */
export function toPublicApiErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);

  if (/unexpected token|not valid json|is not valid json|syntaxerror/i.test(raw)) {
    return "The image service couldn’t read that response—often the image is too large. Try a smaller JPEG or re-upload.";
  }
  if (/request en|entity too large|413|payload too large|body.*too large/i.test(raw)) {
    return "That image is too large for the AI service. Use a smaller photo or save as JPEG.";
  }

  const is429 =
    raw.includes("429") ||
    raw.includes("quota") ||
    raw.includes("RESOURCE_EXHAUSTED");
  if (is429) {
    return "Image generation hit a rate or quota limit. Check billing at https://aistudio.google.com or try again later.";
  }

  return raw.length > 280 ? `${raw.slice(0, 280)}…` : raw;
}
