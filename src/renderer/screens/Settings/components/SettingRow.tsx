interface SettingRowProps {
  title: string
  description: string
  children: React.ReactNode
}

export function SettingRow({ title, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4 gap-4 border-b border-border/50 last:border-b-0 transition-colors hover:bg-secondary/50">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      </div>
      {children}
    </div>
  )
}
