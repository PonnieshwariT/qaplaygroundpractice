import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['line'], ['html']],   // ✅ Only HTML
  use: {
    baseURL: 'https://qaplayground.dev/',
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on'
  },
  projects: [
    { name: 'chrome', use: { browserName: 'chromium' }, outputDir: 'results/chrome' },
    { name: 'edge', use: { channel: 'msedge' }, outputDir: 'results/edge' }
  ]
});
