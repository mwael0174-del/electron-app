import { useEffect, useState } from 'react'

export type ToastVariant = 'danger' | 'warning' | 'success' | 'info'

export interface ToastData {
  id: string
  title: string
  description: string
  variant: ToastVariant
  duration?: number
}

interface ToastProps {
  toast: ToastData
  onDismiss: (id: string) => void
}

const icons: Record<ToastVariant, string> = {
  danger: '\u26a0',
  warning: '\ud83d\udcb0',
  success: '\u2713',
  info: '\u2139',
}

const iconStyles: Record<ToastVariant, string> = {
  danger: 'bg-red-500/10 text-red-400',
  warning: 'bg-yellow-500/10 text-yellow-400',
  success: 'bg-green-500/10 text-green-400',
  info: 'bg-primary/10 text-primary',
}

const progressColors: Record<ToastVariant, string> = {
  danger: 'bg-red-400',
  warning: 'bg-yellow-400',
  success: 'bg-green-400',
  info: 'bg-primary',
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const duration = toast.duration ?? 5000

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), duration)
    return () => clearTimeout(timer)
  }, [toast.id, duration, onDismiss])

  return (
    <div className="bg-card border border-border rounded-xl p-3.5 flex gap-3 items-start shadow-2xl animate-in slide-in-from-left duration-300">
      <div className={`w-8 h-8 rounded-lg grid place-items-center text-sm flex-shrink-0 ${iconStyles[toast.variant]}`}>
        {icons[toast.variant]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[0.78rem] font-semibold">{toast.title}</p>
        <p className="text-[0.7rem] text-muted-foreground leading-relaxed">{toast.description}</p>
        <div className="h-[3px] bg-secondary rounded-full mt-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full ${progressColors[toast.variant]}`}
            style={{ animation: `shrink ${duration}ms linear forwards` }}
          />
        </div>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="w-5 h-5 rounded grid place-items-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-xs flex-shrink-0"
      >
        \u2715
      </button>
    </div>
  )
}
