import { app } from 'electron'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export interface Campaign {
  id: string
  name: string
  platform: 'meta' | 'tiktok' | 'google'
  budget: number
  spent: number
  startDate: string
  endDate: string
  goal: string
  notes: string
  status: 'active' | 'scheduled' | 'paused' | 'ended'
  createdAt: string
}

const DATA_DIR = join(app.getPath('userData'), 'data')
const CAMPAIGNS_FILE = join(DATA_DIR, 'campaigns.json')

function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function loadCampaigns(): Campaign[] {
  ensureDir()
  if (!existsSync(CAMPAIGNS_FILE)) return []
  try {
    const raw = readFileSync(CAMPAIGNS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveCampaigns(campaigns: Campaign[]): void {
  ensureDir()
  writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2), 'utf-8')
}

export function addCampaign(data: Omit<Campaign, 'id' | 'spent' | 'status' | 'createdAt'>): Campaign {
  const campaigns = loadCampaigns()
  const newCampaign: Campaign = {
    ...data,
    id: crypto.randomUUID(),
    spent: 0,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  }
  campaigns.unshift(newCampaign)
  saveCampaigns(campaigns)
  return newCampaign
}

export function deleteCampaign(id: string): boolean {
  const campaigns = loadCampaigns()
  const filtered = campaigns.filter((c) => c.id !== id)
  if (filtered.length === campaigns.length) return false
  saveCampaigns(filtered)
  return true
}

export function updateCampaign(id: string, updates: Partial<Campaign>): Campaign | null {
  const campaigns = loadCampaigns()
  const index = campaigns.findIndex((c) => c.id === id)
  if (index === -1) return null
  campaigns[index] = { ...campaigns[index], ...updates }
  saveCampaigns(campaigns)
  return campaigns[index]
}
