import { Page } from '@playwright/test';

export class PopupPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://qaplayground.dev/apps/popup/');
  }

  async openPopupAndVerify() {
    // Wait for new tab to open
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.getByRole('link', { name: 'Open' }).click()
    ]);

    await newPage.waitForLoadState();
    await newPage.locator('text=Submit').isVisible();
    await newPage.getByRole('button', { name: 'Submit' }).click();
  }
}