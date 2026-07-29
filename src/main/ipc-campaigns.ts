import { ipcMain } from 'electron'
import { loadCampaigns, addCampaign, deleteCampaign, updateCampaign } from './campaigns-store'

export function registerCampaignHandlers() {
  // Get all campaigns
  ipcMain.handle('campaigns:get-all', () => {
    return loadCampaigns()
  })

  // Save new campaign (with validation)
  ipcMain.handle('campaigns:save', (_event, data) => {
    // Validate
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid campaign data')
    }
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      throw new Error('Campaign name is required')
    }
    if (typeof data.budget !== 'number' || data.budget < 0) {
      throw new Error('Budget must be a positive number')
    }
    if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
      throw new Error('End date must be after start date')
    }
    if (!['meta', 'tiktok', 'google'].includes(data.platform)) {
      throw new Error('Invalid platform')
    }

    return addCampaign({
      name: data.name.trim(),
      platform: data.platform,
      budget: data.budget,
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      goal: data.goal || 'awareness',
      notes: data.notes || '',
    })
  })

  // Delete campaign
  ipcMain.handle('campaigns:delete', (_event, id: string) => {
    if (!id || typeof id !== 'string') {
      throw new Error('Campaign ID is required')
    }
    return deleteCampaign(id)
  })

  // Update campaign
  ipcMain.handle('campaigns:update', (_event, id: string, updates: Record<string, unknown>) => {
    if (!id || typeof id !== 'string') {
      throw new Error('Campaign ID is required')
    }
    if (!updates || typeof updates !== 'object') {
      throw new Error('Updates object is required')
    }
    return updateCampaign(id, updates as any)
  })
}
