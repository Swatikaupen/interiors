const { test, expect } = require('@playwright/test');

test.describe('Swatika Product / UX portfolio prototype', () => {
  test('mode switch updates the portfolio thesis', async ({ page }) => {
    await page.goto('/swatika-ux.html', { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { name: /I design the app/i })).toBeVisible();
    await page.locator('[data-mode-target="space"]').click();

    await expect(page.locator('body')).toHaveAttribute('data-mode', 'space');
    await expect(page.locator('#modeTitle')).toContainText('Spatial design is a UX credential');
  });

  test('studio navigator opens project-specific hiring-manager framing', async ({ page }) => {
    await page.goto('/swatika-ux.html', { waitUntil: 'domcontentloaded' });

    await page.locator('[data-case="nourish"]').click();

    await expect(page.locator('#caseKicker')).toContainText('AI Product Design');
    await expect(page.locator('#caseTitle')).toContainText('Nourish care companion');
    await expect(page.locator('#caseDetails')).toContainText('Swatika understands AI as an interaction model');
  });

  test('companion and mobile menu are interactive', async ({ page }) => {
    await page.goto('/swatika-ux.html', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Open portfolio menu' }).click();
    await expect(page.locator('#portfolioNavLinks')).toHaveClass(/open/);
    await expect(page.locator('#portfolioNavLinks a[href="#impact"]')).toBeVisible();

    await page.getByRole('link', { name: 'Companion' }).click();
    await expect(page.locator('#portfolioNavLinks')).not.toHaveClass(/open/);

    await page.locator('[data-question="How does spatial design transfer to UX?"]').click();
    await expect(page.locator('#chatOutput')).toContainText('Spatial to UX');
  });

  test('milestone two workbench and evidence filters are interactive', async ({ page }) => {
    await page.goto('/swatika-ux.html', { waitUntil: 'domcontentloaded' });

    await page.locator('[data-detail-case="openstorey"]').click();
    await expect(page.locator('#detailStatus')).toContainText('Verified locally');
    await expect(page.locator('#detailCaseTitle')).toContainText('Open Storey service and brand system');
    await expect(page.locator('#detailCaseBody')).toContainText('Private portfolio password flow');

    await page.locator('[data-evidence-filter="needs-source"]').click();
    await expect(page.locator('[data-evidence-type="verified"]').first()).toBeHidden();
    await expect(page.locator('[data-evidence-type="needs-source"]').first()).toBeVisible();
  });
});
