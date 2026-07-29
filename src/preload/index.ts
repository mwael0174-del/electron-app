import { contextBridge } from 'electron'
import { campaignsApi } from './campaigns-api'

// Expose safe APIs to the renderer
contextBridge.exposeInMainWorld('api', {
  campaigns: campaignsApi,
})

// Type declaration for renderer
declare global {
  interface Window {
    api: {
      campaigns: typeof campaignsApi
    }
  }
}
