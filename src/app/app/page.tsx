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
import { VARIATION_ANGLES } from "@/lib/variationAngles";
import { compressImageForUpload } from "@/lib/compressImageForUpload";
import { parseApiResponse, apiErrorMessage } from "@/lib/parseApiResponse";

interface Variation {
  label: string;
  description: string;
  url: string;
  index: number;
}

interface IntakeData {
  mood: string;
  usage: string;
  reference: string;
  preserveNotes: string;
  customDescription: string;
}

const VARIATION_LABELS = VARIATION_ANGLES.map((a) => a.label);

function Toast({ message, type, onDismiss }: { message: string; type: "success" | "error" | "info"; onDismiss: () => void }) {
  useEffect(() => { const t = setTimeout(onDismiss, 6000); return () => clearTimeout(t); }, [onDismiss]);
  const colors = { success: "bg-sage text-white border-sage/50", error: "bg-red-600 text-white border-red-500", info: "bg-brown text-cream border-brown/50" };
  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-lg shadow-xl border text-sm font-medium ${colors[type]}`}>
      <span>{type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}</span>
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-2 opacity-70 hover:opacity-100 text-base leading-none">×</button>
    </div>
  );
}

function AuthWall() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <span className="text-5xl mb-6">📸</span>
      <h2 className="font-serif text-2xl text-brown mb-3">Get your first transformation free</h2>
      <p className="text-muted text-sm max-w-sm mb-2">Free to try — create an account and get 1 photo on us. No credit card required.</p>
      <p className="text-sage text-xs font-medium mb-8">🎁 1 photo on us · All 24 styles · Up to 4 variations per credit</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <SignUpButton><button className="bg-terracotta text-white py-3 px-8 rounded font-medium hover:bg-brown transition-colors">Create free account</button></SignUpButton>
        <SignInButton><button className="border border-brown text-brown py-3 px-8 rounded font-medium hover:bg-brown hover:text-cream transition-colors">Sign in</button></SignInButton>
      </div>
    </div>
  );
}

function NoCreditsWall() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-5xl mb-5">🎨</span>
      <h2 className="font-serif text-2xl text-brown mb-3">Ready to transform your menu?</h2>
      <p className="text-muted text-sm max-w-sm mb-10">Purchase a credit pack to start generating professional food photography. No studio, no scheduling — just great images in 60 seconds.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="p-6 rounded-lg border border-brown/10 bg-warm-white text-center">
          <p className="text-xs tracking-widest uppercase text-terracotta font-medium mb-2">Trial</p>
          <p className="font-serif text-2xl text-brown mb-1">$29</p>
          <p className="text-muted text-xs mb-4">3 credits</p>
          <BuyButton productId="trial" variant="outline" />
        </div>
        <div className="p-6 rounded-lg border-2 border-terracotta bg-brown text-cream text-center relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full">Most Popular</span>
          <p className="text-xs tracking-widest uppercase text-gold-light font-medium mb-2 mt-1">Full Menu</p>
          <p className="font-serif text-2xl text-cream mb-1">$199</p>
          <p className="text-cream/70 text-xs mb-4">25 credits</p>
          <BuyButton productId="full" variant="filled" />
        </div>
        <div className="p-6 rounded-lg border border-brown/10 bg-warm-white text-center">
          <p className="text-xs tracking-widest uppercase text-terracotta font-medium mb-2">Agency</p>
          <p className="font-serif text-2xl text-brown mb-1">$399<span className="text-base font-light font-sans">/mo</span></p>
          <p className="text-muted text-xs mb-4">75 credits/month</p>
          <BuyButton productId="agency" variant="outline" />
        </div>
      </div>
    </div>
  );
}

function IntakeForm({ intake, onChange }: { intake: IntakeData; onChange: (d: IntakeData) => void }) {
  const MOODS = ["", "Bright & fresh", "Warm & inviting", "Dark & dramatic", "Clean & minimal", "Bold & energetic"];
  const MOOD_LABELS: Record<string, string> = { "": "No preference", "Bright & fresh": "Bright & fresh", "Warm & inviting": "Warm & inviting", "Dark & dramatic": "Dark & dramatic", "Clean & minimal": "Clean & minimal", "Bold & energetic": "Bold & energetic" };
  const USAGES = ["", "Restaurant website", "Menu (print or PDF)", "Instagram / social media", "DoorDash or UberEats listing", "Google Business profile", "Print advertising"];
  const USAGE_LABELS: Record<string, string> = { "": "Not sure", "Restaurant website": "Restaurant website", "Menu (print or PDF)": "Print menu", "Instagram / social media": "Instagram / social", "DoorDash or UberEats listing": "Delivery app listing", "Google Business profile": "Google Business", "Print advertising": "Print advertising" };

  return (
    <div className="bg-warm-white border border-brown/10 rounded-lg p-5 space-y-5">
      <div>
        <p className="text-xs tracking-[0.12em] uppercase text-muted font-medium mb-0.5">Tell us about the look you want</p>
        <p className="text-xs text-muted/60">The more you share, the better your variations will be.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-brown mb-1.5">Overall mood</label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button key={m} type="button" onClick={() => onChange({ ...intake, mood: m })}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${intake.mood === m ? "bg-terracotta text-white" : "bg-cream text-muted hover:text-brown border border-brown/10 hover:border-terracotta/40"}`}>
              {MOOD_LABELS[m]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-brown mb-1.5">Where will this be used?</label>
        <div className="flex flex-wrap gap-2">
          {USAGES.map((u) => (
            <button key={u} type="button" onClick={() => onChange({ ...intake, usage: u })}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${intake.usage === u ? "bg-terracotta text-white" : "bg-cream text-muted hover:text-brown border border-brown/10 hover:border-terracotta/40"}`}>
              {USAGE_LABELS[u]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-brown mb-1.5">Anything specific to preserve or change? <span className="text-muted font-normal">(optional)</span></label>
        <input type="text" value={intake.preserveNotes} onChange={(e) => onChange({ ...intake, preserveNotes: e.target.value })}
          placeholder="e.g. Keep the wine rack in background · Change the table surface · Make it more intimate"
          className="w-full bg-cream border border-brown/15 rounded px-3 py-2 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-terracotta/50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-brown mb-1.5">Style reference or inspiration <span className="text-muted font-normal">(optional)</span></label>
        <input type="text" value={intake.reference} onChange={(e) => onChange({ ...intake, reference: e.target.value })}
          placeholder="e.g. Nobu restaurant · Bon Appetit magazine · dark Italian steakhouse"
          className="w-full bg-cream border border-brown/15 rounded px-3 py-2 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-terracotta/50" />
      </div>
      <div>
        <label className="block text-sm font-medium text-brown mb-1.5">Describe your ideal shot <span className="text-muted font-normal">(optional)</span></label>
        <textarea value={intake.customDescription} onChange={(e) => onChange({ ...intake, customDescription: e.target.value })} rows={2}
          placeholder="e.g. Moody candlelit wine bar feel, dark marble surface, wine bottles in soft bokeh, shot at 45 degrees"
          className="w-full bg-cream border border-brown/15 rounded px-3 py-2 text-sm text-charcoal placeholder:text-muted/50 focus:outline-none focus:border-terracotta/50 resize-none" />
      </div>
    </div>
  );
}

function AppPageContent() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const credits = useQuery(api.users.getCredits, user?.id ? { clerkId: user.id } : "skip");
  const uploads = useQuery(api.uploads.listByUser, user?.id ? { clerkId: user.id } : "skip");
  const pastImages = useQuery(api.images.listByUser, user?.id ? { clerkId: user.id } : "skip");
  const getOrCreate = useMutation(api.users.getOrCreate);

  const [file, setFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
  const [nextVariationIndex, setNextVariationIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [style, setStyle] = useState<string>("editorial");
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [intake, setIntake] = useState<IntakeData>({ mood: "", usage: "", reference: "", preserveNotes: "", customDescription: "" });
  const dismissToast = useCallback(() => setToast(null), []);
  const didInit = useRef(false);

  useEffect(() => {
    if (!isLoaded || !user || didInit.current) return;
    didInit.current = true;
    getOrCreate({ clerkId: user.id, email: user.primaryEmailAddress?.emailAddress ?? "", phoneNumber: user.primaryPhoneNumber?.phoneNumber ?? undefined }).catch(() => {});
  }, [isLoaded, user, getOrCreate]);

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    if (success === "true") { setToast({ message: "Payment successful! Your credits have been added.", type: "success" }); window.history.replaceState({}, "", "/app"); }
    else if (canceled === "true") { setToast({ message: "Payment canceled — no charge was made.", type: "info" }); window.history.replaceState({}, "", "/app"); }
  }, [searchParams]);

  const handleFile = useCallback(async (f: File | null) => {
    if (f && user && credits !== undefined && credits < 1) { setToast({ message: "You need credits to transform images.", type: "info" }); return; }
    setVariations([]); setSelectedVariation(null); setNextVariationIndex(0);
    if (!f) { setFile(null); setSelectedImageUrl(null); setPreview(null); return; }
    if (user) {
      setIsUploading(true);
      try {
        const toSend = await compressImageForUpload(f);
        const fd = new FormData();
        fd.append("image", toSend);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const parsed = await parseApiResponse(res);
        if (!parsed.ok) {
          throw new Error(apiErrorMessage(parsed, "Couldn’t upload that photo. Try again."));
        }
        const url = parsed.json && typeof parsed.json.url === "string" ? parsed.json.url : null;
        if (url) {
          setSelectedImageUrl(url);
          setPreview(url);
          setFile(null);
        } else throw new Error("No URL returned");
      } catch (err) {
        setToast({ message: err instanceof Error ? err.message : "Upload failed", type: "error" });
        const reader = new FileReader(); reader.onload = () => setPreview(reader.result as string); reader.readAsDataURL(f);
        setFile(f); setSelectedImageUrl(null);
      } finally { setIsUploading(false); }
    } else {
      const reader = new FileReader(); reader.onload = () => setPreview(reader.result as string); reader.readAsDataURL(f);
      setFile(f); setSelectedImageUrl(null);
    }
  }, [user, credits]);

  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f && f.type.startsWith("image/")) void handleFile(f); else setToast({ message: "Please upload an image file.", type: "error" }); }, [handleFile]);
  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) void handleFile(f); e.target.value = ""; }, [handleFile]);
  const handleSelectUpload = useCallback((url: string) => { setFile(null); setSelectedImageUrl(url); setPreview(url); setVariations([]); setSelectedVariation(null); setNextVariationIndex(0); }, []);

  const handleGenerate = async (variationIndex: number) => {
    if (!file && !selectedImageUrl) { setToast({ message: "Please upload a photo first.", type: "error" }); return; }
    if (!user) { setToast({ message: "Please sign in to transform images.", type: "error" }); return; }
    if (variationIndex === 0 && credits !== undefined && credits < 1) {
      setToast({ message: "No credits remaining. Purchase a plan to continue.", type: "info" }); return;
    }
    setIsGenerating(true);
    try {
      const fd = new FormData();
      if (selectedImageUrl) {
        fd.append("imageUrl", selectedImageUrl);
      } else if (file) {
        fd.append("image", await compressImageForUpload(file));
      }
      fd.append("style", style);
      fd.append("variationIndex", String(variationIndex));
      if (intake.mood) fd.append("mood", intake.mood);
      if (intake.usage) fd.append("usage", intake.usage);
      if (intake.reference) fd.append("reference", intake.reference);
      if (intake.preserveNotes) fd.append("preserveNotes", intake.preserveNotes);
      if (intake.customDescription) fd.append("customDescription", intake.customDescription);
      const res = await fetch("/api/transform-variations", { method: "POST", body: fd });
      const parsed = await parseApiResponse(res);
      if (!parsed.ok) {
        throw new Error(apiErrorMessage(parsed, "Couldn’t generate that image. Try again."));
      }
      const data = parsed.json;
      const variation = data?.variation as Variation | undefined;
      const hasMore = data?.hasMore === true;
      const nextIndex = typeof data?.nextIndex === "number" ? data.nextIndex : -1;
      if (variation && typeof variation.index === "number") {
        setVariations((prev) => [...prev, variation]);
        setSelectedVariation(variation.index);
        setNextVariationIndex(hasMore ? nextIndex : -1);
      } else throw new Error("No variation returned");
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : "Something went wrong", type: "error" });
    } finally { setIsGenerating(false); }
  };

  const handleDownload = (variation: Variation) => {
    const a = document.createElement("a"); a.href = variation.url;
    a.download = `menushoot-${style}-${variation.label.toLowerCase()}-${Date.now()}.png`; a.click();
  };

  const handleReset = () => {
    setFile(null); setSelectedImageUrl(null); setPreview(null);
    setVariations([]); setSelectedVariation(null); setNextVariationIndex(0);
    setIntake({ mood: "", usage: "", reference: "", preserveNotes: "", customDescription: "" });
  };

  const allStyles = Object.values(ART_DIRECTION_STYLES);
  const isSignedIn = isLoaded && !!user;
  const hasVariations = variations.length > 0;
  /** Keep workspace visible if we already have variations — don’t hide them when `preview` flickers or clears. */
  const showWorkspace = Boolean(preview) || hasVariations;
  const originalSrc = preview ?? selectedImageUrl ?? "";
  const canGenerateMore = nextVariationIndex >= 0 && nextVariationIndex < 4 && !isGenerating;
  const isFirstGeneration = variations.length === 0;

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} />}

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-cream/90 backdrop-blur-sm border-b border-brown/10">
        <Link href="/" className="font-serif text-xl text-brown tracking-tight">Menu<span className="text-terracotta italic">Shoot</span>.ai</Link>
        <div className="flex items-center gap-5">
          <Link href="/#pricing" className="text-muted text-sm font-medium hover:text-terracotta transition-colors hidden md:block">Pricing</Link>
          <SignedOut>
            <SignInButton><button className="text-muted text-sm font-medium hover:text-terracotta">Sign In</button></SignInButton>
            <SignUpButton><button className="bg-terracotta text-white py-2.5 px-5 rounded text-sm font-medium hover:bg-brown transition-colors">Get Started</button></SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/account" className="text-terracotta text-sm font-medium hover:underline hidden md:block">Account</Link>
            <span className="text-muted text-sm tabular-nums">{credits ?? 0} credit{credits !== 1 ? "s" : ""}</span>
            <BuyButton productId="full" variant="outline" compact>Buy Credits</BuyButton>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      <main className="flex-1 pt-24 px-6 pb-16 max-w-5xl mx-auto w-full">
        <SignedOut><AuthWall /></SignedOut>
        <SignedIn>
          {isLoaded && credits !== undefined && credits < 1 && <NoCreditsWall />}
          {(!isLoaded || credits === undefined || credits > 0) && (
            <>
              <div className="text-center mb-10">
                <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-3">AI-Powered Food Photography</p>
                <h1 className="font-serif text-3xl md:text-4xl text-brown leading-tight mb-3">
                  Upload a food photo.<br /><em className="text-terracotta">Get the perfect shot.</em>
                </h1>
                <p className="text-muted text-base max-w-md mx-auto">Choose a style, describe what you&apos;re going for, and generate variations until you find the one.</p>
                {credits !== undefined && credits > 0 && <p className="text-sage text-xs mt-3 font-medium">{credits} credit{credits !== 1 ? "s" : ""} remaining · up to 4 variations per credit</p>}
              </div>

              {uploads && uploads.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs tracking-[0.12em] uppercase text-muted font-medium mb-3">My Uploads</p>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 scrollbar-thin">
                    {uploads.map((u) => (
                      <button key={u._id} type="button" onClick={() => handleSelectUpload(u.url)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:border-terracotta/60 ${selectedImageUrl === u.url ? "border-terracotta ring-2 ring-terracotta/30" : "border-brown/10"}`}>
                        <img src={u.url} alt="Upload" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {pastImages && pastImages.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs tracking-[0.12em] uppercase text-muted font-medium mb-3">Recent Transforms</p>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 scrollbar-thin">
                    {pastImages.map((img) => {
                      const styleLabel = allStyles.find((s) => s.id === img.style)?.label ?? img.style;
                      return (
                        <a key={img._id} href={img.url} target="_blank" rel="noopener noreferrer"
                          className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-brown/10 hover:border-terracotta/60 transition-all group">
                          <img src={img.url} alt={styleLabel} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {!showWorkspace ? (
                <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-12 md:p-16 text-center transition-colors cursor-pointer ${isDragging ? "border-terracotta bg-terracotta/5" : "border-muted/40 hover:border-muted hover:bg-warm-white/50"} ${isUploading ? "opacity-60 pointer-events-none" : ""}`}>
                  <input type="file" accept="image/*" onChange={handleInputChange} className="hidden" id="upload" disabled={isUploading} />
                  <label htmlFor="upload" className="cursor-pointer block">
                    {isUploading ? (
                      <><div className="w-9 h-9 border-2 border-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-3" /><p className="font-serif text-lg text-brown mb-1">Saving to My Uploads…</p></>
                    ) : (
                      <><span className="text-4xl mb-3 block">📸</span><p className="font-serif text-lg text-brown mb-1">Drag & drop your food photo</p><p className="text-muted text-sm">or click to browse · iPhone photos welcome</p></>
                    )}
                  </label>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Original */}
                  <div className="bg-warm-white border border-brown/10 rounded-lg overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-brown/10 flex items-center justify-between">
                      <p className="text-xs tracking-widest uppercase text-muted font-medium">Original Photo</p>
                      <button type="button" onClick={handleReset} className="text-xs text-muted hover:text-terracotta transition-colors">Change photo</button>
                    </div>
                    <div className="aspect-[16/6] bg-cream">
                      {originalSrc ? (
                        <img src={originalSrc} alt="Original" className="w-full h-full object-contain" draggable={false} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted text-sm px-4 text-center">
                          Preview unavailable — your variations below are still here. Use &ldquo;Change photo&rdquo; to start over.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Style picker */}
                  <div className="bg-warm-white border border-brown/10 rounded-lg p-5">
                    <p className="text-xs tracking-[0.12em] uppercase text-muted font-medium mb-3">Art Direction Style</p>
                    <div className="flex flex-wrap gap-2">
                      {allStyles.map((s) => (
                        <button key={s.id} type="button" onClick={() => setStyle(s.id)}
                          className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${style === s.id ? "bg-terracotta text-white" : "bg-cream text-muted hover:text-brown border border-brown/10 hover:border-terracotta/40"}`}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Intake form — only show before first generation */}
                  {!hasVariations && <IntakeForm intake={intake} onChange={setIntake} />}

                  {/* Generate button */}
                  {isFirstGeneration && (
                    <div className="flex justify-center">
                      <button onClick={() => handleGenerate(0)}
                        disabled={isGenerating || !isSignedIn || (credits !== undefined && credits < 1)}
                        className="px-10 py-3.5 rounded bg-terracotta text-white font-medium hover:bg-brown disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:enabled:-translate-y-0.5 hover:enabled:shadow-lg text-sm">
                        {isGenerating ? "Generating…" : "Generate First Variation (1 credit)"}
                      </button>
                    </div>
                  )}

                  {/* Variations — appear one at a time */}
                  {hasVariations && (
                    <div className="space-y-4">
                      <p className="text-xs tracking-[0.12em] uppercase text-muted font-medium">
                        Variations — {variations.length} of 4 · tap to select
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        {variations.map((v) => (
                          <div
                            key={`${v.index}-${v.label}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedVariation(v.index)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedVariation(v.index);
                              }
                            }}
                            className={`rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${selectedVariation === v.index ? "border-terracotta ring-2 ring-terracotta/20" : "border-brown/10 hover:border-terracotta/40"}`}
                          >
                            <div className="px-3 py-2 border-b border-brown/10 bg-warm-white flex items-center justify-between">
                              <div>
                                <p className="text-xs font-semibold text-brown">{v.label}</p>
                                <p className="text-[10px] text-muted">{v.description}</p>
                              </div>
                              {selectedVariation === v.index && <span className="text-[10px] bg-terracotta text-white px-2 py-0.5 rounded-full font-medium">Selected</span>}
                            </div>
                            <div className="aspect-[4/3] bg-cream relative">
                              <img
                                src={v.url}
                                alt={v.label}
                                className="w-full h-full object-contain pointer-events-none select-none"
                                draggable={false}
                              />
                              <a
                                href={v.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-2 right-2 text-[10px] font-medium bg-charcoal/80 text-white px-2 py-1 rounded hover:bg-charcoal"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Open full size
                              </a>
                            </div>
                          </div>
                        ))}

                        {/* Loading placeholder for next variation */}
                        {isGenerating && (
                          <div className="rounded-lg overflow-hidden border border-brown/10 bg-warm-white">
                            <div className="px-3 py-2 border-b border-brown/10">
                              <p className="text-xs font-semibold text-brown">{VARIATION_LABELS[nextVariationIndex] ?? "Generating…"}</p>
                            </div>
                            <div className="aspect-[4/3] bg-cream flex flex-col items-center justify-center gap-2">
                              <div className="w-7 h-7 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
                              <p className="text-muted text-xs">Generating…</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3 justify-center pt-1">
                        {selectedVariation !== null && (
                          <button onClick={() => { const v = variations.find((v) => v.index === selectedVariation); if (v) handleDownload(v); }}
                            className="px-8 py-3 rounded bg-terracotta text-white font-medium hover:bg-brown transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm">
                            Download &ldquo;{variations.find((v) => v.index === selectedVariation)?.label}&rdquo;
                          </button>
                        )}
                        {canGenerateMore && (
                          <button onClick={() => handleGenerate(nextVariationIndex)}
                            className="px-8 py-3 rounded border border-brown text-brown font-medium hover:bg-brown hover:text-cream transition-all text-sm">
                            Try next variation ({VARIATION_LABELS[nextVariationIndex]}) →
                          </button>
                        )}
                        <button onClick={handleReset} className="px-8 py-3 rounded border border-muted/50 text-muted hover:border-muted hover:text-brown transition-colors text-sm">
                          Start over
                        </button>
                      </div>
                    </div>
                  )}

                  {credits !== undefined && credits === 1 && (
                    <div className="text-center p-4 rounded-lg bg-gold/10 border border-gold/20">
                      <p className="text-brown text-sm font-medium mb-3">You have 1 credit left</p>
                      <BuyButton productId="full" variant="filled" compact>Top up — 25 credits for $199</BuyButton>
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
