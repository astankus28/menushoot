/**
 * Insert a fetch-time transformation so we don't pull multi‑MB originals into the API route
 * (avoids huge Gemini payloads and "Request Entity Too Large" / JSON parse errors from gateways).
 */
export function cloudinaryFetchUrl(url: string, maxEdge = 2048): string {
  if (!url.includes("cloudinary.com")) return url;
  const marker = "/upload/";
  const i = url.indexOf(marker);
  if (i === -1) return url;
  const after = url.slice(i + marker.length);
  if (/^(c_|f_|w_|h_|q_|e_|b_|t_|a_|d_|l_|s_|x_|y_|o_|r_|u_|v_|z_)/.test(after)) {
    return url;
  }
  const base = url.slice(0, i + marker.length);
  return `${base}c_limit,w_${maxEdge},h_${maxEdge},q_auto:good/${after}`;
}
