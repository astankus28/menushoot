export const VARIATION_ANGLES = [
  {
    label: "Classic",
    description: "The expected, refined interpretation of the style",
    modifier:
      "Apply this style faithfully and professionally — the clean, expected, most universally appealing version. Refined and safe.",
  },
  {
    label: "Dramatic",
    description: "Push the contrast and mood further",
    modifier:
      "Push this style to its dramatic extreme — heighten contrast, deepen shadows or brighten highlights, maximize the mood. Make it bold and striking.",
  },
  {
    label: "Warm",
    description: "Lean into warmth and appetite appeal",
    modifier:
      "Apply this style with a warm color temperature bias — golden tones, amber light, inviting warmth. Prioritize appetite appeal and coziness over drama.",
  },
  {
    label: "Editorial",
    description: "Magazine-ready, precise composition",
    modifier:
      "Apply this style as if shooting for a high-end food magazine — precise composition, strong negative space, deliberate prop placement implied, everything intentional. Think Bon Appetit or Food & Wine.",
  },
] as const;

export type VariationAngle = (typeof VARIATION_ANGLES)[number];

export function buildVariationPrompt(
  basePrompt: string,
  angle: VariationAngle,
  intake: {
    mood?: string;
    usage?: string;
    reference?: string;
    preserveNotes?: string;
    customDescription?: string;
  }
): string {
  let prompt = basePrompt;
  if (intake.mood) prompt += ` Overall mood preference: ${intake.mood}.`;
  if (intake.usage) prompt += ` This image will be used for: ${intake.usage}.`;
  if (intake.preserveNotes) prompt += ` Client note — preserve or change: ${intake.preserveNotes}.`;
  if (intake.customDescription) prompt += ` Additional client direction: ${intake.customDescription}.`;
  if (intake.reference) prompt += ` The client referenced this style inspiration: ${intake.reference}.`;
  prompt += ` VARIATION DIRECTION: ${angle.modifier}`;
  return prompt;
}
