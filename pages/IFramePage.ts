import { Page } from '@playwright/test';

export class IframePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://qaplayground.dev/apps/iframe/');
  }

  async verifyTextInsideIframe() {
    const frame = this.page.frameLocator('iframe');
    await frame.locator('text=Your Name').isVisible();
  }
}
