import { NextResponse } from "next/server";

/**
 * Diagnostic endpoint to verify env vars are set (without exposing secrets).
 * Visit /api/health to check.
 */
export async function GET() {
  const checks = {
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_CONVEX_URL: !!process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_APP_URL: !!process.env.NEXT_PUBLIC_APP_URL,
    GOOGLE_GEMINI_API_KEY: !!process.env.GOOGLE_GEMINI_API_KEY,
    CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
  };
  const allOk = Object.values(checks).every(Boolean);
  return NextResponse.json(
    { ok: allOk, checks },
    { status: allOk ? 200 : 500 }
  );
}
