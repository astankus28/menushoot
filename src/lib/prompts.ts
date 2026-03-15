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

// ── NEW STYLES ────────────────────────────────────────────────────────────────

const UBEREATS_PROMPT =
  "Transform this food photo into a perfectly optimized UberEats listing photograph. Apply: " +
  "High contrast with rich, saturated colors that pop at thumbnail size (around 400x300px). " +
  "Bright, even lighting — no dark shadows that muddy detail at small sizes. " +
  "The dish fills the frame confidently — centered, nothing cut off. " +
  "Clean, uncluttered background — no distracting props or surfaces. " +
  "Colors are true-to-life but punched up 15-20% — looks appetizing, not artificial. " +
  "Optimized for the UberEats grid — square-friendly, eye-catching at a glance. " +
  "Keep the same dish and food — make it the most click-worthy version of itself. Output a single professional food photograph.";

const DOORDASH_PROMPT =
  "Transform this food photo into a perfectly optimized DoorDash listing photograph. Apply: " +
  "Lifestyle-forward, slightly warmer tone than a clinical product shot. " +
  "Hero-style composition — the dish is the star, shot from a slight angle (not straight overhead). " +
  "Generous depth of field — background softly blurred to isolate the dish. " +
  "Warm, inviting tones that suggest comfort and satisfaction. " +
  "Bold enough to stop a scroll, refined enough to feel trustworthy. " +
  "Optimized for DoorDash's card layout — works at both thumbnail and expanded size. " +
  "Keep the same dish and food — make it irresistible on the DoorDash grid. Output a single professional food photograph.";

const JAPANESE_MINIMAL_PROMPT =
  "Transform this food photo into a Japanese minimalist food photograph. Apply: " +
  "Slate, dark stone, or matte ceramic surfaces — cool, precise, intentional. " +
  "Negative space used deliberately — the dish occupies one-third to one-half of the frame. " +
  "Single directional light source, soft and slightly cool-toned. " +
  "Extreme precision in composition — every element placed with purpose. " +
  "Colors are muted, desaturated, refined — nothing bright or garish. " +
  "Evokes Michelin-level Japanese omakase, ramen-ya, or high-end sushi. " +
  "Keep the same dish and food — elevate it with Japanese minimalist discipline. Output a single professional food photograph.";

const LATIN_VIBRANCY_PROMPT =
  "Transform this food photo into a vibrant Latin food photograph. Apply: " +
  "Bold, festive colors — deep reds, warm yellows, tropical greens, rich oranges. " +
  "Warm, energetic lighting that feels celebratory and alive. " +
  "Lush, abundant composition — generous portions, full frame, nothing sparse. " +
  "Textured surfaces implied — colorful tiles, rustic wood, woven cloth. " +
  "The energy of a Cuban cafeteria, Colombian restaurant, or Peruvian cevichería. " +
  "Appetite-first — everything looks fresh, bold, and deeply flavorful. " +
  "Keep the same dish and food — infuse it with Latin warmth and vibrancy. Output a single professional food photograph.";

const MEDITERRANEAN_PROMPT =
  "Transform this food photo into a Mediterranean food photograph. Apply: " +
  "Sun-bleached, warm palette — terracotta, olive green, aged linen, sandy stone. " +
  "Soft natural light suggesting a coastal terrace or whitewashed interior. " +
  "Rustic ceramic or hand-thrown pottery surfaces implied. " +
  "Abundant, generous styling — olives, herbs, drizzled olive oil feel present. " +
  "The warmth of a Greek island, Italian coast, or Lebanese mezze table. " +
  "Honest, sun-soaked beauty — nothing over-produced or clinical. " +
  "Keep the same dish and food — give it the soul of the Mediterranean. Output a single professional food photograph.";

const BBQ_PROMPT =
  "Transform this food photo into a classic BBQ and smokehouse food photograph. Apply: " +
  "Dark, rich tones — charred wood, cast iron, blackened bark on smoked meat. " +
  "Deep shadows with warm amber highlights suggesting firelight or embers. " +
  "Matte, textured surfaces — butcher paper, rough-hewn wood, iron skillets. " +
  "Smoke and char implied in the color and texture — deep mahogany, obsidian black, ember orange. " +
  "Abundant, unapologetic plating — nothing dainty or precious. " +
  "The feeling of a Texas pit, Southern smokehouse, or backyard champion. " +
  "Keep the same dish and food — make it look smoked, seared, and legendary. Output a single professional food photograph.";

