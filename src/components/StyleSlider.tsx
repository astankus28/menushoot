"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

const BEFORE_URL = "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773419029/IMG_8010_sguady.jpg";

// ── Swap in your Cloudinary URLs for each style ──────────────────────────────
// Replace the placeholder strings below with your actual after-photo URLs.
// Any style without a real URL will show a "coming soon" state gracefully.
const STYLES: { id: string; label: string; description: string; url: string }[] = [
  {
    id: "editorial",
    label: "Editorial",
    description: "Clean, high-end menu shot",
    url: "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773420190/menushoot/transforms/u3tbgqmlixnsivxyr99c.png",
  },
  {
    id: "natural",
    label: "Natural",
    description: "Bright, fresh, organic",
    url: "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773420158/menushoot/transforms/gcviqjyke3lw30usttmo.png",
  },
  {
    id: "moody",
    label: "Moody",
    description: "Dramatic, cinematic shadows",
    url: "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773420077/menushoot/transforms/g4a0hn6gkjrcfdxwm44o.png",
  },
  {
    id: "goldenHour",
    label: "Golden Hour",
    description: "Late afternoon light, long shadows",
    url: "",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Scandinavian, clean, app-ready",
    url: "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773419984/menushoot/transforms/tfhrpdlbtkwjxgpnkxrf.png",
  },
  {
    id: "fineDining",
    label: "Fine Dining",
    description: "Luxurious, Michelin-level refined",
    url: "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773418320/menushoot/transforms/lbbthufhuhvfvyspcvli.png",
  },
  {
    id: "streetFood",
    label: "Street Food",
    description: "Bold, punchy, delivery-optimized",
    url: "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773428209/menushoot/transforms/d9mfggbusmi2opmb1bu5.png",
  },
  {
    id: "rustic",
    label: "Rustic",
    description: "Earthy, artisan, farm-to-table",
    url: "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773428256/menushoot/transforms/mepkphyyybtbvgt1wvae.png",
  },
  {
    id: "socialMedia",
    label: "Social Media",
    description: "Instagram & TikTok optimized",
    url: "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773438353/menushoot/transforms/ww2psxhcqnu5tniqly5x.png",
  },
  {
    id: "brightAiry",
    label: "Bright & Airy",
    description: "Light, pastel, café & brunch feel",
    url: "https://res.cloudinary.com/dnhcs54zz/image/upload/v1773438438/menushoot/transforms/uza5ayrqkj39ls2qeaki.png",
  },
];

// ── Drag slider ───────────────────────────────────────────────────────────────
function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = (v: number) => Math.min(Math.max(v, 2), 98);

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setPos(clamp(((clientX - left) / width) * 100));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); setDragging(true); updatePos(e.clientX); };
  const onTouchStart = (e: React.TouchEvent) => { setDragging(true); updatePos(e.touches[0].clientX); };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updatePos(e.clientX);
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); updatePos(e.touches[0].clientX); };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updatePos]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg select-none cursor-col-resize bg-cream"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* After (full width, underneath) */}
      <Image src={after} alt="After" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />

      {/* Before (clipped to left portion) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={before} alt="Before" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] pointer-events-none"
        style={{ left: `${pos}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none z-10"
        style={{ left: `${pos}%` }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5l-4 5 4 5M13 5l4 5-4 5" stroke="#3d2b1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 bg-charcoal/75 text-white text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full pointer-events-none">
        Before
      </span>
      <span className="absolute bottom-3 right-3 bg-terracotta/90 text-white text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full pointer-events-none">
        After
      </span>
    </div>
  );
}

// ── Coming soon placeholder ───────────────────────────────────────────────────
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-lg bg-warm-white border-2 border-dashed border-brown/15 flex flex-col items-center justify-center gap-3 text-center px-6">
      <span className="text-3xl">✨</span>
      <p className="font-serif text-brown text-base">{label} style</p>
      <p className="text-muted text-xs">Sample coming soon</p>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function StyleSlider() {
  const available = STYLES.filter((s) => s.url.trim() !== "");
  const [active, setActive] = useState<string>("editorial");

  const current = STYLES.find((s) => s.id === active) ?? STYLES[0];

  return (
    <div className="mt-16 rounded-2xl bg-warm-white border border-brown/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-10 pt-10 pb-6">
        <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-3">
          See the Difference
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-brown mb-2">
          Six styles. One photo.
        </h3>
        <p className="text-muted text-sm max-w-md">
          Drag the slider to reveal the transformation. Switch styles to see
          how AI art direction changes the same dish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-0">
        {/* Left: slider */}
        <div className="px-6 md:pl-10 md:pr-6 pb-8 md:pb-10">
          {current.url ? (
            <BeforeAfterSlider before={BEFORE_URL} after={current.url} />
          ) : (
            <ComingSoon label={current.label} />
          )}

          {/* Style info below slider */}
          <div className="mt-4 flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold shrink-0 mt-0.5">
              {STYLES.findIndex((s) => s.id === current.id) + 1}
            </span>
            <div>
              <p className="text-brown font-medium text-sm">{current.label}</p>
              <p className="text-muted text-xs mt-0.5">{current.description}</p>
            </div>
          </div>
        </div>

        {/* Right: style picker */}
        <div className="md:border-l border-t md:border-t-0 border-brown/10 flex flex-col divide-y divide-brown/8">
          {STYLES.map((s, i) => {
            const isActive = s.id === active;
            const hasImage = s.url.trim() !== "";
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-4 px-6 py-4 text-left transition-all hover:bg-cream/50 ${
                  isActive ? "bg-cream" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-[#e8e0d4] relative">
                  {hasImage ? (
                    <Image
                      src={s.url}
                      alt={s.label}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted text-lg">
                      ✨
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        isActive ? "text-brown" : "text-muted"
                      }`}
                    >
                      {s.label}
                    </span>
                    {!hasImage && (
                      <span className="text-[9px] tracking-wider uppercase text-muted/60 bg-brown/5 px-1.5 py-0.5 rounded-full">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted/70 mt-0.5 leading-tight line-clamp-1">
                    {s.description}
                  </p>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
