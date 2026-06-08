import { Page } from '@playwright/test';

export class DownloadPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://qaplayground.dev/apps/download/');
  }

  async downloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.getByRole('link', { name: 'Download ⏬' }).click()
    ]);

    // Save file to a path
    const path = await download.path();
    console.log(`File downloaded at: ${path}`);
  }
}