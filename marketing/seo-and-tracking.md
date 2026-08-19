# SEO & Tracking

## ✅ Already live
- **Meta description, keywords, author, robots, geo** tags — the site had none.
- **Open Graph + Twitter/X cards** + a correctly-sized **1200×630 share image** (`assets/images/og-image.jpg`) → links now preview properly on IG, LinkedIn, WhatsApp, iMessage, X.
- **JSON-LD structured data** (`ProfessionalService` + `Person` + `Service` nodes + a free-consultation `Offer` + `ReserveAction` → Calendly) so Google can show rich results.
- **Services section and Bay Area titles** for residential, space planning, retail/hospitality, and Vastu-intent searches.
- **Descriptive portfolio alt text** for image search and accessibility.
- **`sitemap.xml`** updated (home, UX portfolio, disclosure) — `robots.txt` already points to it.
- **Canonical** tag was already present and is correct.

- **Search Console verification** is live; the sitemap is accepted with 3 discovered pages and the homepage has been submitted for a priority recrawl.

---

## Your setup tasks (need your Google login)

### 1. Google Business Profile — finish the owner step
The listing is staged as **Open Storey**, category **Interior designer**, service area **San Francisco Bay Area**, website `openstorey.design`. Finish Google's terms/creation step, add a public phone only if you want one shown, upload project photos, and complete the required owner verification. Ask happy clients for reviews here.

### 2. Google Search Console
The URL-prefix property `https://openstorey.design/` is verified and `https://openstorey.design/sitemap.xml` is submitted successfully. Google reports the homepage as indexed and a recrawl has been requested. (Optional: repeat for Bing Webmaster Tools after signing in.)

### 3. Google Analytics 4 (so campaigns are measurable)
Create a GA4 property → copy your Measurement ID (`G-XXXXXXX`) → paste this in `index.html` just before `</head>`, then send me the ID (or I'll add it):
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```
*Privacy-friendly alternative:* Plausible or Fathom (one script tag, no cookie banner needed). Your call — GA4 is free and most powerful.

---

## UTM scheme — so you know which campaign books calls
Add these parameters to **every link you post**. Convention: lowercase, no spaces.

```
?utm_source=<where>&utm_medium=<type>&utm_campaign=<which campaign>
```
- **source:** `instagram` · `pinterest` · `linkedin` · `houzz` · `upwork`
- **medium:** `bio` · `post` · `story` · `reel` · `pin` · `dm`
- **campaign:** `launch` · `portfolio` · `twoworlds` · `vastu` · `curatedfinds`

### Ready-to-use links (copy/paste)
| Use | Link |
|-----|------|
| IG bio | `https://openstorey.design/?utm_source=instagram&utm_medium=bio` |
| IG launch post | `https://openstorey.design/?utm_source=instagram&utm_medium=post&utm_campaign=launch` |
| IG Vastu reel | `https://openstorey.design/?utm_source=instagram&utm_medium=reel&utm_campaign=vastu` |
| Pinterest pin | `https://openstorey.design/?utm_source=pinterest&utm_medium=pin&utm_campaign=portfolio` |
| LinkedIn page | `https://openstorey.design/?utm_source=linkedin&utm_medium=page` |
| LinkedIn launch | `https://openstorey.design/?utm_source=linkedin&utm_medium=post&utm_campaign=launch` |
| Houzz profile | `https://openstorey.design/?utm_source=houzz&utm_medium=profile` |
| Upwork profile | `https://openstorey.design/?utm_source=upwork&utm_medium=profile` |

> Tip: use a free link shortener (Bitly) for the long ones in captions, or just put the clean homepage in bios and the UTM links where the platform hides the raw URL.

### Tracking the actual call (the conversion)
Calendly passes UTM parameters through if they're on the page when the badge is clicked, and its dashboard shows the source. For sharper attribution later, you can also fire a GA4 event on the Calendly booking — ask me once GA4 is in.

---

## Keyword targets (work these into page copy + pins + GBP over time)
Primary: **Bay Area interior designer**, **San Francisco interior design studio**, **residential interior designer San Francisco**.
Niche/differentiated (less competition, high fit): **Vastu interior designer Bay Area**, **South Asian interior design California**, **Indian-inspired interior design San Francisco**, **luxury residential interior designer Bay Area**.

---

<a id="footer-social-links"></a>
## When you send me your real profile URLs — the footer edit
The footer currently uses working booking/email links rather than invented social profiles. Once you have real handles, replace the footer `.footer-social` blocks in `index.html`, e.g.:
```html
<div class="footer-social">
  <a href="https://instagram.com/openstorey.design" target="_blank" rel="noopener">Instagram</a>
  <a href="https://pinterest.com/openstorey.design" target="_blank" rel="noopener">Pinterest</a>
  <a href="https://www.linkedin.com/company/open-storey" target="_blank" rel="noopener">LinkedIn</a>
  <a href="https://www.houzz.com/pro/openstorey" target="_blank" rel="noopener">Houzz</a>
  <a href="disclosure.html">Disclosure</a>
</div>
```
(There are two footers — home and Curated Finds — I'll update both.)
