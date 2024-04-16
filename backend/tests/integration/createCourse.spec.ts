import { test, expect } from '@playwright/test';

test('teacher can create course', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const signOutBtn = await page.locator('#sign-out');

  if (await signOutBtn.isVisible()) {
    await signOutBtn.click();
  }

  await page.locator('#login').click();
  await page.locator('#email').fill('playwright@tester.com');
  await page.locator('#password').fill('playwright');
  await page.locator('#login-btn').click();
  await expect(page).toHaveURL('http://localhost:3000/Courses');

  await page.locator('#new-course').click();
  await page.locator('#course-modal input[name="name"]').fill('New course');
  await page.locator('#course-modal textarea[name="description"]').fill('description');
  await page.locator('#course-modal button[type="submit"]').click();

  await expect(page.getByText('New course').first()).toBeVisible();
});