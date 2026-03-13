"use client";

import { useState } from "react";

type ProductId = "trial" | "starter" | "full" | "agency";

const LABELS: Record<ProductId, string> = {
  trial: "Get Started",
  starter: "Get Started",
  full: "Get Started",
  agency: "Get Started",
};

export function BuyButton({
  productId,
  variant = "outline",
  children,
  compact,
}: {
  productId: ProductId;
  variant?: "outline" | "filled";
  children?: React.ReactNode;
  compact?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/sign-in?redirect_url=" + encodeURIComponent("/app");
          return;
        }
        throw new Error(data.error || "Checkout failed");
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No redirect URL from Stripe");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const baseClass = "text-center rounded font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer " +
    (compact ? "py-2 px-4 inline-block" : "block w-full py-3");
  const outlineClass = "border border-brown text-brown hover:bg-brown hover:text-cream";
  const filledClass = "bg-terracotta text-white hover:bg-terra-light";

  return (
    <div className={compact ? "inline-block" : "w-full"}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${baseClass} ${variant === "filled" ? filledClass : outlineClass}`}
      >
        {loading ? "Redirecting…" : children ?? LABELS[productId]}
      </button>
      {error && (
        <p className="text-red-600 text-xs mt-1" role="alert">{error}</p>
      )}
    </div>
  );
}
