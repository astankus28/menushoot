"use client";

import { Component, ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const msg = this.state.error?.message ?? "Unknown error";
      const isConvex = msg.includes("Convex") || msg.includes("useConvex");
      return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-8 text-center">
          <p className="text-terracotta text-2xl mb-4">Something went wrong</p>
          <p className="text-muted text-sm max-w-md mb-6">{msg}</p>
          {isConvex && (
            <p className="text-brown text-sm max-w-md mb-6">
              Make sure <code className="bg-warm-white px-2 py-1 rounded">NEXT_PUBLIC_CONVEX_URL</code> is set in Vercel → Settings → Environment Variables.
            </p>
          )}
          <a href="/" className="text-terracotta font-medium hover:underline">
            ← Back to home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
