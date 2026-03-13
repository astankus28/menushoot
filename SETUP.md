# MenuShoot.ai — Production Setup

## 1. Install dependencies

```bash
npm install
```

## 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

| Service | Purpose |
|--------|---------|
| `GOOGLE_GEMINI_API_KEY` | Image transformation (required) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Auth (optional until you enforce login) |
| `CLERK_SECRET_KEY` | Auth |
| `STRIPE_SECRET_KEY` | Payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhooks |
| `NEXT_PUBLIC_CONVEX_URL` | Database (run `npx convex dev` to get) |
| Cloudinary vars | Image storage (optional; base64 fallback) |
| `NEXT_PUBLIC_APP_URL` | For Stripe redirects (e.g. `https://menushoot.ai`) |

## 3. Clerk (Auth) — required for app to run

1. [clerk.com](https://clerk.com) → Create application (free tier)
2. Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to `.env.local`
3. Sign-in/Sign-up buttons on `/app` will work
4. To require login for `/app`, add `auth.protect()` in `middleware.ts` for the `/app` route

## 4. Stripe (Payments)

1. [dashboard.stripe.com](https://dashboard.stripe.com) → Get API keys
2. Create webhook to add credits after purchase:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` (from the `stripe listen` output) to `.env.local`
4. **Sign in is required** to buy credits (so we know who to add credits to)

## 5. Convex (Database)

**Required for credits and paywall.**

1. Run in a **separate terminal** (keep `npm run dev` running):
   ```bash
   npx convex dev
   ```
2. Log in or sign up at [convex.dev](https://convex.dev) when prompted
3. Convex will create a project and add `NEXT_PUBLIC_CONVEX_URL` to `.env.local`
4. After that, credits are stored in Convex and the transform API will require credits

## 6. Cloudinary (Image Storage)

1. [cloudinary.com](https://cloudinary.com) → Create account (free tier is generous)
2. Dashboard → Settings → API Keys → copy Cloud Name, API Key, API Secret
3. Add to `.env.local`:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=xxx
   CLOUDINARY_API_SECRET=xxx
   ```
4. Transformed images will upload to `menushoot/transforms/` folder and be saved to Convex for user history

## 7. Resend (Confirmation Emails)

1. [resend.com](https://resend.com) → Create account (free tier: 3,000 emails/mo)
2. API Keys → Create API Key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxx
   ```
4. After purchase, Stripe webhook fires and Resend sends a confirmation email automatically
5. Before going live, verify your domain at resend.com so emails come from `hello@menushoot.ai` instead of `onboarding@resend.dev`

## 7. Run locally

```bash
npm run dev
```

- `/` — Marketing landing page
- `/app` — Transform tool (requires auth when enforced)
