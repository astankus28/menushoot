"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#how", label: "How It Works" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
  { href: "/account", label: "Account" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  // Close menu on route change / scroll
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-brown/10">
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl text-brown tracking-tight" onClick={() => setOpen(false)}>
          Menu<span className="text-terracotta italic">Shoot</span>.ai
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-muted text-sm font-medium tracking-wide hover:text-terracotta transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/app" className="bg-terracotta text-white py-2.5 px-5 rounded text-sm font-medium hover:bg-brown transition-colors">
              Get Started
            </Link>
          </li>
        </ul>

        {/* Mobile: Get Started + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/app" className="bg-terracotta text-white py-2 px-4 rounded text-sm font-medium hover:bg-brown transition-colors">
            Get Started
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded hover:bg-brown/5 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-brown transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-brown transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-brown transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 border-t border-brown/10" : "max-h-0"}`}>
        <ul className="flex flex-col px-6 py-4 gap-1 bg-cream list-none">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-brown font-medium text-base border-b border-brown/8 hover:text-terracotta transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="/app"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-terracotta text-white py-3.5 rounded font-medium hover:bg-brown transition-colors"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
