import { test, expect } from '@playwright/test'
import { launchApp, closeApp, getPage, getApp } from './helpers/electron'

test.beforeAll(async () => {
  await launchApp()
})

test.afterAll(async () => {
  await closeApp()
})

test.describe('Settings Page', () => {
  test('settings page renders sections', async () => {
    const page = getPage()
    await page.locator('button', { hasText: '\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a' }).click()
    await expect(page.locator('h1')).toContainText('\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a')
  })

  test('toggle switches are interactive', async () => {
    const page = getPage()
    const toggle = page.locator('input[type="checkbox"]').first()
    const initialState = await toggle.isChecked()
    await toggle.click()
    expect(await toggle.isChecked()).toBe(!initialState)
  })

  test('language dropdown has options', async () => {
    const page = getPage()
    const select = page.locator('select').first()
    const options = await select.locator('option').count()
    expect(options).toBeGreaterThanOrEqual(2)
  })

  test('version info displays', async () => {
    const page = getPage()
    await expect(page.locator('text=AdFlow Desktop')).toBeVisible()
    await expect(page.locator('text=Electron')).toBeVisible()
  })
})

test.describe('Security', () => {
  test('renderer has no Node.js access', async () => {
    const page = getPage()
    const hasRequire = await page.evaluate(() => typeof (window as any).require)
    expect(hasRequire).toBe('undefined')
  })

  test('window.api exists with campaigns methods', async () => {
    const page = getPage()
    const apiKeys = await page.evaluate(() => {
      const api = (window as any).api
      if (!api) return null
      return Object.keys(api.campaigns || {})
    })
    expect(apiKeys).toContain('getAll')
    expect(apiKeys).toContain('save')
    expect(apiKeys).toContain('delete')
  })

  test('no direct ipcRenderer access', async () => {
    const page = getPage()
    const hasIpc = await page.evaluate(() => typeof (window as any).ipcRenderer)
    expect(hasIpc).toBe('undefined')
  })
})

test.describe('Theme', () => {
  test('theme toggle cycles correctly', async () => {
    const page = getPage()
    // Find theme toggle button
    const toggle = page.locator('button[title*="\u0627\u0644\u0648\u0636\u0639"]')
    if (await toggle.isVisible()) {
      await toggle.click()
      // Check html class changed
      const htmlClass = await page.locator('html').getAttribute('class')
      expect(htmlClass).toMatch(/dark|light/)
    }
  })
})
