# Abuse Prevention: Free Samples & Multiple Accounts

## Current Setup

**There are no free transforms.** Every new account starts with **0 credits**. Users must purchase credits before they can transform any images. Creating multiple email addresses does not help—each account gets 0 credits.

The landing page "Get Your Free Sample" links to `/app`, where users sign in and see pricing. It does **not** grant free credits.

---

## If You Add 1 Free Credit for New Signups

If you want to offer 1 free transform to convert trial users, here’s how to limit abuse:

### Option A: One-Time Per Account (Simple)
- Add `hasReceivedFreeCredit: boolean` to the `users` table in Convex
- On first sign-in, grant 1 credit and set the flag
- Easy to implement, but multiple emails can still get multiple free credits

### Option B: Require Email Verification
- Clerk already verifies emails for most signups
- Ensure Clerk is configured to require verified email before the app grants any free credit
- Reduces throwaway emails but doesn’t fully stop abuse

### Option C: Require Payment Method (Strongest)
- Use Stripe’s “$0 authorization” or “setup intent” to validate a real card
- User adds a card; no charge; you grant 1 free credit
- Makes it harder to spin up many accounts

### Option D: Manual Approval for “Free Sample”
- Keep “Get Your Free Sample” as a contact form
- You manually review and send 1 sample per business/email
- Human review catches abuse

---

## Enterprise / Repeat Clients

For organized workflows with repeat clients:

- The **Account** page shows credits, purchase history, and gallery
- Future ideas: team/organization support, invoicing, bulk credit packs
- Convex `users` and `orders` already support this
