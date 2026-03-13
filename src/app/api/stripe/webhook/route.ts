import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkId = session.client_reference_id;
    const { productId, credits } = session.metadata || {};
    const customerEmail = session.customer_details?.email;
    if (!clerkId || !productId || !credits) {
      return NextResponse.json(
        { error: "Missing clerkId, productId, or credits in session", clerkId: !!clerkId, productId: !!productId, credits: !!credits },
        { status: 400 }
      );
    }
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      return NextResponse.json({ error: "NEXT_PUBLIC_CONVEX_URL not set" }, { status: 500 });
    }
    try {
      const { ConvexHttpClient } = await import("convex/browser");
      const { api } = await import("../../../../../convex/_generated/api");
      const client = new ConvexHttpClient(convexUrl);
      await client.mutation(api.users.addCredits, {
        clerkId,
        credits: parseInt(credits, 10),
        productId,
        stripeSessionId: session.id,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[webhook] Convex addCredits failed:", err);
      return NextResponse.json({ error: "Convex addCredits failed", details: msg }, { status: 500 });
    }
    if (resend && customerEmail) {
      try {
        await resend.emails.send({
          from: "MenuShoot.ai <onboarding@resend.dev>",
          to: [customerEmail],
          subject: "Your credits have been added",
          html: `<p>Thanks for your purchase! Your <strong>${credits} credits</strong> are now available in your account.</p><p>Head to <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://menushoot.ai"}/app">MenuShoot.ai</a> to start transforming your food photos.</p>`,
        });
      } catch {
        // Non-fatal — credits were added
      }
    }
  }

  return NextResponse.json({ received: true });
}
