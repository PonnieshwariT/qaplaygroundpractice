import { test } from '@playwright/test';
import { OnboardingModalPage } from '../pages/OnboardingModalPage';

test('TC_Onboarding Modal Test', async ({ page }) => {
  const modalPage = new OnboardingModalPage(page);

  await modalPage.navigate();
  await modalPage.verifyApplicationLaunch();
});
