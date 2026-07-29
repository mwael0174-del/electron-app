import { type ReactNode } from 'react'

export type AlertVariant = 'danger' | 'warning' | 'info'

interface AlertAction {
  label: string
  variant?: 'primary' | 'default'
  onClick: () => void
}

interface InlineAlertProps {
  variant: AlertVariant
  icon: string
  title: string
  description: string
  actions?: AlertAction[]
}

const iconStyles: Record<AlertVariant, string> = {
  danger: 'bg-red-500/10 text-red-400',
  warning: 'bg-yellow-500/10 text-yellow-400',
  info: 'bg-primary/10 text-primary',
}

const borderStyles: Record<AlertVariant, string> = {
  danger: 'border-red-500/20',
  warning: 'border-yellow-500/20',
  info: 'border-border',
}

export function InlineAlert({ variant, icon, title, description, actions }: InlineAlertProps) {
  return (
    <div className={`bg-card border rounded-xl p-4 flex gap-3 items-start transition-colors hover:border-border ${borderStyles[variant]}`}>
      <div className={`w-8 h-8 rounded-lg grid place-items-center text-sm flex-shrink-0 ${iconStyles[variant]}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[0.82rem] font-semibold mb-0.5">{title}</p>
        <p className="text-[0.72rem] text-muted-foreground leading-relaxed">{description}</p>
        {actions && actions.length > 0 && (
          <div className="flex gap-2 mt-2.5">
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={`px-3 py-1.5 rounded-lg text-[0.7rem] font-medium transition-colors cursor-pointer ${
                  action.variant === 'primary'
                    ? 'bg-primary text-primary-foreground border border-primary hover:bg-primary/90'
                    : 'border border-border text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
