import { ipcRenderer } from 'electron'

export const campaignsApi = {
  getAll: () => ipcRenderer.invoke('campaigns:get-all'),

  save: (data: {
    name: string
    platform: 'meta' | 'tiktok' | 'google'
    budget: number
    startDate: string
    endDate: string
    goal: string
    notes: string
  }) => ipcRenderer.invoke('campaigns:save', data),

  delete: (id: string) => ipcRenderer.invoke('campaigns:delete', id),

  update: (id: string, updates: Record<string, unknown>) =>
    ipcRenderer.invoke('campaigns:update', id, updates),
}
