# Affiliate Setup — turning "Curated Finds" into income

Your **Curated Finds** page is the money page: you recommend objects/materials you genuinely use, and earn a commission when readers buy. This is realistic side income for a designer, but approvals have prerequisites, so do it in **phases** — don't apply to everything on day one and get rejected.

> ⚖️ **Legal/compliance is already handled on-site:** the FTC disclosure page (`disclosure.html`) is live and linked in the footer. Keep every affiliate link compliant (see the checklist at the bottom). All of this operates under **OpenStorey LLC** — use the LLC's EIN on the W‑9s, not your SSN.

---

## Phase 0 — make Curated Finds *qualify* (do this first)
Affiliate networks and Amazon **reject empty / "coming soon" pages**. Before applying anywhere you need **8–12 genuine product recommendations** live, each with a real photo, 2–3 honest sentences, and a placeholder link (you'll swap in the real affiliate link after approval).

- Use the ready HTML grid at the bottom of this file — drop it into the Curated Finds page replacing the "coming soon" block.
- Pick things you actually specify/own: a lighting piece, a rug, a textile, a stone/tile, an art object, a chair, a paint, a hardware/fixture, a vase, a book.
- This doubles as great Pinterest + Instagram content.

---

## Phase 1 — join the networks (start today, no audience required)
Networks approve based on **site quality**, not follower count — so once Phase 0 is live you can get in. Joining a network gives you access to *hundreds* of brands at once.

| Network | Why | Notes |
|---------|-----|-------|
| **ShareASale / Awin** | The biggest home-decor roster | One application → apply to individual brands inside |
| **Impact.com** | Many premium home brands run here | Per-brand approval inside |
| **CJ (Commission Junction)** | Large, established | Same model |
| **FlexOffers** | Aggregator; fills gaps | Good catch-all |

**Brand programs to apply to (inside those networks) that fit your taste:**
One Kings Lane (up to ~12%) · Wayfair / Birch Lane Professional · Rug Source (~10%, 180-day cookie) · Ballard Designs (~5%) · Lovesac (~7–10%) · Society6 (~10%) · Pier 1 (~8%, 90-day) · Etsy · Rejuvenation / Pottery Barn / West Elm (Williams-Sonoma) · Article · Lulu & Georgia · Burke Decor. Commissions mostly land **5–20%**; longer cookie windows (30–90+ days) convert better. *Rates change — confirm in each dashboard.*

**Also:** **Wayfair Professional** and trade programs (e.g. trade accounts at vendors you already use) often pay *better than* public affiliate links and suit a working designer — worth a separate look.

---

## Phase 2 — Amazon Associates (after Phase 0 content is live)
Great for the smaller objects (books, vases, hardware, lighting accessories).

**Requirements to get & keep it:**
- A live site with **original, regularly-updated content** (your Curated Finds + project posts qualify — that's why Phase 0 comes first).
- You must display the exact phrase **"As an Amazon Associate, I earn from qualifying purchases"** near the links (I've noted where in the template).
- You must make **3 qualifying sales within 180 days** of approval or the account is closed (you can re-apply). So apply *after* you have traffic pointed at the page — i.e., after Campaign 5 starts pushing Curated Finds.

**Steps:** affiliate-program.amazon.com → sign up with the OpenStorey LLC details → add your site + social → describe how you'll drive traffic → get your tracking ID → use SiteStripe to generate links.

---

## Phase 3 — LTK (later: once Instagram ≈ 5,000 followers)
LTK (the "shop my links" tool you see designers use) is **influencer-gated**: it wants ~5,000 followers, primarily on **Instagram**, with 4+ months of regular content. Don't apply early — a rejection has a cooldown. Treat 5k IG followers as the trigger, then apply at creator.shopltk.com. Until then, the networks above cover you.

---

## Sequencing summary
```
Now           → Phase 0: publish 8–12 real Curated Finds (template below)
Now + days    → Phase 1: join ShareASale/Awin, Impact, CJ, FlexOffers; apply to brands
After traffic → Phase 2: Amazon Associates (needs the content + the exact phrase + 3 sales/180d)
At ~5k IG     → Phase 3: LTK
```

---

## FTC / compliance checklist (keep you out of trouble)
- ✅ Disclosure page live (`disclosure.html`) and footer-linked — done.
- Put a **short disclosure at the top of Curated Finds itself**, not just in the footer ("This page contains affiliate links — see our disclosure."). It's in the template below.
- Mark affiliate links `rel="sponsored nofollow"` and `target="_blank"`.
- Amazon: show the exact required phrase on the page.
- Only recommend things you'd genuinely endorse — it's the rule *and* it's your brand.

---

## Ready-to-paste Curated Finds product grid
Drop this into `index.html` inside the Curated Finds page (`#page-finds`), replacing the "Something beautiful is coming" block, once you have real picks. It uses your brand palette and is responsive. Replace each `PRODUCT_*` placeholder and the `#AFFILIATE_LINK`.

```html
<section style="max-width:1100px;margin:0 auto;padding:2rem 1.6rem 5rem;">
  <p style="font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:#8c8479;margin-bottom:2rem;">
    This page contains affiliate links. If you buy through them, Open Storey may earn a small
    commission at no cost to you — see our <a href="disclosure.html" style="color:#c4724a;">disclosure</a>.
    <!-- Amazon only: --> As an Amazon Associate, I earn from qualifying purchases.
  </p>

  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:2.2rem;">

    <!-- ── one card; duplicate per product ── -->
    <article style="display:flex;flex-direction:column;">
      <a href="#AFFILIATE_LINK" target="_blank" rel="sponsored nofollow noopener"
         style="display:block;aspect-ratio:4/5;overflow:hidden;background:#f5f0e8;">
        <img src="assets/images/finds-PRODUCT_SLUG.jpg" alt="PRODUCT_NAME"
             style="width:100%;height:100%;object-fit:cover;" loading="lazy">
      </a>
      <h3 style="font-family:'Cormorant Garamond',serif;font-weight:400;font-size:1.25rem;margin:1rem 0 .3rem;color:#1a1714;">
        PRODUCT_NAME
      </h3>
      <p style="font-size:.85rem;line-height:1.7;color:#8c8479;margin-bottom:.8rem;">
        PRODUCT_NOTE — two or three honest sentences on why you love it and where you'd use it.
      </p>
      <a href="#AFFILIATE_LINK" target="_blank" rel="sponsored nofollow noopener"
         style="margin-top:auto;font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:#1a1714;border-bottom:1px solid #c4724a;padding-bottom:4px;align-self:flex-start;text-decoration:none;">
        Shop this →
      </a>
    </article>
    <!-- ── end card ── -->

  </div>
</section>
```
> When you're ready, send me your 8–12 picks (name, link, photo, one note each) and I'll populate this and wire it into the page for you.
