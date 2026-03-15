import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

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

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (!userId) {
      return NextResponse.json(
        { error: "Sign in required to save uploads." },
        { status: 401 }
      );
    }

    if (!initCloudinary()) {
      return NextResponse.json(
        { error: "Cloudinary upload not configured." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Please provide a valid image file" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const mimeType = file.type;
    const dataUrl = `data:${mimeType};base64,${base64}`;

    const uploaded = await cloudinary.uploader.upload(dataUrl, {
      folder: "menushoot/uploads",
      resource_type: "image",
    });

    if (convexUrl) {
      try {
        const client = new ConvexHttpClient(convexUrl);
        await client.mutation(api.uploads.save, {
          clerkId: userId,
          publicId: uploaded.public_id,
          url: uploaded.secure_url,
        });
      } catch {
        // Non-fatal — URL still returned
      }
    }

    return NextResponse.json({ url: uploaded.secure_url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
