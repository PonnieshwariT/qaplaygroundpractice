import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class QAPlaygroundPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToIframe() {
    await this.page.goto('https://qaplayground.dev/apps/iframe/');
  }

  async verifyIframeText() {
    const frame = this.page.frameLocator('iframe');
    await frame.locator('text=Your Name').isVisible();
  }
}
