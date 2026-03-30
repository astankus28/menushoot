import type { StyleId } from "@/lib/prompts";

/**
 * Landing page before/after slider.
 *
 * Use the same source photo as `STYLE_SLIDER_BEFORE_URL` in the app: run each style,
 * then paste the Cloudinary `secure_url` here (Media Library → image → copy URL).
 * Omit a style or leave it unset until you have that sample — the UI shows “Coming soon”.
 */
export const STYLE_SLIDER_BEFORE_URL =
  "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773419029/IMG_8010_sguady.jpg";

export const STYLE_SLIDER_AFTER_URLS: Partial<Record<StyleId, string>> = {
  editorial:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773420190/menushoot/transforms/u3tbgqmlixnsivxyr99c.png",
  natural:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773420158/menushoot/transforms/gcviqjyke3lw30usttmo.png",
  moody:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773420077/menushoot/transforms/g4a0hn6gkjrcfdxwm44o.png",
  goldenHour:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773589548/menushoot/transforms/jnyebracaziaewnhq7w1.png",
  minimal:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773419984/menushoot/transforms/tfhrpdlbtkwjxgpnkxrf.png",
  fineDining:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773418320/menushoot/transforms/lbbthufhuhvfvyspcvli.png",
  streetFood:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773428209/menushoot/transforms/d9mfggbusmi2opmb1bu5.png",
  rustic:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773428256/menushoot/transforms/mepkphyyybtbvgt1wvae.png",
  socialMedia:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773438353/menushoot/transforms/ww2psxhcqnu5tniqly5x.png",
  brightAiry:
    "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773438438/menushoot/transforms/uza5ayrqkj39ls2qeaki.png",
};
