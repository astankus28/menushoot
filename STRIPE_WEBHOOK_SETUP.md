# Stripe Webhook Setup — Step-by-Step

## 1. Open Stripe in Test Mode

1. Go to **https://dashboard.stripe.com**
2. Toggle **Test mode** ON (top right — should show "Test mode")

---

## 2. Create the Webhook Endpoint

1. Click **Developers** in the left sidebar
2. Click **Webhooks**
3. Click **Add endpoint** (or **Add webhook**)

### Step A: Endpoint URL
Paste this exactly (no trailing slash):
```
https://menushoot.vercel.app/api/stripe/webhook
```

### Step B: Events to send
- Click **Select events**
- Search for: `checkout.session.completed`
- Check the box next to it
- Click **Add events**

### Step C: (Optional) Description
- Name: `MenuShoot production` (or any label you like)

### Step D: Click **Add endpoint**

---

## 3. Copy the Signing Secret

1. After the endpoint is created, you’ll see its details
2. Under **Signing secret**, click **Reveal**
3. Copy the value (starts with `whsec_`)

---

## 4. Add to Vercel

1. Go to **https://vercel.com**
2. Open your **menushoot** project
3. Click **Settings**
4. Click **Environment Variables** in the left sidebar
5. Find `STRIPE_WEBHOOK_SECRET` or add it:
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** paste the `whsec_...` value
   - **Environment:** Production, Preview, Development (check all)
6. Click **Save**

---

## 5. Redeploy

1. Go to **Deployments**
2. Click **⋯** on the latest deployment
3. Click **Redeploy**
4. Wait for it to finish

---

## 6. Test Again

1. Buy test credits on https://menushoot.vercel.app
2. Use card: `4242 4242 4242 4242`
3. Complete checkout
4. Credits should appear on /app

---

## If It Still Fails

1. In Stripe → Developers → Webhooks → click your endpoint
2. Scroll to **Recent deliveries**
3. Click the failed event
4. Check **Response** — the body will show the error
5. Send that error message to get help
