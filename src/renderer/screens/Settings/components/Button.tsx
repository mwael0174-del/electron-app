import { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'default' | 'danger' | 'primary'
  onClick?: () => void
}

const variants = {
  default:
    'border-border text-muted-foreground hover:bg-secondary hover:text-foreground',
  danger:
    'border-destructive/30 text-destructive hover:bg-destructive/10',
  primary:
    'border-primary bg-primary text-primary-foreground hover:bg-primary/90',
}

export function Button({ children, variant = 'default', onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${variants[variant]}`}
    >
      {children}
    </button>
  )
}
