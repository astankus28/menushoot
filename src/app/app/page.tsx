"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BuyButton } from "@/components/BuyButton";
import { ART_DIRECTION_STYLES } from "@/lib/prompts";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({
  message,
  type,
  onDismiss,
}: {
  message: string;
  type: "success" | "error" | "info";
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const colors = {
    success: "bg-sage text-white border-sage/50",
    error: "bg-red-600 text-white border-red-500",
    info: "bg-brown text-cream border-brown/50",
  };

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-lg shadow-xl border text-sm font-medium ${colors[type]}`}
    >
      <span>{type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}</span>
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-2 opacity-70 hover:opacity-100 text-base leading-none">
        ×
      </button>
    </div>
  );
}

// ─── Auth wall ────────────────────────────────────────────────────────────────
function AuthWall() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <span className="text-5xl mb-6">📸</span>
      <h2 className="font-serif text-2xl text-brown mb-3">
        Get your first transformation free
      </h2>
      <p className="text-muted text-sm max-w-sm mb-2">
        Create a free account with your phone number and we&apos;ll give you 1 complimentary transformation — no credit card required.
      </p>
      <p className="text-sage text-xs font-medium mb-8">🎁 1 free image · All 24 styles · Instant delivery</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <SignUpButton>
          <button className="bg-terracotta text-white py-3 px-8 rounded font-medium hover:bg-brown transition-colors">
            Create free account
          </button>
        </SignUpButton>
        <SignInButton>
          <button className="border border-brown text-brown py-3 px-8 rounded font-medium hover:bg-brown hover:text-cream transition-colors">
            Sign in
          </button>
        </SignInButton>
      </div>
    </div>
  );
}

// ─── No-credits wall ──────────────────────────────────────────────────────────
function NoCreditsWall() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-5xl mb-5">🎨</span>
      <h2 className="font-serif text-2xl text-brown mb-3">
        Ready to transform your menu?
      </h2>
      <p className="text-muted text-sm max-w-sm mb-10">
        Purchase a credit pack to start generating professional food photography.
        No studio, no scheduling — just great images in 60 seconds.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="p-6 rounded-lg border border-brown/10 bg-warm-white text-center">
          <p className="text-xs tracking-widest uppercase text-terracotta font-medium mb-2">Trial</p>
          <p className="font-serif text-2xl text-brown mb-1">$99</p>
          <p className="text-muted text-xs mb-4">3 dish images</p>
          <BuyButton productId="trial" variant="outline" />
        </div>
        <div className="p-6 rounded-lg border-2 border-terracotta bg-brown text-cream text-center relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full">
            Most Popular
          </span>
          <p className="text-xs tracking-widest uppercase text-gold-light font-medium mb-2 mt-1">Full Menu</p>
          <p className="font-serif text-2xl text-cream mb-1">$549</p>
          <p className="text-cream/70 text-xs mb-4">25 dish images</p>
          <BuyButton productId="full" variant="filled" />
        </div>
        <div className="p-6 rounded-lg border border-brown/10 bg-warm-white text-center">
          <p className="text-xs tracking-widest uppercase text-terracotta font-medium mb-2">Agency</p>
          <p className="font-serif text-2xl text-brown mb-1">$999<span className="text-base font-light font-sans">/mo</span></p>
          <p className="text-muted text-xs mb-4">75 images/month</p>
          <BuyButton productId="agency" variant="outline" />
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function AppPageContent() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();

  const credits = useQuery(
    api.users.getCredits,
    user?.id ? { clerkId: user.id } : "skip"
  );
  const uploads = useQuery(
    api.uploads.listByUser,
    user?.id ? { clerkId: user.id } : "skip"
  );
  const getOrCreate = useMutation(api.users.getOrCreate);

  const [file, setFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [style, setStyle] = useState<string>("editorial");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const dismissToast = useCallback(() => setToast(null), []);
  const didInit = useRef(false);

  // Create Convex user record on first load after sign-in
  useEffect(() => {
    if (!isLoaded || !user || didInit.current) return;
    didInit.current = true;
    getOrCreate({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      phoneNumber: user.primaryPhoneNumber?.phoneNumber ?? undefined,
    }).catch(() => {});
  }, [isLoaded, user, getOrCreate]);

  // Handle Stripe redirect params
  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    if (success === "true") {
      setToast({ message: "Payment successful! Your credits have been added.", type: "success" });
      window.history.replaceState({}, "", "/app");
    } else if (canceled === "true") {
      setToast({ message: "Payment canceled — no charge was made.", type: "info" });
      window.history.replaceState({}, "", "/app");
    }
  }, [searchParams]);

  const handleFile = useCallback(
    async (f: File | null) => {
      if (f && user && credits !== undefined && credits < 1) {
        setToast({ message: "You need credits to transform images.", type: "info" });
        return;
      }
      setResult(null);
      if (!f) {
        setFile(null);
        setSelectedImageUrl(null);
        setPreview(null);
        return;
      }
      if (user) {
        setIsUploading(true);
        try {
          const formData = new FormData();
          formData.append("image", f);
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Upload failed");
          if (data.url) {
            setSelectedImageUrl(data.url);
            setPreview(data.url);
            setFile(null);
          } else throw new Error("No URL returned");
        } catch (err) {
          setToast({ message: err instanceof Error ? err.message : "Upload failed", type: "error" });
          const reader = new FileReader();
          reader.onload = () => setPreview(reader.result as string);
          reader.readAsDataURL(f);
          setFile(f);
          setSelectedImageUrl(null);
        } finally {
          setIsUploading(false);
        }
      } else {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(f);
        setFile(f);
        setSelectedImageUrl(null);
      }
    },
    [user, credits]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith("image/")) void handleFile(f);
      else setToast({ message: "Please upload an image file (JPEG, PNG, etc.)", type: "error" });
    },
    [handleFile]
  );
  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) void handleFile(f);
      e.target.value = "";
    },
    [handleFile]
  );

  const handleSelectUpload = useCallback((url: string) => {
    setFile(null);
    setSelectedImageUrl(url);
    setPreview(url);
    setResult(null);
  }, []);

  const handleTransform = async () => {
    const hasImage = file || selectedImageUrl;
    if (!hasImage) { setToast({ message: "Please upload a photo first.", type: "error" }); return; }
    if (!user) { setToast({ message: "Please sign in to transform images.", type: "error" }); return; }
    if (credits !== undefined && credits < 1) {
      setToast({ message: "No credits remaining. Purchase a plan to continue.", type: "info" });
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (selectedImageUrl) formData.append("imageUrl", selectedImageUrl);
      else if (file) formData.append("image", file);
      formData.append("style", style);
      const res = await fetch("/api/transform", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Transform failed");
      if (data.image) setResult(data.image);
      else throw new Error("No image returned");
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : "Something went wrong", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `menushoot-${style}-${Date.now()}.png`;
    a.click();
  };

  const handleReset = () => { setFile(null); setSelectedImageUrl(null); setPreview(null); setResult(null); };

  const styles = Object.values(ART_DIRECTION_STYLES);
  const isSignedIn = isLoaded && !!user;
  const hasImage = !!preview;
  const transformDisabled = isLoading || !hasImage || !isSignedIn || (credits !== undefined && credits < 1);
  const transformLabel = isLoading ? "Transforming…" : !isSignedIn ? "Sign in to Transform" : credits !== undefined && credits < 1 ? "No Credits — Buy to Continue" : "Transform";

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} />}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-cream/90 backdrop-blur-sm border-b border-brown/10">
        <Link href="/" className="font-serif text-xl text-brown tracking-tight">
          Menu<span className="text-terracotta italic">Shoot</span>.ai
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/#pricing" className="text-muted text-sm font-medium hover:text-terracotta transition-colors hidden md:block">
            Pricing
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
            <Link href="/account" className="text-terracotta text-sm font-medium hover:underline hidden md:block">
              Account
            </Link>
            <span className="text-muted text-sm tabular-nums">
              {credits ?? 0} credit{credits !== 1 ? "s" : ""}
            </span>
            <BuyButton productId="full" variant="outline" compact>
              Buy Credits
            </BuyButton>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      <main className="flex-1 pt-24 px-6 pb-16 max-w-5xl mx-auto w-full">
        {/* Signed-out: show auth wall */}
        <SignedOut>
          <AuthWall />
        </SignedOut>

        <SignedIn>
          {/* Signed-in, 0 credits: show purchase wall */}
          {isLoaded && credits !== undefined && credits < 1 && <NoCreditsWall />}

          {/* Signed-in, has credits (or still loading): show the tool */}
          {(!isLoaded || credits === undefined || credits > 0) && (
            <>
              <div className="text-center mb-10">
                <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-3">
                  AI-Powered Food Photography
                </p>
                <h1 className="font-serif text-3xl md:text-4xl text-brown leading-tight mb-3">
                  Upload a food photo.
                  <br />
                  <em className="text-terracotta">Get a hero shot.</em>
                </h1>
                <p className="text-muted text-base max-w-md mx-auto">
                  Choose a style, upload your photo, and receive a professionally transformed image in about 60 seconds.
                </p>
                {credits !== undefined && credits > 0 && (
                  <p className="text-sage text-xs mt-3 font-medium">
                    {credits} credit{credits !== 1 ? "s" : ""} remaining
                  </p>
                )}
              </div>

              {/* My Uploads */}
              {uploads && uploads.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs tracking-[0.12em] uppercase text-muted font-medium mb-3">My Uploads</p>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 scrollbar-thin">
                    {uploads.map((u) => (
                      <button
                        key={u._id}
                        type="button"
                        onClick={() => handleSelectUpload(u.url)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:border-terracotta/60 ${
                          selectedImageUrl === u.url ? "border-terracotta ring-2 ring-terracotta/30" : "border-brown/10"
                        }`}
                      >
                        <img src={u.url} alt="Upload" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!preview ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-12 md:p-16 text-center transition-colors cursor-pointer ${
                    isDragging ? "border-terracotta bg-terracotta/5" : "border-muted/40 hover:border-muted hover:bg-warm-white/50"
                  } ${isUploading ? "opacity-60 pointer-events-none" : ""}`}
                >
                  <input type="file" accept="image/*" onChange={handleInputChange} className="hidden" id="upload" disabled={isUploading} />
                  <label htmlFor="upload" className="cursor-pointer block">
                    {isUploading ? (
                      <>
                        <div className="w-9 h-9 border-2 border-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="font-serif text-lg text-brown mb-1">Saving to My Uploads…</p>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl mb-3 block">📸</span>
                        <p className="font-serif text-lg text-brown mb-1">Drag & drop your food photo</p>
                        <p className="text-muted text-sm">or click to browse · iPhone photos welcome</p>
                      </>
                    )}
                  </label>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-warm-white border border-brown/10 rounded-lg p-5">
                    <p className="text-xs tracking-[0.12em] uppercase text-muted font-medium mb-3">Art Direction</p>
                    <div className="flex flex-wrap gap-2">
                      {styles.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setStyle(s.id)}
                          className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                            style === s.id ? "bg-terracotta text-white" : "bg-cream text-muted hover:text-brown border border-brown/10 hover:border-terracotta/40"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg overflow-hidden border border-brown/10 bg-warm-white">
                      <p className="text-xs tracking-widest uppercase text-muted px-4 py-2.5 border-b border-brown/10">Before</p>
                      <div className="aspect-[4/3] bg-cream">
                        <img src={preview} alt="Original" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-brown/10 bg-warm-white">
                      <p className="text-xs tracking-widest uppercase text-muted px-4 py-2.5 border-b border-brown/10">After</p>
                      <div className="aspect-[4/3] bg-cream flex items-center justify-center">
                        {isLoading ? (
                          <div className="flex flex-col items-center gap-3 px-8 text-center">
                            <div className="w-9 h-9 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
                            <p className="text-muted text-sm">Transforming — this takes about 60 seconds…</p>
                          </div>
                        ) : result ? (
                          <img src={result} alt="Transformed" className="w-full h-full object-contain" />
                        ) : (
                          <p className="text-muted text-sm">Click Transform</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={handleTransform}
                      disabled={transformDisabled}
                      className="px-8 py-3.5 rounded bg-terracotta text-white font-medium hover:bg-brown disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:enabled:-translate-y-0.5 hover:enabled:shadow-lg"
                    >
                      {transformLabel}
                    </button>
                    {result && (
                      <button onClick={handleDownload} className="px-8 py-3.5 rounded border border-gold text-gold font-medium hover:bg-gold/10 transition-colors">
                        Download
                      </button>
                    )}
                    <button onClick={handleReset} className="px-8 py-3.5 rounded border border-muted/50 text-muted hover:border-muted hover:text-brown transition-colors">
                      Start Over
                    </button>
                  </div>

                  {/* Low-credit nudge */}
                  {credits !== undefined && credits === 1 && (
                    <div className="text-center p-4 rounded-lg bg-gold/10 border border-gold/20">
                      <p className="text-brown text-sm font-medium mb-3">You have 1 credit left</p>
                      <BuyButton productId="full" variant="filled" compact>
                        Top up — 25 images for $549
                      </BuyButton>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </SignedIn>
      </main>
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="w-9 h-9 border-2 border-terracotta border-t-transparent rounded-full animate-spin" /></div>}>
      <AppPageContent />
    </Suspense>
  );
}
