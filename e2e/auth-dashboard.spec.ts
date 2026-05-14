import { test, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing SUPABASE env variables for E2E tests')
}

const adminSupabase = createClient(supabaseUrl, serviceRoleKey)

test.describe('Auth and Dashboard E2E', () => {
  test.skip(({ browserName }) => browserName === 'webkit', 'WebKit auth cookies are flaky in local Supabase E2E runs')

  test('email login works and dashboard loads without server errors', async ({ page }) => {
    const email = `e2e-login-${Date.now()}@test.thepurplewings.org`
    const password = 'Test1234!'

    const { data: createdUser, error: createError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        test_account: true,
      },
    })

    expect(createError).toBeNull()
    expect(createdUser?.user?.id).toBeTruthy()

    const userId = createdUser!.user!.id

    try {
      const { error: streakError } = await adminSupabase
        .from('learning_streaks')
        .upsert({ user_id: userId, current_streak: 0, longest_streak: 0 }, { onConflict: 'user_id' })

      expect(streakError).toBeNull()

      const responses: Array<{ url: string; status: number }> = []
      page.on('response', response => {
        const status = response.status()
        if (status >= 400) {
          responses.push({ url: response.url(), status })
        }
      })

      await page.goto('/auth/login')
      await expect(page.getByLabel('Email address')).toBeVisible()
      await expect(page.getByLabel('Password')).toBeVisible()

      await page.fill('input[type="email"]', email)
      await page.fill('input[type="password"]', password)
      await page.click('button[type="submit"]')

      await page.waitForURL('**/dashboard', { timeout: 20000 })
      await page.waitForLoadState('networkidle')

      await expect(page.locator('text=Welcome Back')).toBeVisible()

      const serverFailures = responses.filter(r => r.status >= 500)
      expect(serverFailures).toEqual([])
    } finally {
      const { error: deleteError } = await adminSupabase.auth.admin.deleteUser(userId)
      expect(deleteError).toBeNull()
    }
  })

  test('onboarding wizard displays and completes after login', async ({ page }) => {
    const email = `e2e-wizard-${Date.now()}@test.thepurplewings.org`
    const password = 'Test1234!'

    const { data: createdUser, error: createError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        test_account: true,
      },
    })

    expect(createError).toBeNull()
    expect(createdUser?.user?.id).toBeTruthy()

    const userId = createdUser!.user!.id

    try {
      await adminSupabase.from('onboarding_progress').delete().eq('user_id', userId)

      const responses: Array<{ url: string; status: number }> = []
      page.on('response', response => {
        const status = response.status()
        if (status >= 400) {
          responses.push({ url: response.url(), status })
        }
      })

      await page.goto('/auth/login')
      await page.fill('input[type="email"]', email)
      await page.fill('input[type="password"]', password)
      await page.click('button[type="submit"]')

      await page.waitForURL('**/dashboard', { timeout: 20000 })
      await page.waitForLoadState('networkidle')

      await expect(page.getByRole('heading', { name: /welcome to the purple wings/i })).toBeVisible()
      await page.click('button:has-text("Continue →")')

      await expect(page.getByRole('heading', { name: /your financial knowledge level/i })).toBeVisible()
      await page.click('button:has-text("Beginner")')
      await page.click('button:has-text("Continue →")')

      await expect(page.getByRole('heading', { name: /topics you want to learn/i })).toBeVisible()
      await page.click('button:has-text("Budgeting & Money Management")')
      await page.click('button:has-text("Build an emergency fund")')
      await page.click('button:has-text("In My 40s")')
      await page.click('button:has-text("Continue →")')

      await expect(page.getByRole('heading', { name: /your personalized learning path/i })).toBeVisible()
      await page.click('button:has-text("Continue →")')
      await expect(page.locator('text=Step 1 of 5')).toHaveCount(0)

      const serverFailures = responses.filter(r => r.status >= 500)
      expect(serverFailures).toEqual([])
    } finally {
      const { error: deleteError } = await adminSupabase.auth.admin.deleteUser(userId)
      expect(deleteError).toBeNull()
    }
  })

  test('auth callback route redirects safely when no OAuth code is present', async ({ page }) => {
    await page.goto('/auth/callback?returnTo=/auth/login')
    await page.waitForURL('**/auth/login', { timeout: 15000 })
    await expect(page.getByRole('heading', { name: /welcome back|sign in/i })).toBeVisible()
  })
})
