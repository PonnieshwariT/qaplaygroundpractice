import { test, expect } from '@playwright/test';

test('Jira Failure Test', async ({ page }) => {
  await page.goto('https://qaplayground.dev');

  await expect(
    page.locator('#this-element-does-not-exist')
  ).toBeVisible();
});