import { _electron as electron, type ElectronApplication, type Page } from 'playwright'
import { resolve } from 'path'

let app: ElectronApplication
let page: Page

export async function launchApp() {
  app = await electron.launch({
    args: [resolve(__dirname, '../../../node_modules/.dev/main/index.mjs')],
    env: { ...process.env, NODE_ENV: 'test' },
  })
  page = await app.firstWindow()
  await page.waitForLoadState('domcontentloaded')
  return { app, page }
}

export async function closeApp() {
  await app?.close()
}

export function getPage() {
  return page
}

export function getApp() {
  return app
}
