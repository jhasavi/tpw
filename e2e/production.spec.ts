import { test, expect } from '@playwright/test';

test.describe('Production readiness smoke', () => {
  test('health endpoint returns JSON', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.status()).toBeLessThan(600);
    const body = await res.json();
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('service', 'the-purple-wings');
  });

  test('ready endpoint is alive', async ({ request }) => {
    const res = await request.get('/api/ready');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ready).toBe(true);
  });

  test('search page loads and accepts query', async ({ page }) => {
    await page.goto('/search?q=newsletter');
    await expect(page.getByRole('heading', { name: /Search The Purple Wings/i })).toBeVisible();
    await expect(page.getByRole('searchbox')).toHaveValue('newsletter');
  });

  test('newsletter subscribe page loads', async ({ page }) => {
    await page.goto('/newsletter/subscribe');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('self-study portal loads', async ({ page }) => {
    await page.goto('/learn');
    await expect(page.getByRole('heading', { name: /Learn finance on your schedule/i })).toBeVisible();
  });

  test('anonymous user can open a lesson without auth redirect', async ({ page }) => {
    await page.goto('/learn/womens-financial-literacy/financial-literacy-basics');
    await expect(page).not.toHaveURL(/\/auth/);
  });

  test('guide page includes FAQ schema', async ({ page }) => {
    await page.goto('/guides/budgeting-for-women');
    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(jsonLd).toContain('FAQPage');
  });
});
