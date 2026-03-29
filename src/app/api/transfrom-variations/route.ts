import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { GoogleGenAI, Modality } from "@google/genai";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { ART_DIRECTION_STYLES, type StyleId } from "@/lib/prompts";

let cloudinaryReady = false;
function initCloudinary() {
  if (cloudinaryReady) return true;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
    cloudinaryReady = true;
    return true;
  }
  return false;
}

export const VARIATION_ANGLES = [
  {
    label: "Classic",
    description: "The expected, refined interpretation of the style",
    modifier: "Apply this style faithfully and professionally — the clean, expected, most universally appealing version. Refined and safe.",
  },
  {
    label: "Dramatic",
    description: "Push the contrast and mood further",
    modifier: "Push this style to its dramatic extreme — heighten contrast, deepen shadows or brighten highlights, maximize the mood. Make it bold and striking.",
  },
  {
    label: "Warm",
    description: "Lean into warmth and appetite appeal",
    modifier: "Apply this style with a warm color temperature bias — golden tones, amber light, inviting warmth. Prioritize appetite appeal and coziness over drama.",
  },
  {
    label: "Editorial",
    description: "Magazine-ready, precise composition",
    modifier: "Apply this style as if shooting for a high-end food magazine — precise composition, strong negative space, deliberate prop placement implied, everything intentional. Think Bon Appetit or Food & Wine.",
  },
];

function buildVariationPrompt(
  basePrompt: string,
  angle: typeof VARIATION_ANGLES[number],
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

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (convexUrl) {
      if (!userId) {
        return NextResponse.json({ error: "Sign in required to transform images." }, { status: 401 });
      }
      const client = new ConvexHttpClient(convexUrl);
      const credits = await client.query(api.users.getCredits, { clerkId: userId });
      if (credits < 1) {
        return NextResponse.json({ error: "No credits remaining. Purchase a plan to continue." }, { status: 402 });
      }
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_GEMINI_API_KEY is not set in .env.local" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const variationIndex = parseInt((formData.get("variationIndex") as string) || "0", 10);
    const isFirstCall = variationIndex === 0;

    let buffer: Buffer;
    let mimeType: string;

    if (imageUrl && imageUrl.startsWith("http")) {
      const res = await fetch(imageUrl);
      if (!res.ok) throw new Error("Failed to fetch image from URL");
      const arr = await res.arrayBuffer();
      buffer = Buffer.from(arr);
      mimeType = res.headers.get("content-type") || "image/jpeg";
    } else if (file && file.type.startsWith("image/")) {
      buffer = Buffer.from(await file.arrayBuffer());
      mimeType = file.type;
    } else {
      return NextResponse.json({ error: "Please provide a valid image file or imageUrl" }, { status: 400 });
    }

    const styleId = (formData.get("style") as string) || "editorial";
    const style = ART_DIRECTION_STYLES[styleId as StyleId] ?? ART_DIRECTION_STYLES["editorial"];

    const intake = {
      mood: (formData.get("mood") as string) || undefined,
      usage: (formData.get("usage") as string) || undefined,
      reference: (formData.get("reference") as string) || undefined,
      preserveNotes: (formData.get("preserveNotes") as string) || undefined,
      customDescription: (formData.get("customDescription") as string) || undefined,
    };

    // Deduct credit only on the first call
    if (isFirstCall && convexUrl && userId) {
      const client = new ConvexHttpClient(convexUrl);
      await client.mutation(api.users.deductCredit, { clerkId: userId });
    }

    const angle = VARIATION_ANGLES[variationIndex % VARIATION_ANGLES.length];
    const prompt = buildVariationPrompt(style.prompt, angle, intake);
    const base64 = buffer.toString("base64");
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data: base64 } },
            { text: prompt },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    let resultDataUrl: string | null = null;
    for (const part of parts) {
      if ("inlineData" in part && part.inlineData?.data) {
        resultDataUrl = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!resultDataUrl) {
      return NextResponse.json({ error: "Image generation did not return an image. Try again." }, { status: 500 });
    }

    let finalUrl = resultDataUrl;
    let publicId = "";
    if (initCloudinary()) {
      try {
        const uploaded = await cloudinary.uploader.upload(resultDataUrl, {
          folder: "menushoot/variations",
          resource_type: "image",
        });
        finalUrl = uploaded.secure_url;
        publicId = uploaded.public_id;
      } catch {
        // Fall back to base64
      }
    }

    if (isFirstCall && convexUrl && userId && !finalUrl.startsWith("data:")) {
      try {
        const historyClient = new ConvexHttpClient(convexUrl);
        await historyClient.mutation(api.images.save, {
          clerkId: userId,
          publicId,
          url: finalUrl,
          style: styleId,
        });
      } catch {
        // Non-fatal
      }
    }

    return NextResponse.json({
      variation: {
        label: angle.label,
        description: angle.description,
        url: finalUrl,
        index: variationIndex,
      },
      hasMore: variationIndex < VARIATION_ANGLES.length - 1,
      nextIndex: variationIndex + 1,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Transform failed";
    const status = (err as { status?: number })?.status ?? 500;
    const is429 = message.includes("429") || message.includes("quota") || message.includes("RESOURCE_EXHAUSTED");
    const friendlyError = is429
      ? "Image generation requires a paid Google AI plan. Enable billing at https://aistudio.google.com"
      : message;
    return NextResponse.json({ error: friendlyError }, { status });
  }
}