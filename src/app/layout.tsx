import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MenuShoot.ai — Restaurant Photography, Reimagined",
  description:
    "Upload your food photo and receive a professionally transformed hero shot. AI-powered menu photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/app"
      afterSignUpUrl="/app"
    >
      <ConvexClientProvider>
        <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
          <body className="font-sans min-h-screen">{children}</body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
