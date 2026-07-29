import { test, expect } from '@playwright/test'
import { launchApp, closeApp, getPage } from './helpers/electron'

test.beforeAll(async () => {
  await launchApp()
})

test.afterAll(async () => {
  await closeApp()
})

test.describe('Startup', () => {
  test('app window opens without crash', async () => {
    const page = getPage()
    expect(page).toBeTruthy()
  })

  test('no console errors on load', async () => {
    const page = getPage()
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.waitForTimeout(2000)
    expect(errors).toHaveLength(0)
  })

  test('sidebar renders with nav items', async () => {
    const page = getPage()
    const sidebar = page.locator('aside')
    await expect(sidebar).toBeVisible()
    await expect(sidebar.locator('button')).toHaveCount(5) // 5 nav items
  })

  test('dashboard loads as default page', async () => {
    const page = getPage()
    const heading = page.locator('h1')
    await expect(heading).toContainText('\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629')
  })
})

test.describe('Navigation', () => {
  test('navigate to Campaigns', async () => {
    const page = getPage()
    await page.locator('button', { hasText: '\u0627\u0644\u062d\u0645\u0644\u0627\u062a' }).click()
    await expect(page.locator('h1')).toContainText('\u0627\u0644\u062d\u0645\u0644\u0627\u062a')
  })

  test('navigate to Settings', async () => {
    const page = getPage()
    await page.locator('button', { hasText: '\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a' }).click()
    await expect(page.locator('h1')).toContainText('\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a')
  })

  test('navigate back to Dashboard', async () => {
    const page = getPage()
    await page.locator('button', { hasText: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629' }).click()
    await expect(page.locator('h1')).toContainText('\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629')
  })
})
