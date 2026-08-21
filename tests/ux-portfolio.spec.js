const { test, expect } = require('@playwright/test');

test.describe('Standalone Open Storey founder profile', () => {
  test('presents Swatika exclusively as an interior designer and founder', async ({ page }) => {
    await page.goto('/swatika.html', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Bay Area Interior Designer/i);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Swatika Upendran');
    await expect(page.locator('main')).toContainText(/founder of Open Storey/i);
    await expect(page.locator('main')).toContainText(/San Francisco Bay Area/i);

    const publicCopy = await page.locator('body').innerText();
    expect(publicCopy).not.toMatch(/\b(product design|UX|apps?|mobile apps?|dashboards?|AI product|hiring managers?|prototypes?)\b/i);
  });

  test('is indexable but has no internal route back into the public site', async ({ page }) => {
    await page.goto('/swatika.html', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://openstorey.design/swatika.html',
    );

    const hrefs = await page.locator('a[href]').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')),
    );
    expect(hrefs.every((href) =>
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('https://calendly.com/') ||
      (
        href.startsWith('https://') &&
        !href.startsWith('https://openstorey.design')
      )
    )).toBe(true);
    expect(hrefs.some((href) => /index\.html|openstorey\.design\/$/i.test(href))).toBe(false);
  });

  test('uses the real consultation and studio email destinations', async ({ page }) => {
    await page.goto('/swatika.html', { waitUntil: 'domcontentloaded' });

    const bookingLinks = page.locator('a[href="https://calendly.com/openstorey-design/30min"]');
    await expect(bookingLinks).toHaveCount(3);
    await expect(bookingLinks.first()).toContainText(/15-min call/i);
    await expect(page.locator('a[href="mailto:Swatika@openstorey.design"]')).toHaveCount(3);
  });

  test('covers the studio story, services, experience and global availability', async ({ page }) => {
    await page.goto('/swatika.html', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('.journey')).toContainText('Chennai');
    await expect(page.locator('.journey')).toContainText('Barcelona');
    await expect(page.locator('.journey')).toContainText('San Francisco');
    await expect(page.locator('.services')).toContainText('Residential Interiors');
    await expect(page.locator('.services')).toContainText('Retail & Hospitality');
    await expect(page.locator('.services')).toContainText('Vastu Consultation');
    await expect(page.locator('.experience')).toContainText('Keha Casa Flagship Store');
    await expect(page.locator('main')).toContainText(/internationally|beyond/i);
  });

  test('fits the small viewport without horizontal overflow', async ({ page }) => {
    await page.goto('/swatika.html', { waitUntil: 'domcontentloaded' });

    const horizontalScroll = await page.evaluate(async () => {
      window.scrollTo(9999, 0);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const x = window.scrollX;
      window.scrollTo(0, 0);
      return x;
    });
    expect(horizontalScroll).toBe(0);
    await expect(page.locator('.studio-header .book-link')).toBeVisible();
    await expect(page.locator('.hero-portrait')).toBeVisible();
  });
});
