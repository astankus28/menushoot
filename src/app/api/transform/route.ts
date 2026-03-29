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

const DEFAULT_STYLE: StyleId = "editorial";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (convexUrl) {
      if (!userId) {
        return NextResponse.json(
          { error: "Sign in required to transform images." },
          { status: 401 }
        );
      }
      const client = new ConvexHttpClient(convexUrl);
      const credits = await client.query(api.users.getCredits, { clerkId: userId });
      if (credits < 1) {
        return NextResponse.json(
          { error: "No credits remaining. Purchase a plan to continue." },
          { status: 402 }
        );
      }
      await client.mutation(api.users.deductCredit, { clerkId: userId });
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_GEMINI_API_KEY is not set in .env.local" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const imageUrl = formData.get("imageUrl") as string | null;

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
      return NextResponse.json(
        { error: "Please provide a valid image file or imageUrl" },
        { status: 400 }
      );
    }

    const styleId = (formData.get("style") as string) || DEFAULT_STYLE;
    const style = ART_DIRECTION_STYLES[styleId as StyleId] ?? ART_DIRECTION_STYLES[DEFAULT_STYLE];
    const prompt = style.prompt;

    const base64 = buffer.toString("base64");
    const geminiModel = "gemini-3.1-flash-image-preview";
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: geminiModel,
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

    for (const part of parts) {
      if ("inlineData" in part && part.inlineData?.data) {
        const imgBase64 = part.inlineData.data;
        const imgMime = part.inlineData.mimeType || "image/png";
        const geminiDataUrl = `data:${imgMime};base64,${imgBase64}`;

        if (initCloudinary()) {
          const uploaded = await cloudinary.uploader.upload(geminiDataUrl, {
            folder: "menushoot/transforms",
            resource_type: "image",
          });

          if (convexUrl && userId) {
            try {
              const { api: convexApi } = await import("../../../../convex/_generated/api");
              const historyClient = new ConvexHttpClient(convexUrl);
              await historyClient.mutation(convexApi.images.save, {
                clerkId: userId,
                publicId: uploaded.public_id,
                url: uploaded.secure_url,
                style: styleId,
              });
            } catch {
              // Non-fatal
            }
          }

          return NextResponse.json({ image: uploaded.secure_url });
        }

        return NextResponse.json({ image: geminiDataUrl });
      }
    }

    return NextResponse.json(
      { error: "Image generation did not return an image. Try again or check your API quota." },
      { status: 500 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Transform failed";
    const status = (err as { status?: number })?.status ?? 500;
    const is429 = message.includes("429") || message.includes("quota") || message.includes("RESOURCE_EXHAUSTED");
    const friendlyError = is429
      ? "Image generation requires a paid Google AI / Vertex AI plan. Enable billing at https://aistudio.google.com or https://console.cloud.google.com"
      : message;
    return NextResponse.json({ error: friendlyError }, { status });
  }
}