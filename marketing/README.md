# Open Storey — Growth Plan

**Business:** OpenStorey LLC · **Founder:** Swatika Upendran · **Site:** https://openstorey.design
**The one goal everything points to:** get the right people to **book a free 15‑min call** (Calendly).

This folder is the playbook. It is split so you can act on one piece at a time:

| File | What it gives you |
|------|-------------------|
| [campaigns.md](campaigns.md) | 5 ready-to-run campaigns + 4-week content calendar + copy-paste captions |
| [social-setup.md](social-setup.md) | Step-by-step profile setup for Instagram, Pinterest, LinkedIn, Houzz (Upwork is already done) — bios, handles, first posts |
| [affiliate-setup.md](affiliate-setup.md) | How to turn **Curated Finds** into income: which programs, in what order, + a ready HTML product grid |
| [seo-and-tracking.md](seo-and-tracking.md) | What's already live on the site, plus Search Console / Google Business / GA4 / UTM setup |

---

## The funnel

```
External reach (IG · Pinterest · LinkedIn · Houzz · Upwork)
        │   every post ends with one CTA
        ▼
openstorey.design   ← rich link preview now renders (OG image added)
        │   floating badge + in-menu button: "Schedule a free 15-min call"
        ▼
Calendly booking  →  free 15-min intro call  →  proposal / project
        │
        └─ secondary: Curated Finds (affiliate income) + email list (Notify form)
```

**Rule for every piece of content you publish:** one clear call to action — *book the free call*. Not "DM me," not "link in bio for 5 things." One action.

---

## What I already shipped on the website (live-ready, in your working tree)

These are code changes against the **live static site** (`index.html`). Review them with `git diff`.

- ✅ **Removed "UX Portfolio" from the main menu** (your request) — it's now linked tastefully from the **About** section instead, so it stays discoverable without cluttering the nav.
- ✅ **Fixed the mobile menu.** The real bug wasn't transparency — the close (✕) icon was floating into the middle of the list. It's now pinned to the top bar, the panel is fully opaque, and I added a **"Schedule a free 15‑min call"** button inside the mobile menu (the floating Calendly badge is hidden while the menu is open, so this recovers the CTA).
- ✅ **Full SEO + social meta** added to a site that previously had **none**: meta description, Open Graph, Twitter/X cards, and JSON‑LD structured data (ProfessionalService + Person + a "free consultation" offer). Now when you share your link anywhere, it shows a proper title, description, and image card instead of a bare URL.
- ✅ **Generated a 1200×630 share image** (`assets/images/og-image.jpg`) — the correct size for social cards.
- ✅ **FTC affiliate disclosure page** (`disclosure.html`), linked from the footer and added to `sitemap.xml` — required before you run any affiliate link.
- ✅ **Regression tests** rewritten to cover all of the above (`tests/mobile-nav.spec.js`) — green on iPhone 13 + Pixel 7 (`npm run test:mobile`).

### One thing for you to confirm
The floating badge says **"Schedule a free 15 min call"** but currently books your Calendly **/30min** event. To honor the 15‑minute promise, create a **15‑minute event type** in Calendly and tell me the link (or I'll point it at whatever slug you choose). It works fine today either way — this is just truth-in-labeling.

---

## Your quick-start checklist (the things only you can do — you have the logins)

Do these in order; each unlocks the next.

1. **Calendly:** confirm/create the free 15‑min event (see note above).
2. **Google Business Profile** — *highest-ROI single action for a local designer.* Free, and it makes you show up for "interior designer near me / Bay Area." → [seo-and-tracking.md](seo-and-tracking.md)
3. **Google Search Console + GA4** — so you can see traffic and which campaigns drive calls. → [seo-and-tracking.md](seo-and-tracking.md)
4. **Create the social profiles** (Instagram → Pinterest → LinkedIn → Houzz). → [social-setup.md](social-setup.md)
5. **Send me your real profile URLs** so I can wire them into the site footer.
6. **Run Campaign 1 (Launch)** the day your Instagram has ≥3 posts up. → [campaigns.md](campaigns.md)
7. **Affiliates:** join the networks in Phase 1 now; Amazon after Curated Finds has real picks; LTK once Instagram passes ~5k. → [affiliate-setup.md](affiliate-setup.md)

---

## KPIs (check monthly)

| Metric | Where | Target (first 90 days) |
|--------|-------|------------------------|
| Free calls booked | Calendly | 8–12 / month by month 3 |
| Website visitors | GA4 | 500+ / month |
| Top traffic source | GA4 (by UTM) | identify your best channel, double down |
| Instagram followers | IG | 1,000+ (gateway to LTK at 5k) |
| Pinterest monthly views | Pinterest | 10k+ (compounds for months) |
| Affiliate clicks → earnings | network dashboards | first $ by month 3 |

---

## Deployment note
Your live site is the **static `index.html`** (GitHub Pages, domain `openstorey.design`). There was a half-finished React/Vite rewrite in the working tree; I parked it in `.migration-backup/` (see the README there) and restored the static site so all fixes land on what's actually deployed. **Do not commit the Vite shell over `index.html`** or the live site will break until the React app is finished. When you're ready to resume React, that folder explains how.
