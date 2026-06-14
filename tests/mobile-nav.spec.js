const { test, expect } = require('@playwright/test');

// Regression coverage for the live static site (index.html):
//  - "UX Portfolio" removed from the main nav (still linked from About)
//  - mobile menu is fully opaque and pins the close icon to the top
//  - the "free 15-min call" CTA appears inside the mobile menu
//  - SEO / social-share meta is present
// Runs on the mobile device projects defined in playwright.config.js.

test.describe('Open Storey — navigation, mobile menu & SEO', () => {
  test('main nav drops UX Portfolio but keeps the core pages', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const labels = await page.$$eval('#mainNavLinks li a', (els) =>
      els.map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
    );
    expect(labels).toEqual(
      expect.arrayContaining(['Home', 'About', 'Portfolio', 'Curated Finds', 'Contact']),
    );
    expect(labels.some((l) => /UX Portfolio/i.test(l))).toBe(false);
  });

  test('About section keeps a single link to the UX portfolio', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const ux = page.locator('section#about a[href="swatika-ux.html"]');
    await expect(ux).toHaveCount(1);
    await expect(ux).toContainText(/UX design portfolio/i);
  });

  test('mobile menu is opaque and pins the close icon to the top', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#hamburger').click();

    const menu = page.locator('#mainNavLinks');
    await expect(menu).toHaveClass(/open/);

    // Fully opaque cream panel (var(--warm) === #FAF8F4), not see-through.
    const bg = await menu.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(250, 248, 244)');

    // Panel covers the bulk of the viewport height (no content peeking through).
    const box = await menu.boundingBox();
    const vh = page.viewportSize().height;
    expect(box.height).toBeGreaterThan(vh * 0.6);

    // The close (✕) icon stays in the top bar — regression guard against the
    // old bug where align-items:center floated it into the middle of the list.
    const hb = await page.locator('#hamburger').boundingBox();
    expect(hb.y).toBeLessThan(120);
  });

  test('mobile menu surfaces the free-call CTA', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#hamburger').click();
    const cta = page.locator('.nav-cta-mobile a');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveText(/free 15-min call/i);
  });

  test('exposes SEO and social-share meta for campaign links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /interior design/i,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /og-image\.jpg$/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    // Structured data parses and exposes the studio + free consultation offer.
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    const graph = JSON.parse(ld)['@graph'];
    expect(graph.map((n) => n['@type'])).toEqual(
      expect.arrayContaining(['ProfessionalService', 'Person']),
    );
  });
});
