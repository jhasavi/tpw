import { test, expect } from '@playwright/test';

test.describe('Basic E2E Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/The Purple Wing/);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    await expect(page.getByRole('link', { name: 'The Purple Wings' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Learn menu' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Community menu' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Take Assessment page' })).toBeVisible();
  });

  test('page loads without errors', async ({ page }) => {
    const responses: { url: string; status: number }[] = [];

    page.on('response', (response) => {
      responses.push({
        url: response.url(),
        status: response.status(),
      });
    });

    await page.goto('/');

    await page.waitForLoadState('networkidle');

    const failedRequests = responses.filter((r) => r.status >= 400);
    console.log('Failed requests:', failedRequests);

    expect(failedRequests.filter((r) => r.status >= 500)).toHaveLength(0);
  });

  test('courses page loads', async ({ page }) => {
    await page.goto('/courses');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /About The Purple Wings/i })).toBeVisible();
  });
});
