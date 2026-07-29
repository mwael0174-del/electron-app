import { useState } from 'react'
import { BudgetBar } from './BudgetBar'

export type NotifVariant = 'danger' | 'warning' | 'success' | 'info'
export type NotifSeverity = 'critical' | 'warning' | 'auto-stop' | null

export interface Notification {
  id: string
  title: string
  description: string
  variant: NotifVariant
  severity: NotifSeverity
  time: string
  budgetPercent?: number
  read: boolean
}

interface NotificationPanelProps {
  notifications: Notification[]
  onMarkAllRead: () => void
  onMarkRead: (id: string) => void
}

const iconStyles: Record<NotifVariant, string> = {
  danger: 'bg-red-500/10 text-red-400',
  warning: 'bg-yellow-500/10 text-yellow-400',
  success: 'bg-green-500/10 text-green-400',
  info: 'bg-primary/10 text-primary',
}

const icons: Record<NotifVariant, string> = {
  danger: '\u26a0',
  warning: '\ud83d\udcb0',
  success: '\u2713',
  info: '\u2139',
}

const severityStyles: Record<string, string> = {
  critical: 'bg-red-500/10 text-red-400',
  warning: 'bg-yellow-500/10 text-yellow-400',
  'auto-stop': 'bg-red-500/10 text-red-400',
}

const severityLabels: Record<string, string> = {
  critical: '\u062d\u0631\u062c',
  warning: '\u062a\u062d\u0630\u064a\u0631',
  'auto-stop': '\u0625\u064a\u0642\u0627\u0641 \u062a\u0644\u0642\u0627\u0626\u064a',
}

export function NotificationPanel({ notifications, onMarkAllRead, onMarkRead }: NotificationPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="w-full max-w-[420px] bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2 text-sm font-semibold">
          \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a
          {unreadCount > 0 && (
            <span className="w-[18px] h-[18px] rounded-full bg-destructive text-destructive-foreground text-[0.6rem] font-bold grid place-items-center">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="text-xs text-primary font-medium hover:underline bg-transparent border-none cursor-pointer"
          >
            \u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0643\u0644 \u0643\u0645\u0642\u0631\u0648\u0621
          </button>
        )}
      </div>

      {/* Items */}
      {notifications.map((notif) => (
        <div
          key={notif.id}
          onClick={() => onMarkRead(notif.id)}
          className={`flex gap-3 px-5 py-4 border-b border-border/50 last:border-b-0 cursor-pointer transition-colors hover:bg-secondary/50 relative ${
            !notif.read ? '' : 'opacity-70'
          }`}
        >
          {!notif.read && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
          )}
          <div className={`w-9 h-9 rounded-[10px] grid place-items-center text-sm flex-shrink-0 ${iconStyles[notif.variant]}`}>
            {icons[notif.variant]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[0.82rem] font-semibold leading-snug" dangerouslySetInnerHTML={{ __html: notif.title }} />
            <p className="text-[0.72rem] text-muted-foreground leading-relaxed mt-0.5">{notif.description}</p>
            {notif.budgetPercent != null && (
              <BudgetBar percent={notif.budgetPercent} className="mt-2" />
            )}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[0.65rem] text-muted-foreground/60">{notif.time}</span>
              {notif.severity && (
                <span className={`text-[0.6rem] font-semibold px-1.5 py-0.5 rounded ${severityStyles[notif.severity]}`}>
                  {severityLabels[notif.severity]}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