const TACO_PROMPT =
  "Transform this food photo into a vibrant Mexican taqueria food photograph. Apply: " +
  "Bright, saturated colors — lime green, salsa red, charred tortilla brown, fresh white onion. " +
  "High energy, close-up composition — get close to the food, show the texture and toppings. " +
  "Warm, direct light suggesting a taqueria counter or food truck window. " +
  "Authentic, unpretentious styling — no fine dining affectation, just real taco energy. " +
  "Cilantro, lime, and salsa feel present even if not visible. " +
  "The vibe of a Mexico City street corner or a beloved local taqueria. " +
  "Keep the same dish and food — make it look like the best taco you've ever seen. Output a single professional food photograph.";

const HAPPY_HOUR_PROMPT =
  "Transform this food photo into a happy hour food and drinks photograph. Apply: " +
  "Warm bar lighting — amber, low-hanging pendants, golden backlight from shelves of bottles. " +
  "Social, convivial energy — the food feels like it belongs at a table with drinks around it. " +
  "Rich shadows that create atmosphere without losing detail. " +
  "Slightly cinematic — like a still from a great bar scene in a film. " +
  "The feeling of 5pm on a Friday — relaxed, indulgent, celebratory. " +
  "Works beautifully for apps, shareables, cocktail pairings, and bar menus. " +
  "Keep the same dish and food — give it the warmth and energy of happy hour. Output a single professional food photograph.";

const BRUNCH_PROMPT =
  "Transform this food photo into a weekend brunch food photograph. Apply: " +
  "Warm, lazy morning light — slightly golden, streaming from a window at a low angle. " +
  "Relaxed, lived-in styling — coffee cup nearby implied, linen napkin, Sunday morning energy. " +
  "Soft, warm whites and creams — nothing stark or cold. " +
  "Abundant but effortless — like someone made something beautiful without trying too hard. " +
  "The feeling of a long brunch at a favorite neighborhood spot. " +
  "Works for eggs, pancakes, avocado toast, pastries, cocktails, and all brunch formats. " +
  "Keep the same dish and food — make it feel like the best brunch of the week. Output a single professional food photograph.";

const LATE_NIGHT_PROMPT =
  "Transform this food photo into a late night food photograph. Apply: " +
  "Dark, moody background — urban night energy, deep shadows, ambient city glow. " +
  "Neon-adjacent accent lighting — cool blues, electric pinks, or sodium yellows as rim light. " +
  "High contrast — the food glows against a near-black background. " +
  "Raw, craveable energy — this is 1am after a night out, not a Sunday dinner. " +
  "The feeling of a late-night ramen spot, a 24-hour diner, or a ghost kitchen feeding the city. " +
  "Perfect for delivery-first brands, ghost kitchens, and bars with food menus. " +
  "Keep the same dish and food — make it look irresistible at midnight. Output a single professional food photograph.";

const WHITE_BG_PROMPT =
  "Transform this food photo into a clean white background product photograph. Apply: " +
  "Pure white or near-white seamless background — no texture, no props, no surface detail. " +
  "Soft, even studio lighting — no harsh shadows, gentle fill light on all sides. " +
  "The dish perfectly centered, floating cleanly on the white background. " +
  "Colors are accurate and vibrant against the white — nothing washed out. " +
  "E-commerce and menu-builder ready — works for digital menus, apps, and online ordering platforms. " +
  "Clean enough to be cut out or used on any background color. " +
  "Keep the same dish and food — make it a perfect product shot. Output a single professional food photograph.";

const OVERHEAD_PROMPT =
  "Transform this food photo into a perfect overhead flat lay food photograph. Apply: " +
  "Straight top-down 90-degree angle — completely overhead, no perspective distortion. " +
  "Clean, styled surface — marble, light wood, or neutral linen implied. " +
  "Deliberate, styled arrangement of the dish with minimal complementary elements. " +
  "Even, diffused lighting — no harsh shadows from above, soft and flat. " +
  "Square-crop friendly — the composition works perfectly in a 1:1 ratio. " +
  "Popular for bowls, grain bowls, salads, flatbreads, charcuterie, and sharing plates. " +
  "Keep the same dish and food — style it as a beautiful flat lay. Output a single professional food photograph.";

const STEAM_TEXTURE_PROMPT =
  "Transform this food photo to maximize the visual cues of heat, steam, and texture. Apply: " +
  "Visible steam wisping from the dish — make the food look hot, fresh, and just-served. " +
  "Enhanced surface texture — every glisten, char mark, sauce drip, and grain visible. " +
  "Warm backlighting that catches steam and makes it luminous. " +
  "Rich specular highlights on sauces, oils, and glazes — everything glistens. " +
  "The food looks like it arrived at the table 10 seconds ago. " +
  "Works best for soups, ramen, grilled meats, stir fries, and any hot dish. " +
  "Keep the same dish and food — make it look as hot, fresh, and textural as possible. Output a single professional food photograph.";

