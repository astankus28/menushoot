import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-brown/10 bg-cream/95">
        <Link href="/" className="font-serif text-xl text-brown tracking-tight">
          Menu<span className="text-terracotta italic">Shoot</span>.ai
        </Link>
        <Link
          href="/"
          className="text-muted text-sm font-medium hover:text-terracotta transition-colors"
        >
          ← Cancel
        </Link>
      </nav>
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <SignIn
        appearance={{
          variables: {
            colorPrimary: "#C4622D",
            colorText: "#3D2B1F",
            colorBackground: "#FDF9F3",
            borderRadius: "4px",
          },
        }}
        afterSignInUrl="/app"
        signUpUrl="/sign-up"
      />
      </div>
    </div>
  );
}
