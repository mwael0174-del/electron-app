import { useState, useCallback } from 'react'
import { type ToastData, type ToastVariant } from './Toast'

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback(
    (title: string, description: string, variant: ToastVariant = 'info', duration?: number) => {
      const id = String(++toastId)
      setToasts((prev) => [...prev, { id, title, description, variant, duration }])
      return id
    },
    []
  )

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const budgetAlert = useCallback(
    (campaignName: string, percent: number, spent: number, budget: number) => {
      const variant: ToastVariant = percent >= 90 ? 'danger' : 'warning'
      const title = `${campaignName} \u0648\u0635\u0644\u062a ${percent}%`
      const description = `\u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629: ${budget.toLocaleString()} \u062c \u00b7 \u0627\u0644\u0645\u0646\u0635\u0631\u0641: ${spent.toLocaleString()} \u062c`
      addToast(title, description, variant)
    },
    [addToast]
  )

  return { toasts, addToast, dismissToast, budgetAlert }
}