const DESSERT_PROMPT =
  "Transform this food photo into a luxurious dessert and pastry photograph. Apply: " +
  "Soft, warm light that catches sugar crystals, chocolate gloss, and cream textures. " +
  "Pastel and jewel-tone palette — blush, ivory, deep chocolate, berry, caramel gold. " +
  "Precise, elegant composition — desserts are art, treat them that way. " +
  "Shallow depth of field — focus on the most beautiful detail (a drip, a dusting of sugar, a cut cross-section). " +
  "The feeling of a Parisian patisserie or a high-end hotel pastry case. " +
  "Works for cakes, tarts, ice cream, pastries, chocolates, and all sweet formats. " +
  "Keep the same dish and food — make it look like the most beautiful dessert in the world. Output a single professional food photograph.";

export const ART_DIRECTION_STYLES = {
  editorial:      { id: "editorial",      label: "Editorial",           description: "Clean, high-end menu shot",             prompt: EDITORIAL_PROMPT },
  natural:        { id: "natural",        label: "Natural",              description: "Bright, fresh, organic",                prompt: NATURAL_PROMPT },
  moody:          { id: "moody",          label: "Moody",                description: "Dramatic, cinematic shadows",           prompt: MOODY_PROMPT },
  goldenHour:     { id: "goldenHour",     label: "Golden Hour",          description: "Late afternoon light, long shadows",    prompt: GOLDEN_HOUR_PROMPT },
  minimal:        { id: "minimal",        label: "Minimal",              description: "Scandinavian, clean, app-ready",        prompt: MINIMAL_PROMPT },
  fineDining:     { id: "fineDining",     label: "Fine Dining",          description: "Luxurious, Michelin-level refined",     prompt: FINE_DINING_PROMPT },
  streetFood:     { id: "streetFood",     label: "Street Food",          description: "Bold, punchy, delivery-optimized",      prompt: STREET_FOOD_PROMPT },
  rustic:         { id: "rustic",         label: "Rustic",               description: "Earthy, artisan, farm-to-table",        prompt: RUSTIC_PROMPT },
  socialMedia:    { id: "socialMedia",    label: "Social Media",         description: "Instagram & TikTok optimized",          prompt: SOCIAL_MEDIA_PROMPT },
  brightAiry:     { id: "brightAiry",     label: "Bright & Airy",        description: "Light, pastel, café & brunch feel",     prompt: BRIGHT_AIRY_PROMPT },
  uberEats:       { id: "uberEats",       label: "UberEats",             description: "Click-optimized for UberEats grid",     prompt: UBEREATS_PROMPT },
  doorDash:       { id: "doorDash",       label: "DoorDash",             description: "Lifestyle-forward delivery hero",       prompt: DOORDASH_PROMPT },
  japaneseMin:    { id: "japaneseMin",    label: "Japanese Minimal",     description: "Slate surfaces, negative space, zen",   prompt: JAPANESE_MINIMAL_PROMPT },
  latinVibrancy:  { id: "latinVibrancy",  label: "Latin Vibrancy",       description: "Bold, festive, Cuban/Colombian/Peruvian", prompt: LATIN_VIBRANCY_PROMPT },
  mediterranean:  { id: "mediterranean",  label: "Mediterranean",        description: "Terracotta, olive, coastal warmth",     prompt: MEDITERRANEAN_PROMPT },
  bbq:            { id: "bbq",            label: "BBQ & Smokehouse",     description: "Char, cast iron, ember light",          prompt: BBQ_PROMPT },
  taco:           { id: "taco",           label: "Taqueria",             description: "Bright, authentic Mexican street energy", prompt: TACO_PROMPT },
  happyHour:      { id: "happyHour",      label: "Happy Hour",           description: "Warm bar light, social energy",         prompt: HAPPY_HOUR_PROMPT },
  brunch:         { id: "brunch",         label: "Brunch",               description: "Lazy morning light, weekend energy",    prompt: BRUNCH_PROMPT },
  lateNight:      { id: "lateNight",      label: "Late Night",           description: "Dark, neon-lit, midnight craveable",    prompt: LATE_NIGHT_PROMPT },
  whiteBg:        { id: "whiteBg",        label: "White Background",     description: "Clean product shot, menu-builder ready", prompt: WHITE_BG_PROMPT },
  overhead:       { id: "overhead",       label: "Overhead Flat Lay",    description: "Top-down, styled, square-crop perfect", prompt: OVERHEAD_PROMPT },
  steamTexture:   { id: "steamTexture",   label: "Steam & Texture",      description: "Heat, glisten, just-served freshness",  prompt: STEAM_TEXTURE_PROMPT },
  dessert:        { id: "dessert",        label: "Dessert & Pastry",     description: "Parisian patisserie, sugar and gloss",  prompt: DESSERT_PROMPT },
};

export type StyleId = keyof typeof ART_DIRECTION_STYLES;
