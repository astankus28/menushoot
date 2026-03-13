const EDITORIAL_PROMPT =
  "Transform this food photo into a professional restaurant hero photograph. Apply: " +
  "Professional food photography lighting (soft, warm, appetizing). " +
  "Clean, editorial composition with shallow depth of field. " +
  "Enhanced colors and contrast to make the dish look irresistible. " +
  "Remove any distracting elements or imperfections. " +
  "Result should look like a high-end restaurant menu or editorial shot. " +
  "Keep the same dish and food - only enhance the presentation, lighting, and overall quality. Output a single professional food photograph.";

const NATURAL_PROMPT =
  "Transform this food photo into a natural, fresh food photograph. Apply: " +
  "Bright, airy lighting (natural daylight feel). " +
  "Organic, minimal styling - keep it real and approachable. " +
  "Fresh, vibrant colors - healthy and appetizing. " +
  "Clean background, soft shadows. " +
  "Like a beautiful farm-to-table or healthy-casual restaurant. " +
  "Keep the same dish and food - enhance to look naturally delicious. Output a single professional food photograph.";

const MOODY_PROMPT =
  "Transform this food photo into a moody, dramatic food photograph. Apply: " +
  "Low-key lighting with deep shadows and highlights. " +
  "Dramatic, editorial composition. " +
  "Rich, saturated colors with contrast. " +
  "Atmosphere and depth - cinematic food photography. " +
  "High-end restaurant or magazine editorial look. " +
  "Keep the same dish and food - create drama and sophistication. Output a single professional food photograph.";

const WARM_PROMPT =
  "Transform this food photo into a warm, golden-hour food photograph. Apply: " +
  "Golden, warm lighting (sunset or candlelit feel). " +
  "Cozy, inviting atmosphere. " +
  "Warm color palette - amber, honey, earth tones. " +
  "Soft glow and gentle shadows. " +
  "Comfort food, home-style or bistro aesthetic. " +
  "Keep the same dish and food - make it feel warm and inviting. Output a single professional food photograph.";

const MINIMAL_PROMPT =
  "Transform this food photo into a minimal, Scandinavian-style food photograph. Apply: " +
  "Clean white or light neutral background. " +
  "Minimal props, focus entirely on the dish. " +
  "Soft, even lighting - no harsh shadows. " +
  "Fresh, simple, elegant. " +
  "Contemporary cafe or Nordic restaurant aesthetic. " +
  "Keep the same dish and food - strip it down to pure, refined simplicity. Output a single professional food photograph.";

const FINE_DINING_PROMPT =
  "Transform this food photo into a luxurious fine dining photograph. Apply: " +
  "Refined, precise plating focus. " +
  "Elegant, sophisticated lighting. " +
  "Rich textures and subtle garnishes. " +
  "Upscale restaurant or Michelin aesthetic. " +
  "Polished, premium presentation. " +
  "Keep the same dish and food - elevate to fine dining caliber. Output a single professional food photograph.";

const STREET_FOOD_PROMPT =
  "Transform this food photo into a high-energy street food photograph. Apply: " +
  "Bold, punchy saturation and high contrast. " +
  "Vivid, appetite-stimulating colors that pop on a phone screen. " +
  "Dynamic close-up composition emphasizing texture, steam, and freshness. " +
  "Optimized for delivery app thumbnails - UberEats, DoorDash, Grubhub. " +
  "Raw energy and craveability - make it look irresistible at a glance. " +
  "Keep the same dish and food - amplify its visual impact and street appeal. Output a single professional food photograph.";

const RUSTIC_PROMPT =
  "Transform this food photo into a rustic, artisan food photograph. Apply: " +
  "Matte, earthy tones - raw umber, slate, warm grey. " +
  "Textured surfaces implied - dark wood, stone, linen. " +
  "Soft, natural side lighting with gentle shadows. " +
  "Handcrafted, farm-to-table, farmers market aesthetic. " +
  "Honest, unpolished beauty - nothing too perfect or staged. " +
  "Keep the same dish and food - make it feel crafted and soulful. Output a single professional food photograph.";

const VIBRANT_PROMPT =
  "Transform this food photo into a vibrant, social-media-optimized photograph. Apply: " +
  "Maximum color saturation and clarity - every hue at full intensity. " +
  "Crisp, sharp detail throughout the dish. " +
  "Bright, even lighting with no harsh shadows. " +
  "Colors that stop the scroll on Instagram, TikTok, and food apps. " +
  "Hyper-appetizing, almost hyperreal - the platonic ideal of the dish. " +
  "Keep the same dish and food - make every color and texture sing. Output a single professional food photograph.";

export const ART_DIRECTION_STYLES = {
  editorial: { id: "editorial", label: "Editorial", description: "Clean, high-end menu shot", prompt: EDITORIAL_PROMPT },
  natural: { id: "natural", label: "Natural", description: "Bright, fresh, organic", prompt: NATURAL_PROMPT },
  moody: { id: "moody", label: "Moody", description: "Dramatic, editorial shadows", prompt: MOODY_PROMPT },
  warm: { id: "warm", label: "Warm & Golden", description: "Golden hour, cozy", prompt: WARM_PROMPT },
  minimal: { id: "minimal", label: "Minimal", description: "Scandinavian, clean", prompt: MINIMAL_PROMPT },
  fineDining: { id: "fineDining", label: "Fine Dining", description: "Luxurious, refined", prompt: FINE_DINING_PROMPT },
  streetFood: { id: "streetFood", label: "Street Food", description: "Bold, punchy, delivery-optimized", prompt: STREET_FOOD_PROMPT },
  rustic: { id: "rustic", label: "Rustic", description: "Earthy, artisan, farm-to-table", prompt: RUSTIC_PROMPT },
  vibrant: { id: "vibrant", label: "Vibrant", description: "Hyper-saturated, social-ready", prompt: VIBRANT_PROMPT },
};

export type StyleId = keyof typeof ART_DIRECTION_STYLES;
