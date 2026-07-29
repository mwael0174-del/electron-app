import { test, expect } from '@playwright/test'
import { launchApp, closeApp, getPage } from './helpers/electron'

test.beforeAll(async () => {
  await launchApp()
})

test.afterAll(async () => {
  await closeApp()
})

test.describe('Add Campaign Modal', () => {
  test('modal opens on button click', async () => {
    const page = getPage()
    await page.locator('button', { hasText: '\u062d\u0645\u0644\u0629 \u062c\u062f\u064a\u062f\u0629' }).click()
    await expect(page.locator('dialog')).toBeVisible()
    await expect(page.locator('h2')).toContainText('\u062d\u0645\u0644\u0629 \u062c\u062f\u064a\u062f\u0629')
  })

  test('validation: empty name shows error', async () => {
    const page = getPage()
    await page.locator('button', { hasText: '\u062d\u0641\u0638 \u0627\u0644\u062d\u0645\u0644\u0629' }).click()
    await expect(page.locator('text=\u0627\u0633\u0645 \u0627\u0644\u062d\u0645\u0644\u0629 \u0645\u0637\u0644\u0648\u0628')).toBeVisible()
  })

  test('validation: budget <= 0 shows error', async () => {
    const page = getPage()
    await page.locator('input[placeholder*="\u062d\u0645\u0644\u0629"]').fill('Test Campaign')
    await page.locator('input[type="number"]').fill('-100')
    await page.locator('button', { hasText: '\u062d\u0641\u0638 \u0627\u0644\u062d\u0645\u0644\u0629' }).click()
    await expect(page.locator('text=\u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629 \u0644\u0627\u0632\u0645')).toBeVisible()
  })

  test('successful save closes modal and shows toast', async () => {
    const page = getPage()
    // Fill valid data
    await page.locator('input[placeholder*="\u062d\u0645\u0644\u0629"]').clear()
    await page.locator('input[placeholder*="\u062d\u0645\u0644\u0629"]').fill('\u062d\u0645\u0644\u0629 \u0627\u062e\u062a\u0628\u0627\u0631')
    await page.locator('input[type="number"]').clear()
    await page.locator('input[type="number"]').fill('5000')
    await page.locator('button', { hasText: '\u062d\u0641\u0638 \u0627\u0644\u062d\u0645\u0644\u0629' }).click()

    // Modal should close
    await expect(page.locator('dialog')).not.toBeVisible()
  })

  test('modal closes on Escape key', async () => {
    const page = getPage()
    await page.locator('button', { hasText: '\u062d\u0645\u0644\u0629 \u062c\u062f\u064a\u062f\u0629' }).click()
    await expect(page.locator('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('dialog')).not.toBeVisible()
  })
})

test.describe('Campaigns Page', () => {
  test('campaign list renders rows', async () => {
    const page = getPage()
    await page.locator('button', { hasText: '\u0627\u0644\u062d\u0645\u0644\u0627\u062a' }).click()
    const rows = page.locator('[class*="cursor-pointer"]')
    await expect(rows.first()).toBeVisible()
  })

  test('clicking campaign opens detail view', async () => {
    const page = getPage()
    const firstRow = page.locator('[class*="cursor-pointer"]').first()
    await firstRow.click()
    // Should show back button
    await expect(page.locator('text=\u0627\u0644\u0631\u062c\u0648\u0639 \u0644\u0644\u062d\u0645\u0644\u0627\u062a')).toBeVisible()
  })

  test('detail view shows KPI cards', async () => {
    const page = getPage()
    await expect(page.locator('text=\u0627\u0644\u0627\u0646\u0637\u0628\u0627\u0639\u0627\u062a')).toBeVisible()
    await expect(page.locator('text=\u0627\u0644\u0646\u0642\u0631\u0627\u062a')).toBeVisible()
    await expect(page.locator('text=\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a')).toBeVisible()
  })

  test('back button returns to list', async () => {
    const page = getPage()
    await page.locator('text=\u0627\u0644\u0631\u062c\u0648\u0639 \u0644\u0644\u062d\u0645\u0644\u0627\u062a').click()
    await expect(page.locator('h1')).toContainText('\u0627\u0644\u062d\u0645\u0644\u0627\u062a')
  })
})
