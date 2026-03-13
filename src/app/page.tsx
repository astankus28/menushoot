import Link from "next/link";
import Image from "next/image";
import { BuyButton } from "@/components/BuyButton";
import { StyleSlider } from "@/components/StyleSlider";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-cream/90 backdrop-blur-sm border-b border-brown/10">
        <Link href="/" className="font-serif text-xl text-brown tracking-tight">
          Menu<span className="text-terracotta italic">Shoot</span>.ai
        </Link>
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li>
            <Link href="#how" className="text-muted text-sm font-medium tracking-wide hover:text-terracotta transition-colors">
              How It Works
            </Link>
          </li>
          <li>
            <Link href="#portfolio" className="text-muted text-sm font-medium tracking-wide hover:text-terracotta transition-colors">
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="#pricing" className="text-muted text-sm font-medium tracking-wide hover:text-terracotta transition-colors">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-muted text-sm font-medium tracking-wide hover:text-terracotta transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/account" className="text-muted text-sm font-medium tracking-wide hover:text-terracotta transition-colors">
              Account
            </Link>
          </li>
          <li>
            <Link href="/account" className="bg-terracotta text-white py-2.5 px-5 rounded text-sm font-medium hover:bg-brown transition-colors">
              Get Started
            </Link>
          </li>
        </ul>
      </nav>

      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-20 overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-20">
          <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-5">AI-Powered Food Photography</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] text-brown leading-[1.08] mb-7">
            Your menu,<br />
            <em className="text-terracotta italic">beautifully shot.</em>
            <br />Without a shoot.
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-md mb-10">
            Send us your existing photos — even iPhone snaps. We deliver polished, professional menu imagery in 48 hours. No studio, no scheduling, no hassle.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/account" className="inline-block bg-terracotta text-white py-4 px-8 rounded font-medium hover:bg-brown transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Try It Now
            </Link>
            <Link href="#how" className="inline-flex items-center gap-2 text-brown font-medium hover:gap-3 transition-all">
              See how it works
              <span>→</span>
            </Link>
          </div>
          <div className="flex gap-9 mt-14 pt-9 border-t border-brown/10">
            <div>
              <strong className="block font-serif text-2xl text-brown mb-1">48hr</strong>
              <span className="text-muted text-xs tracking-wider">Turnaround</span>
            </div>
            <div>
              <strong className="block font-serif text-2xl text-brown mb-1">16+</strong>
              <span className="text-muted text-xs tracking-wider">Years Experience</span>
            </div>
            <div>
              <strong className="block font-serif text-2xl text-brown mb-1">Miami</strong>
              <span className="text-muted text-xs tracking-wider">& Cleveland</span>
            </div>
          </div>
        </div>
        <div className="relative bg-warm-white min-h-[400px] lg:min-h-screen grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5">
          <div className="relative row-span-2 overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" alt="Food" fill className="object-cover" sizes="(max-width:768px) 50vw, 33vw" />
          </div>
          <div className="relative overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80" alt="Food" fill className="object-cover" sizes="(max-width:768px) 50vw, 33vw" />
          </div>
          <div className="relative overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80" alt="Food" fill className="object-cover" sizes="(max-width:768px) 50vw, 33vw" />
          </div>
          <div className="absolute bottom-8 left-6 bg-white rounded-xl p-5 shadow-xl z-10">
            <p className="text-[10px] tracking-widest uppercase text-muted mb-1">Powered by AI</p>
            <p className="font-serif text-lg text-brown">Professional Results</p>
            <p className="text-sage text-sm mt-0.5">✓ Art directed by a real photographer</p>
          </div>
        </div>
      </section>

      <div className="bg-brown text-gold-light py-3.5 overflow-hidden">
        <div className="flex animate-[marquee_22s_linear_infinite] whitespace-nowrap">
          {["UberEats", "DoorDash", "Grubhub", "Restaurant Menus", "Social Media", "Ghost Kitchens", "Hospitality Brands", "Food Trucks"].flatMap((item) => [
            <span key={item} className="px-8 text-xs tracking-widest uppercase opacity-85">{item}</span>,
            <span key={`${item}-dot`} className="text-terracotta px-1">·</span>,
          ])}
          {["UberEats", "DoorDash", "Grubhub", "Restaurant Menus", "Social Media", "Ghost Kitchens", "Hospitality Brands", "Food Trucks"].flatMap((item) => [
            <span key={`2-${item}`} className="px-8 text-xs tracking-widest uppercase opacity-85">{item}</span>,
            <span key={`2-${item}-dot`} className="text-terracotta px-1">·</span>,
          ])}
        </div>
      </div>

      <section id="how" className="py-24 md:py-28 px-6 md:px-20 scroll-mt-24">
        <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-4">The Process</p>
        <h2 className="font-serif text-3xl md:text-4xl text-brown leading-tight mb-5">Three steps to a<br />stunning menu</h2>
        <p className="text-muted max-w-md mb-12">No scheduling. No studio time. No travel. Just great food photography delivered to your inbox.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 rounded-lg bg-warm-white border border-brown/10 relative hover:-translate-y-1 hover:shadow-xl transition-all">
            <span className="absolute top-5 right-7 font-serif text-4xl text-terracotta/20 font-bold">01</span>
            <span className="text-3xl block mb-5">📸</span>
            <h3 className="font-serif text-lg text-brown mb-3">Send your photos</h3>
            <p className="text-muted text-sm leading-relaxed">Share any existing images — even iPhone shots. We also work from Instagram, menu PDFs, or Google listing.</p>
          </div>
          <div className="p-8 rounded-lg bg-warm-white border border-brown/10 relative hover:-translate-y-1 hover:shadow-xl transition-all">
            <span className="absolute top-5 right-7 font-serif text-4xl text-terracotta/20 font-bold">02</span>
            <span className="text-3xl block mb-5">🎨</span>
            <h3 className="font-serif text-lg text-brown mb-3">We craft the visuals</h3>
            <p className="text-muted text-sm leading-relaxed">Our AI tools — guided by 16 years of professional food photography — generate polished hero shots. Every image is art directed.</p>
          </div>
          <div className="p-8 rounded-lg bg-warm-white border border-brown/10 relative hover:-translate-y-1 hover:shadow-xl transition-all">
            <span className="absolute top-5 right-7 font-serif text-4xl text-terracotta/20 font-bold">03</span>
            <span className="text-3xl block mb-5">⚡</span>
            <h3 className="font-serif text-lg text-brown mb-3">Receive in 48 hours</h3>
            <p className="text-muted text-sm leading-relaxed">Your images arrive optimized for UberEats, DoorDash, Grubhub, and social. Request revisions at no extra cost.</p>
          </div>
        </div>

        <div className="mt-20">
          <StyleSlider />
        </div>
      </section>

      <section id="portfolio" className="py-24 md:py-28 px-6 md:px-20 bg-warm-white scroll-mt-24">
        <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-4">Our Work</p>
        <h2 className="font-serif text-3xl md:text-4xl text-brown leading-tight mb-5">Every dish, made to<br /><em className="text-terracotta italic">look irresistible</em></h2>
        <p className="text-muted max-w-md mb-14">Recent menu transformations across Miami restaurants and delivery brands.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80", title: "Signature Entrée Collection", sub: "Miami Beach Restaurant", wide: true },
            { img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80", title: "Burger Menu Refresh", sub: "Ghost Kitchen, Brickell", wide: false },
            { img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80", title: "Pasta Series", sub: "Italian Concept, Wynwood", wide: false },
            { img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80", title: "UberEats Full Menu", sub: "Japanese Kitchen, Coral Gables", wide: false },
            { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80", title: "Fine Dining Menu Photography", sub: "South Beach", wide: true },
          ].map((p) => (
            <div key={p.title} className={`relative rounded-md overflow-hidden bg-[#e8e0d4] group ${p.wide ? "sm:col-span-2" : ""}`}>
              <div className="aspect-[4/3] relative">
                <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw, 50vw" />
              </div>
              <span className="absolute top-3 left-3 bg-gold/90 text-white text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-medium">AI Enhanced</span>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/90 to-transparent text-white p-5 pt-12 -translate-y-full group-hover:translate-y-0 transition-transform">
                <strong className="block text-sm">{p.title}</strong>
                <span className="text-xs opacity-75">{p.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-24 md:py-28 px-6 md:px-20 scroll-mt-24">
        <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-4">Pricing</p>
        <h2 className="font-serif text-3xl md:text-4xl text-brown leading-tight mb-5">Simple, transparent<br />packages</h2>
        <p className="text-muted max-w-md mb-14">No hidden fees. Pay per dish or choose a monthly plan.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="p-8 rounded-lg border border-brown/10 bg-warm-white">
            <p className="text-xs tracking-[0.14em] uppercase text-terracotta font-medium mb-4">Trial</p>
            <div className="font-serif text-3xl text-brown">$99</div>
            <p className="text-muted text-sm mt-2 mb-6">3 dish images</p>
            <ul className="space-y-3 text-sm text-muted mb-8">
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> 48-hour delivery</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> 1 revision round</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> All platform formats</li>
            </ul>
            <BuyButton productId="trial" variant="outline" />
          </div>
          <div className="p-8 rounded-lg border-2 border-terracotta bg-brown text-cream relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white text-[10px] tracking-wider uppercase px-4 py-1 rounded-full">Most Popular</span>
            <p className="text-xs tracking-[0.14em] uppercase text-gold-light font-medium mb-4 mt-2">Full Menu</p>
            <div className="font-serif text-3xl text-cream">$549</div>
            <p className="text-cream/70 text-sm mt-2 mb-6">25 dish images</p>
            <ul className="space-y-3 text-sm text-cream/80 mb-8">
              <li className="flex items-center gap-2"><span className="text-gold">✓</span> 48-hour delivery</li>
              <li className="flex items-center gap-2"><span className="text-gold">✓</span> Unlimited revisions</li>
              <li className="flex items-center gap-2"><span className="text-gold">✓</span> Style consistency pass</li>
            </ul>
            <BuyButton productId="full" variant="filled" />
          </div>
          <div className="p-8 rounded-lg border border-brown/10 bg-warm-white">
            <p className="text-xs tracking-[0.14em] uppercase text-terracotta font-medium mb-4">Agency Pro</p>
            <div className="font-serif text-3xl text-brown">$999<span className="text-base font-sans font-light">/mo</span></div>
            <p className="text-muted text-sm mt-2 mb-6">75 images/month</p>
            <ul className="space-y-3 text-sm text-muted mb-8">
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> 24-hour priority</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> Unlimited revisions</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> Multi-seat access</li>
            </ul>
            <BuyButton productId="agency" variant="outline" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-28 px-6 md:px-20 bg-brown text-cream scroll-mt-24">
        <div className="max-w-2xl">
          <p className="text-gold text-xs font-medium tracking-[0.18em] uppercase mb-4">Get In Touch</p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-5">
            Questions before you buy?
          </h2>
          <p className="text-cream/70 max-w-md mb-10 leading-relaxed">
            Not sure which package is right for you, or want to see a sample transformation with one of your own photos first? Send a message — usually respond same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:hello@menushoot.ai"
              className="inline-flex items-center justify-center gap-2 bg-terracotta text-white py-4 px-8 rounded font-medium hover:bg-terra-light transition-colors"
            >
              ✉ hello@menushoot.ai
            </a>
            <Link
              href="/account"
              className="inline-flex items-center justify-center gap-2 border border-cream/30 text-cream py-4 px-8 rounded font-medium hover:border-cream hover:bg-cream/5 transition-colors"
            >
              Try It Now →
            </Link>
          </div>
          <p className="text-cream/40 text-xs mt-8">
            Based in Miami &amp; Cleveland · Serving restaurants nationwide
          </p>
        </div>
      </section>

      <footer className="bg-charcoal text-white/40 py-9 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-serif text-lg text-white/70">Menu<span className="text-terracotta italic">Shoot</span>.ai</div>
        <p className="text-sm">© 2026 MenuShoot.ai · <a href="https://andrewstankus.com" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Andrew Stankus</a></p>
        <p className="text-xs">Miami · Cleveland · Nationwide</p>
      </footer>
    </div>
  );
}
