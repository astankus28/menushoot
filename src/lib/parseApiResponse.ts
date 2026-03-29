/**
 * Read a fetch Response body safely: many hosts return plain text for 413/502/etc.,
 * which breaks `response.json()` with "Unexpected token 'R'...".
 */
export async function parseApiResponse(res: Response): Promise<{
  ok: boolean;
  status: number;
  json: Record<string, unknown> | null;
  textBody: string;
}> {
  const textBody = await res.text();
  let json: Record<string, unknown> | null = null;
  if (textBody.trim()) {
    try {
      const parsed: unknown = JSON.parse(textBody);
      if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
        json = parsed as Record<string, unknown>;
      }
    } catch {
      // not JSON — e.g. "Request Entity Too Large"
    }
  }
  return { ok: res.ok, status: res.status, json, textBody: textBody.trim() };
}

function looksLikeGatewayNoise(text: string): boolean {
  if (!text) return true;
  if (/^request en/i.test(text) || /request entity too large/i.test(text)) return true;
  if (/^<html|^<!doctype|<body/i.test(text)) return true;
  if (/unexpected token/i.test(text)) return true;
  return false;
}

/**
 * Short, calm copy for toasts — avoids raw gateway text and JSON parse errors.
 */
export function apiErrorMessage(
  parsed: Awaited<ReturnType<typeof parseApiResponse>>,
  fallbackStatusMessage?: string
): string {
  const tooLarge =
    parsed.status === 413 ||
    /request entity too large/i.test(parsed.textBody) ||
    /^request en/i.test(parsed.textBody);
  if (tooLarge) {
    return "That file is still a little too big. Try a smaller photo or save as JPEG.";
  }

  if (parsed.json && typeof parsed.json.error === "string" && parsed.json.error.trim()) {
    const e = parsed.json.error.trim();
    if (/GOOGLE_GEMINI_API_KEY|not set in \.env/i.test(e)) {
      return "We couldn’t reach the image service. Please try again later.";
    }
    return e;
  }

  if (parsed.textBody && !looksLikeGatewayNoise(parsed.textBody)) {
    const t = parsed.textBody.trim();
    if (t.length <= 160 && !/[{}[\]]/.test(t)) {
      return t;
    }
  }

  if (parsed.status === 401) return "Please sign in and try again.";
  if (parsed.status === 402) return "You’re out of credits. Add more when you’re ready.";
  if (parsed.status === 429) return "Too many requests right now. Wait a moment and try again.";
  if (parsed.status >= 500) return "Something hiccuped on our side. Try again in a moment.";

  return fallbackStatusMessage ?? "Something went wrong. Please try again.";
}
