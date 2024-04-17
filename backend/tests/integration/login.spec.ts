import { test, expect } from '@playwright/test';

test('teacher can login', async ({ page }) => {
  await page.goto('/');

  const signOutBtn = await page.locator('#sign-out');

  if (await signOutBtn.isVisible()) {
    await signOutBtn.click();
  }

  await page.locator('#login').click();
  await page.locator('#email').fill('playwright@tester.com');
  await page.locator('#password').fill('playwright');
  await page.locator('#login-btn').click();

  await expect(page).toHaveURL('/Courses');
});