import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [
  ['line'],
  ['html'],
  ['./reporter/JiraReporter.ts']
],

  use: {
    baseURL: 'https://qaplayground.dev/',
    headless: true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chrome',
      use: { browserName: 'chromium' },
      outputDir: 'results/chrome'
    },
    {
      name: 'edge',
      use: { channel: 'msedge' },
      outputDir: 'results/edge'
    }
  ]
});