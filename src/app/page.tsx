import Link from "next/link";
import Image from "next/image";
import { BuyButton } from "@/components/BuyButton";
import { StyleSlider } from "@/components/StyleSlider";
import { Nav } from "@/components/Nav";

const STRATEGY_SESSION_MAILTO = `mailto:hello@menushoot.ai?subject=${encodeURIComponent(
  "Strategy Session Inquiry"
)}&body=${encodeURIComponent(
  `Hi Andrew,

I'm interested in booking a Strategy Session. Here's a bit about my situation:

Restaurant name:
Location:
How many menu items do you have?
What platforms are you on? (UberEats, DoorDash, website, Instagram):
What's your biggest photography challenge right now?
Best time to meet (timezone):

Thanks`
)}`;

const DONE_FOR_YOU_MAILTO = `mailto:hello@menushoot.ai?subject=${encodeURIComponent(
  "Done-For-You Inquiry"
)}&body=${encodeURIComponent(
  `Hi Andrew,

I'm interested in the Done-For-You package. Here's a bit about my situation:

Restaurant name:
Location:
How many menu items do you have?
What platforms are you on? (UberEats, DoorDash, website, Instagram):

Do you have existing food photos we can work from? (links, attachments later, or describe what you have):

Style / vibe you're going for:

Anything else we should know?

