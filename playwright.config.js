const os = require('node:os');
const { defineConfig, devices } = require('@playwright/test');

const isMacOs13 = process.platform === 'darwin' && os.release().startsWith('22.');

const projects = [
  {
    name: 'iphone-13-chromium',
    use: {
      browserName: 'chromium',
      ...devices['iPhone 13'],
    },
  },
  {
    name: 'pixel-7-chromium',
    use: {
      browserName: 'chromium',
      ...devices['Pixel 7'],
    },
  },
];

if (!isMacOs13 || process.env.CI || process.env.PLAYWRIGHT_FORCE_WEBKIT === '1') {
  projects.push({
    name: 'iphone-13-webkit',
    use: {
      browserName: 'webkit',
      ...devices['iPhone 13'],
    },
  });
}

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects,
  webServer: {
    command: 'python3 -m http.server 4173 --bind 127.0.0.1',
    url: 'http://127.0.0.1:4173/index.html',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
    timeout: 120_000,
  },
});
