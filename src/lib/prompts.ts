const EDITORIAL_PROMPT =
  "Transform this food photo into a professional restaurant hero photograph. Apply: " +
  "Professional food photography lighting (soft, warm, appetizing). " +
  "Clean, editorial composition with shallow depth of field. " +
  "Enhanced colors and contrast to make the dish look irresistible. " +
  "Remove any distracting elements or imperfections. " +
  "Result should look like a high-end restaurant menu or food magazine editorial. " +
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
  "Low-key lighting with deep shadows and bright highlights. " +
  "Dramatic, editorial composition. " +
  "Rich, saturated colors with high contrast. " +
  "Atmosphere and depth - cinematic food photography. " +
  "High-end restaurant or food magazine editorial look. " +
  "Keep the same dish and food - create drama and sophistication. Output a single professional food photograph.";

const GOLDEN_HOUR_PROMPT =
  "Transform this food photo to look like it was shot during golden hour at an outdoor restaurant table. Apply: " +
  "Low-angle directional sunlight raking across the scene from the side — not overhead, not diffused. " +
  "Long, soft cast shadows stretching across the table surface. " +
  "Warm specular highlights catching on the rim of plates, glassware, and utensils. " +
  "Background slightly overexposed with warm light bloom and soft bokeh. " +
  "The food itself retains its natural colors — no yellow or orange filter over the whole image. " +
  "The warmth lives in the light, shadows, and surface reflections — not in a color grade. " +
  "Think: a dish photographed at an outdoor cafe table at 6pm in late summer, sunlight coming in from the left at a low angle. " +
  "Keep the same dish and food — add the magic of golden hour directional light. Output a single professional food photograph.";

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
  "Elegant, sophisticated lighting with deep jewel-toned shadows. " +
  "Rich textures and subtle garnishes. " +
  "Upscale restaurant or Michelin-star aesthetic. " +
  "Polished, premium presentation - nothing casual or rough. " +
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
  "Honest, unpolished beauty - nothing too perfect or overly staged. " +
  "Keep the same dish and food - make it feel crafted and soulful. Output a single professional food photograph.";

const SOCIAL_MEDIA_PROMPT =
  "Transform this food photo into a social media hero shot optimized for Instagram and TikTok. Apply: " +
  "Overhead or 45-degree flat-lay composition if possible. " +
  "Crisp, bright lighting with clean whites and punchy accent colors. " +
  "Styled with implied props - clean surfaces, minimal but deliberate arrangement. " +
  "High visual clarity - every detail sharp and intentional. " +
  "Scroll-stopping composition optimized for square or vertical crop. " +
  "Keep the same dish and food - style it for maximum social media impact. Output a single professional food photograph.";

const BRIGHT_AIRY_PROMPT =
  "Transform this food photo into a bright, airy lifestyle food photograph. Apply: " +
  "Soft overexposed highlights and clean whites throughout. " +
  "Light, breezy feel - morning window light, effortless and fresh. " +
  "Very gentle shadows, almost shadowless - the image feels lifted and open. " +
  "Pastel-adjacent tones - nothing heavy, dark, or saturated. " +
  "Fresh, clean, approachable - acai bowl, brunch, smoothie, cafe aesthetic. " +
  "Popular with fast-casual, health-forward, and coffee shop brands. " +
  "Keep the same dish and food - make it feel light and effortlessly beautiful. Output a single professional food photograph.";

export const ART_DIRECTION_STYLES = {
  editorial:   { id: "editorial",   label: "Editorial",     description: "Clean, high-end menu shot",          prompt: EDITORIAL_PROMPT },
  natural:     { id: "natural",     label: "Natural",        description: "Bright, fresh, organic",             prompt: NATURAL_PROMPT },
  moody:       { id: "moody",       label: "Moody",          description: "Dramatic, cinematic shadows",        prompt: MOODY_PROMPT },
  goldenHour:  { id: "goldenHour",  label: "Golden Hour",    description: "Late afternoon light, long shadows", prompt: GOLDEN_HOUR_PROMPT },
  minimal:     { id: "minimal",     label: "Minimal",        description: "Scandinavian, clean, app-ready",     prompt: MINIMAL_PROMPT },
  fineDining:  { id: "fineDining",  label: "Fine Dining",    description: "Luxurious, Michelin-level refined",  prompt: FINE_DINING_PROMPT },
  streetFood:  { id: "streetFood",  label: "Street Food",    description: "Bold, punchy, delivery-optimized",   prompt: STREET_FOOD_PROMPT },
  rustic:      { id: "rustic",      label: "Rustic",         description: "Earthy, artisan, farm-to-table",     prompt: RUSTIC_PROMPT },
  socialMedia: { id: "socialMedia", label: "Social Media",   description: "Instagram & TikTok optimized",       prompt: SOCIAL_MEDIA_PROMPT },
  brightAiry:  { id: "brightAiry",  label: "Bright & Airy",  description: "Light, pastel, café & brunch feel",  prompt: BRIGHT_AIRY_PROMPT },
};

export type StyleId = keyof typeof ART_DIRECTION_STYLES;
