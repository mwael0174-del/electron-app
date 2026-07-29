interface MetricCardProps {
  label: string
  value: string
  suffix?: string
  change: string
  trend: 'up' | 'down'
}

export function MetricCard({ label, value, suffix, change, trend }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/30">
      <p className="text-[0.68rem] font-medium text-muted-foreground tracking-wide uppercase mb-2">
        {label}
      </p>
      <p className="text-2xl font-bold leading-none">
        {value}
        {suffix && <span className="text-sm font-normal text-muted-foreground">{suffix}</span>}
      </p>
      <p className={`text-[0.7rem] mt-1.5 flex items-center gap-1 ${
        trend === 'up' ? 'text-green-400' : 'text-red-400'
      }`}>
        {trend === 'up' ? '\u2191' : '\u2193'} {change}
      </p>
    </div>
  )
}
