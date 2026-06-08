import { test } from '@playwright/test';
import { IframePage } from '../pages/IFramePage';

test('TC_IFrame Test', async ({ page }) => {
  const iframePage = new IframePage(page);
  await iframePage.navigate();
  await iframePage.verifyTextInsideIframe();
});
