# MenuShoot.ai Deployment Guide

Deploy to Vercel in about 15 minutes.

## 1. Push to GitHub

```bash
cd /Users/andrewstankus/Documents/MenuShootAI
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/MenuShootAI.git
git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username. Create the repo at github.com/new first.)

---

## 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (with GitHub).
2. **New Project** → Import your `MenuShootAI` repo.
3. Leave framework preset as **Next.js** and root directory as `.`.
4. Add environment variables (see below).
5. Click **Deploy**.

---

## 3. Environment Variables (Vercel)

Add these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Value | Notes |
|----------|-------|-------|
| `GOOGLE_GEMINI_API_KEY` | Your API key | From [aistudio.google.com](https://aistudio.google.com/apikey) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_...` or `pk_test_...` | Clerk dashboard |
| `CLERK_SECRET_KEY` | `sk_live_...` or `sk_test_...` | Clerk dashboard |
| `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` | Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Create webhook in step 5 |
| `RESEND_API_KEY` | `re_...` | From [resend.com](https://resend.com) |
| `NEXT_PUBLIC_CONVEX_URL` | `https://xxx.convex.cloud` | Convex dashboard or `npx convex deploy` |
| `CLOUDINARY_CLOUD_NAME` | Your cloud name | Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Your API key | Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Your API secret | Cloudinary dashboard |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | **Replace with your actual Vercel URL** |

**Important:** Set `NEXT_PUBLIC_APP_URL` *after* your first deploy so you know the URL (e.g. `https://menushoot-ai-xxx.vercel.app`).

---

## 4. Clerk (Post-Deploy)

1. [Clerk Dashboard](https://dashboard.clerk.com) → Your application.
2. **Configure** → **Paths** → add your Vercel URL to **Allowed redirect URLs** and **Allowed origins**.
3. If using production: create a Production instance and use those keys in Vercel.

---

## 5. Stripe Webhook (Post-Deploy)

1. [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**.
2. **Add endpoint**:
   - URL: `https://YOUR_VERCEL_URL/api/stripe/webhook`
   - Events: `checkout.session.completed`
3. Copy the **Signing secret** (`whsec_...`).
4. Add `STRIPE_WEBHOOK_SECRET` in Vercel and redeploy.

---

## 6. Convex (Production)

**Option A – Keep using Dev:**  
Leave `NEXT_PUBLIC_CONVEX_URL` as your dev deployment. Works for testing.

**Option B – Production deployment:**
```bash
npx convex deploy
```
Use the production URL from the output as `NEXT_PUBLIC_CONVEX_URL` in Vercel.

---

## 7. Verify

- Visit `https://your-app.vercel.app`
- Sign up / sign in
- Buy credits (test mode if using `sk_test_`)
- Transform an image
- Check that the success toast appears after payment

---

## Troubleshooting

- **Build fails:** Ensure all env vars are set. Build logs are in Vercel → Deployments.
- **Redirects fail:** Check `NEXT_PUBLIC_APP_URL` and Clerk allowed origins.
- **Credits not added:** Confirm Stripe webhook URL, events, and `STRIPE_WEBHOOK_SECRET`.
- **Images not saving:** Verify Cloudinary and Convex env vars.
