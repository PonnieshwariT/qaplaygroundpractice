import { test } from '@playwright/test';
import { PopupPage } from '../pages/PopupPage';

test('TC_Popup Window Test', async ({ page }) => {
  const popupPage = new PopupPage(page);
  await popupPage.navigate();
  await popupPage.openPopupAndVerify();
});