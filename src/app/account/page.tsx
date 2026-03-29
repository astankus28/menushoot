"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BuyButton } from "@/components/BuyButton";
import { ART_DIRECTION_STYLES } from "@/lib/prompts";

const PRODUCT_LABELS: Record<string, string> = {
  trial: "Trial — 3 credits ($29)",
  starter: "Starter — 10 credits ($249)",
  full: "Full Menu — 25 credits ($199)",
  agency: "Agency — 75/mo ($399)",
};

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const credits = useQuery(
    api.users.getCredits,
    user?.id ? { clerkId: user.id } : "skip"
  );
  const orders = useQuery(
    api.users.listOrders,
    user?.id ? { clerkId: user.id } : "skip"
  );
  const pastImages = useQuery(
    api.images.listByUser,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const styles = Object.values(ART_DIRECTION_STYLES);

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-cream/90 backdrop-blur-sm border-b border-brown/10">
        <Link href="/" className="font-serif text-xl text-brown tracking-tight">
          Menu<span className="text-terracotta italic">Shoot</span>.ai
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/#pricing" className="text-muted text-sm font-medium hover:text-terracotta transition-colors hidden md:block">
            Pricing
          </Link>
          <Link href="/app" className="text-muted text-sm font-medium hover:text-terracotta transition-colors hidden md:block">
            Transform
          </Link>
          <SignedOut>
            <SignInButton>
              <button className="text-muted text-sm font-medium hover:text-terracotta">Sign In</button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-terracotta text-white py-2.5 px-5 rounded text-sm font-medium hover:bg-brown transition-colors">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/account" className="text-terracotta text-sm font-medium">
              Account
            </Link>
            <span className="text-muted text-sm tabular-nums">
              {credits ?? 0} credits
            </span>
            <BuyButton productId="full" variant="outline" compact>
              Buy Credits
            </BuyButton>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      <main className="flex-1 pt-24 px-6 pb-16 max-w-4xl mx-auto w-full">
        <SignedOut>
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <span className="text-5xl mb-6">👤</span>
            <h2 className="font-serif text-2xl text-brown mb-3">Your Account</h2>
            <p className="text-muted text-sm max-w-sm mb-8">
              Sign in to view your credits, purchase history, and transformed images.
            </p>
            <div className="flex gap-4">
              <SignUpButton>
                <button className="bg-terracotta text-white py-3 px-8 rounded font-medium hover:bg-brown transition-colors">
                  Create account
                </button>
              </SignUpButton>
              <SignInButton>
                <button className="border border-brown text-brown py-3 px-8 rounded font-medium hover:bg-brown hover:text-cream transition-colors">
                  Sign in
                </button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <h1 className="font-serif text-3xl text-brown mb-8">Account</h1>

          {/* Credits + Buy */}
          <section className="mb-12">
            <h2 className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-3">
              Credits
            </h2>
            <div className="p-6 rounded-lg bg-warm-white border border-brown/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-serif text-2xl text-brown">
                  {credits ?? 0} credit{(credits ?? 0) !== 1 ? "s" : ""} remaining
                </p>
                <p className="text-muted text-sm mt-1">
                  Each credit = 1 AI transform. Use them in the app to turn food photos into hero shots.
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-3">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 text-terracotta font-medium text-sm hover:underline"
                >
                  Transform photos →
                </Link>
                <BuyButton productId="full" variant="filled" compact>
                  Buy More Credits
                </BuyButton>
              </div>
            </div>
          </section>

          {/* What you can buy */}
          <section className="mb-12">
            <h2 className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-3">
              Plans
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-lg border border-brown/10 bg-warm-white">
                <p className="text-xs tracking-widest uppercase text-terracotta font-medium mb-2">Trial</p>
                <p className="font-serif text-xl text-brown mb-1">$29</p>
                <p className="text-muted text-xs mb-4">3 credits</p>
                <BuyButton productId="trial" variant="outline" compact />
              </div>
              <div className="p-5 rounded-lg border-2 border-terracotta bg-brown text-cream relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-terracotta text-white text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full">
                  Popular
                </span>
                <p className="text-xs tracking-widest uppercase text-gold-light font-medium mb-2 mt-1">Full Menu</p>
                <p className="font-serif text-xl text-cream mb-1">$199</p>
                <p className="text-cream/70 text-xs mb-4">25 credits</p>
                <BuyButton productId="full" variant="filled" compact>Get 25</BuyButton>
              </div>
              <div className="p-5 rounded-lg border border-brown/10 bg-warm-white">
                <p className="text-xs tracking-widest uppercase text-terracotta font-medium mb-2">Agency</p>
                <p className="font-serif text-xl text-brown mb-1">$399<span className="text-sm font-light">/mo</span></p>
                <p className="text-muted text-xs mb-4">75 credits/mo</p>
                <BuyButton productId="agency" variant="outline" compact />
              </div>
            </div>
          </section>

          {/* Purchase history */}
          <section className="mb-12">
            <h2 className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-3">
              Purchase History
            </h2>
            {orders && orders.length > 0 ? (
              <div className="rounded-lg border border-brown/10 bg-warm-white overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brown/10 bg-cream/50">
                      <th className="text-left py-3 px-4 font-medium text-brown">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-brown">Product</th>
                      <th className="text-right py-3 px-4 font-medium text-brown">Credits</th>
                      <th className="text-right py-3 px-4 font-medium text-brown">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o._id} className="border-b border-brown/5 last:border-0">
                        <td className="py-3 px-4 text-muted">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {PRODUCT_LABELS[o.productId] ?? o.productId}
                        </td>
                        <td className="py-3 px-4 text-right tabular-nums">+{o.credits}</td>
                        <td className="py-3 px-4 text-right text-sage capitalize">{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted text-sm py-6 px-4 rounded-lg border border-brown/10 bg-warm-white">
                No purchases yet.
              </p>
            )}
          </section>

          {/* Gallery */}
          <section>
            <h2 className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-3">
              Your Transforms
            </h2>
            {pastImages === undefined ? (
              <p className="text-muted text-sm py-6 px-4 rounded-lg border border-brown/10 bg-warm-white">
                Loading your transforms…
              </p>
            ) : pastImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {pastImages.map((img) => {
                  const styleLabel = styles.find((s) => s.id === img.style)?.label ?? img.style;
                  const caption = img.variationLabel ? `${styleLabel} · ${img.variationLabel}` : styleLabel;
                  return (
                    <a
                      key={img._id}
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-lg overflow-hidden border border-brown/10 bg-warm-white hover:border-terracotta/40 transition-colors"
                    >
                      <div className="aspect-square relative">
                        <img
                          src={img.url}
                          alt={caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="px-3 py-2 text-xs text-muted truncate" title={caption}>
                        {caption}
                      </p>
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted text-sm py-6 px-4 rounded-lg border border-brown/10 bg-warm-white">
                No transforms yet. <Link href="/app" className="text-terracotta hover:underline">Create your first</Link>.
              </p>
            )}
          </section>
        </SignedIn>
      </main>
    </div>
  );
}
