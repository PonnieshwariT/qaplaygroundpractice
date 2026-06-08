import { Page, expect } from '@playwright/test';

export class OnboardingModalPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://qaplayground.dev/apps/onboarding-modal/');
  }

  async verifyApplicationLaunch() {
    await expect(this.page.locator('text=Application successfully launched! 🚀')).toBeVisible();  
  }

  async completeOnboarding() {
    // Example: click through steps inside the modal
    await this.page.click('text=Next');
    await this.page.click('text=Next');
    await this.page.click('text=Finish');
    await expect(this.page.locator('text=Onboarding Complete')).toBeVisible();
  }

  async closeModal() {
    await this.page.click('text=Close');
    await expect(this.page.locator('.modal-content')).toHaveCount(0);
  }
}
