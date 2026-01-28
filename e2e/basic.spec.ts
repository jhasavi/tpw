import { test, expect } from '@playwright/test';

test.describe('Basic E2E Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/The Purple Wing/);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Check if main navigation elements are present
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('page loads without errors', async ({ page }) => {
    const responses: any[] = [];
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status()
      });
    });

    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check for failed requests
    const failedRequests = responses.filter(r => r.status >= 400);
    console.log('Failed requests:', failedRequests);
    
    // Assert no critical failures
    expect(failedRequests.filter(r => r.status >= 500)).toHaveLength(0);
  });

  test('curriculum page loads', async ({ page }) => {
    await page.goto('/womens-financial-literacy');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('lesson page loads', async ({ page }) => {
    await page.goto('/womens-financial-literacy/financial-literacy-basics/creating-first-budget');
    await expect(page.locator('h1')).toBeVisible();
  });
});
