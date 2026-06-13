import { test } from '@playwright/test';
import { DownloadPage } from '../pages/DownloadPage';

test('TC_Download File Test', async ({ page }) => {
  const downloadPage = new DownloadPage(page);
  await downloadPage.navigate();
  await downloadPage.downloadFile();
});