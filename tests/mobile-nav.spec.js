const { test, expect } = require('@playwright/test');

async function openMenu(page) {
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Menu' }).click();
  await expect(page.locator('#mainNavLinks')).toHaveClass(/open/);
}

test('mobile nav sits flush to the top edge', async ({ page }) => {
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

  const navMetrics = await page.evaluate(() => {
    const nav = document.getElementById('mainNav');
    const style = getComputedStyle(nav);
    const rect = nav.getBoundingClientRect();
    return {
      top: rect.top,
      backgroundColor: style.backgroundColor,
      position: style.position,
    };
  });

  expect(navMetrics.top).toBe(0);
  expect(navMetrics.backgroundColor).toBe('rgb(250, 248, 244)');
  expect(['fixed', 'sticky']).toContain(navMetrics.position);
});

test('mobile nav remains the topmost layer while scrolling', async ({ page }, testInfo) => {
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.scrollTo(0, document.querySelector('#about').offsetTop + 120));
  await page.waitForTimeout(400);

  const scrollState = await page.evaluate(() => {
    const nav = document.getElementById('mainNav');
    const rect = nav.getBoundingClientRect();
    const topHits = Array.from({ length: 8 }, (_, y) => {
      const el = document.elementFromPoint(window.innerWidth / 2, y);
      return {
        y,
        id: el ? el.id : null,
        className: el ? String(el.className) : null,
        insideNav: !!el && (el === nav || nav.contains(el)),
      };
    });

    return {
      scrollY: window.scrollY,
      navTop: rect.top,
      navBottom: rect.bottom,
      navHeight: rect.height,
      navPosition: getComputedStyle(nav).position,
      navBackground: getComputedStyle(nav).backgroundColor,
      topHits,
    };
  });

  expect(scrollState.scrollY).toBeGreaterThan(500);
  expect(scrollState.navTop).toBe(0);
  expect(scrollState.navHeight).toBeGreaterThan(60);
  expect(scrollState.navPosition).toBe('fixed');
  expect(scrollState.navBackground).toBe('rgb(250, 248, 244)');
  for (const hit of scrollState.topHits) expect(hit.insideNav).toBeTruthy();

  const screenshotPath = testInfo.outputPath('mobile-header-scrolled.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  await testInfo.attach('mobile-header-scrolled', {
    path: screenshotPath,
    contentType: 'image/png',
  });
});

test('open mobile menu stays above the page content after scrolling', async ({ page }, testInfo) => {
  await openMenu(page);

  const layerState = await page.evaluate(() => {
    const nav = document.getElementById('mainNav');
    const menu = document.getElementById('mainNavLinks');
    const rect = menu.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const points = [
      [Math.round(rect.left + rect.width / 2), Math.round(rect.top + 40)],
      [Math.round(rect.left + rect.width / 2), Math.round(rect.top + rect.height / 2)],
      [Math.round(rect.left + rect.width / 2), Math.round(Math.min(rect.bottom - 40, viewportHeight - 40))],
    ];

    return {
      bodyPosition: getComputedStyle(document.body).position,
      navPosition: getComputedStyle(nav).position,
      navZIndex: getComputedStyle(nav).zIndex,
      menuPosition: getComputedStyle(menu).position,
      menuZIndex: getComputedStyle(menu).zIndex,
      menuRect: {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
      },
      topHits: points.map(([x, y]) => {
        const el = document.elementFromPoint(x, y);
        return {
          x,
          y,
          tagName: el ? el.tagName : null,
          id: el ? el.id : null,
          className: el ? String(el.className) : null,
          insideMenu: !!el && (el === menu || menu.contains(el)),
        };
      }),
      scrollY: window.scrollY,
      menuOpen: menu.classList.contains('open'),
      navOpen: nav.classList.contains('menu-open'),
    };
  });

  expect(layerState.menuOpen).toBeTruthy();
  expect(layerState.navOpen).toBeTruthy();
  expect(layerState.bodyPosition).toBe('fixed');
  expect(layerState.menuRect.height).toBeGreaterThan(300);
  expect(layerState.menuRect.bottom).toBeGreaterThanOrEqual(page.viewportSize().height - 2);
  for (const hit of layerState.topHits) expect(hit.insideMenu).toBeTruthy();

  const lockedScrollY = layerState.scrollY;
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(150);
  const scrollAfterWheel = await page.evaluate(() => window.scrollY);
  expect(scrollAfterWheel).toBe(lockedScrollY);

  const screenshotPath = testInfo.outputPath('mobile-menu-open.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  await testInfo.attach('mobile-menu-open', {
    path: screenshotPath,
    contentType: 'image/png',
  });
});