Thanks`
)}`;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Nav />

      {/* Hero */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-20 overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-20">
          <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-5">AI-Powered Food Photography</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] text-brown leading-[1.08] mb-7">
            Your menu,<br />
            <em className="text-terracotta italic">beautifully shot.</em>
            <br />Without a shoot.
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-md mb-6">
            Upload any photo — even an iPhone snap. Get 4 professional variations in 60 seconds. No studio, no scheduling, no photographer.
          </p>
          <p className="text-sage text-sm font-medium mb-8 flex items-center gap-2">
            <span className="text-base">🎁</span> Sign up free · Get 1 complimentary transformation · No credit card required
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/app" className="inline-block bg-terracotta text-white py-4 px-8 rounded font-medium hover:bg-brown transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Try It Free →
            </Link>
            <Link href="#how" className="inline-flex items-center gap-2 text-brown font-medium hover:gap-3 transition-all">
              See how it works
              <span>→</span>
            </Link>
          </div>
          <div className="flex gap-9 mt-14 pt-9 border-t border-brown/10">
            <div>
              <strong className="block font-serif text-2xl text-brown mb-1">60sec</strong>
              <span className="text-muted text-xs tracking-wider">Turnaround</span>
            </div>
            <div>
              <strong className="block font-serif text-2xl text-brown mb-1">16+</strong>
              <span className="text-muted text-xs tracking-wider">Years Experience</span>
            </div>
            <div>
              <strong className="block font-serif text-2xl text-brown mb-1">3,300+</strong>
              <span className="text-muted text-xs tracking-wider">Projects Shot</span>
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

      {/* Marquee */}
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

      {/* How it works */}
      <section id="how" className="py-24 md:py-28 px-6 md:px-20 scroll-mt-24">
        <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-4">The Process</p>
        <h2 className="font-serif text-3xl md:text-4xl text-brown leading-tight mb-5">Three steps to a<br />stunning menu</h2>
        <p className="text-muted max-w-md mb-16">No scheduling. No studio time. No travel. Upload your photo and have professional results in 60 seconds.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 rounded-lg bg-warm-white border border-brown/10 relative hover:-translate-y-1 hover:shadow-xl transition-all">
            <span className="absolute top-5 right-7 font-serif text-4xl text-terracotta/20 font-bold">01</span>
            <span className="text-3xl block mb-5">📸</span>
            <h3 className="font-serif text-lg text-brown mb-3">Upload your photo</h3>
            <p className="text-muted text-sm leading-relaxed">Drop in any existing image — iPhone shots, Google listing photos, or screenshots from your menu. We work with what you have.</p>
          </div>
          <div className="p-8 rounded-lg bg-warm-white border border-brown/10 relative hover:-translate-y-1 hover:shadow-xl transition-all">
            <span className="absolute top-5 right-7 font-serif text-4xl text-terracotta/20 font-bold">02</span>
            <span className="text-3xl block mb-5">🎨</span>
            <h3 className="font-serif text-lg text-brown mb-3">Choose your style</h3>
            <p className="text-muted text-sm leading-relaxed">Pick from 24 professional styles — Editorial, Moody, UberEats-optimized, Fine Dining, and more. Tell us exactly what you want.</p>
          </div>
          <div className="p-8 rounded-lg bg-warm-white border border-brown/10 relative hover:-translate-y-1 hover:shadow-xl transition-all">
            <span className="absolute top-5 right-7 font-serif text-4xl text-terracotta/20 font-bold">03</span>
            <span className="text-3xl block mb-5">⚡</span>
            <h3 className="font-serif text-lg text-brown mb-3">Get 4 variations in 60 seconds</h3>
            <p className="text-muted text-sm leading-relaxed">We generate multiple interpretations so you can pick the one that fits. Download instantly, optimized for every platform.</p>
          </div>
        </div>
        <StyleSlider />
      </section>

      {/* Portfolio */}
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

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-28 px-6 md:px-20 scroll-mt-24">
        <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-4">Pricing</p>
        <h2 className="font-serif text-3xl md:text-4xl text-brown leading-tight mb-5">Simple, transparent<br />packages</h2>
        <p className="text-muted max-w-md mb-14">No hidden fees. Start free, pay only when you&apos;re ready to scale.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          {/* Free */}
          <div className="p-8 rounded-lg border-2 border-sage bg-warm-white relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-white text-[10px] tracking-wider uppercase px-4 py-1 rounded-full">Start Here</span>
            <p className="text-xs tracking-[0.14em] uppercase text-sage font-medium mb-4 mt-2">Free</p>
            <div className="font-serif text-3xl text-brown">$0</div>
            <p className="text-muted text-sm mt-2 mb-6">1 credit · 4 variations</p>
            <ul className="space-y-3 text-sm text-muted mb-8">
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> 1 free transformation</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> All 24 styles</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> 4 variations per credit</li>
            </ul>
            <Link href="/app" className="block w-full text-center py-3 px-6 rounded border-2 border-sage text-sage font-medium hover:bg-sage hover:text-white transition-colors">
              Get Started Free
            </Link>
          </div>
          {/* Trial */}
          <div className="p-8 rounded-lg border border-brown/10 bg-warm-white">
            <p className="text-xs tracking-[0.14em] uppercase text-terracotta font-medium mb-4">Trial</p>
            <div className="font-serif text-3xl text-brown">$29</div>
            <p className="text-muted text-sm mt-2 mb-6">3 credits · up to 12 variations</p>
            <ul className="space-y-3 text-sm text-muted mb-8">
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> Results in 60 seconds</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> All 24 styles</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> All platform formats</li>
            </ul>
            <BuyButton productId="trial" variant="outline" />
          </div>
          {/* Full Menu */}
          <div className="p-8 rounded-lg border-2 border-terracotta bg-brown text-cream relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white text-[10px] tracking-wider uppercase px-4 py-1 rounded-full">Most Popular</span>
            <p className="text-xs tracking-[0.14em] uppercase text-gold-light font-medium mb-4 mt-2">Full Menu</p>
            <div className="font-serif text-3xl text-cream">$199</div>
            <p className="text-cream/70 text-sm mt-2 mb-6">25 credits · up to 100 variations</p>
            <ul className="space-y-3 text-sm text-cream/80 mb-8">
              <li className="flex items-center gap-2"><span className="text-gold">✓</span> Results in 60 seconds</li>
              <li className="flex items-center gap-2"><span className="text-gold">✓</span> All 24 styles</li>
              <li className="flex items-center gap-2"><span className="text-gold">✓</span> Style consistency pass</li>
            </ul>
            <BuyButton productId="full" variant="filled" />
          </div>
          {/* Agency */}
          <div className="p-8 rounded-lg border border-brown/10 bg-warm-white">
            <p className="text-xs tracking-[0.14em] uppercase text-terracotta font-medium mb-4">Agency</p>
            <div className="font-serif text-3xl text-brown">$399<span className="text-base font-sans font-light">/mo</span></div>
            <p className="text-muted text-sm mt-2 mb-6">75 credits/month</p>
            <ul className="space-y-3 text-sm text-muted mb-8">
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> Results in 60 seconds</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> Unlimited variations</li>
              <li className="flex items-center gap-2"><span className="text-sage">✓</span> Multi-seat access</li>
            </ul>
            <BuyButton productId="agency" variant="outline" />
          </div>
        </div>
      </section>

      {/* White Glove Consulting */}
      <section id="consulting" className="py-24 md:py-28 px-6 md:px-20 bg-warm-white scroll-mt-24">
        <div className="max-w-4xl">
          <p className="text-terracotta text-xs font-medium tracking-[0.18em] uppercase mb-4">White Glove Service</p>
          <h2 className="font-serif text-3xl md:text-4xl text-brown leading-tight mb-5">
            Work directly<br /><em className="text-terracotta italic">with Andrew</em>
          </h2>
          <p className="text-muted max-w-lg mb-12 leading-relaxed">
            16 years shooting for UberEats, DoorDash, and Grubhub across 3,300+ projects. Book a 1-on-1 session to get personalized strategy, style direction, and hands-on transformation of your menu photos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg border border-brown/10 bg-cream hover:-translate-y-1 hover:shadow-xl transition-all">
              <span className="text-3xl block mb-4">🎯</span>
              <h3 className="font-serif text-lg text-brown mb-2">Strategy Session</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">60-minute call with Andrew: a custom style guide for your brand and a hands-on review of your current food photos.</p>
              <p className="font-serif text-2xl text-brown mb-5">$299</p>
              <a href={STRATEGY_SESSION_MAILTO}
                className="block w-full text-center py-3 px-6 rounded border-2 border-brown text-brown font-medium hover:bg-brown hover:text-cream transition-colors">
                Book a Session
              </a>
            </div>
            <div className="p-8 rounded-lg border-2 border-terracotta bg-brown text-cream hover:-translate-y-1 hover:shadow-xl transition-all">
              <span className="text-3xl block mb-4">✨</span>
              <h3 className="font-serif text-lg text-cream mb-2">Done-For-You</h3>
              <p className="text-cream/70 text-sm leading-relaxed mb-4">Andrew personally transforms 10 menu items for you. Consulting call included.</p>
              <p className="font-serif text-2xl text-cream mb-5">$599</p>
              <a href={DONE_FOR_YOU_MAILTO}
                className="block w-full text-center py-3 px-6 rounded bg-terracotta text-white font-medium hover:bg-terra-light transition-colors">
                Get Started
              </a>
            </div>
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
            <a href="mailto:hello@menushoot.ai"
              className="inline-flex items-center justify-center gap-2 bg-terracotta text-white py-4 px-8 rounded font-medium hover:bg-terra-light transition-colors">
              ✉ hello@menushoot.ai
            </a>
            <Link href="/app"
              className="inline-flex items-center justify-center gap-2 border border-cream/30 text-cream py-4 px-8 rounded font-medium hover:border-cream hover:bg-cream/5 transition-colors">
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
