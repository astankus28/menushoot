import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

const PRODUCTS: Record<string, { credits: number; amount: number }> = {
  trial: { credits: 3, amount: 9900 },
  starter: { credits: 10, amount: 24900 },
  full: { credits: 25, amount: 54900 },
  agency: { credits: 75, amount: 99900 },
};

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);
  const isTestMode = secretKey.startsWith("sk_test_");
  if (!isTestMode) {
    console.warn("[Stripe] Using LIVE mode key. Use sk_test_ for testing.");
  }

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Sign in required to purchase credits" },
        { status: 401 }
      );
    }

    const { productId } = await req.json();
    const product = PRODUCTS[productId];
    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: product.amount,
            product_data: {
              name: productId === "agency" ? "Agency Pro (75 images/mo)" : `${product.credits} dish images`,
              description: `MenuShoot.ai - ${product.credits} transforms`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/app?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/app?canceled=true`,
      metadata: { productId, credits: product.credits.toString() },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
