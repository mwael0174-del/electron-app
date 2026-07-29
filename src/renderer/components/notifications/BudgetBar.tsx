interface BudgetBarProps {
  percent: number
  className?: string
}

export function BudgetBar({ percent, className = '' }: BudgetBarProps) {
  const getColor = (pct: number) => {
    if (pct >= 90) return { fill: 'bg-red-400', text: 'text-red-400' }
    if (pct >= 75) return { fill: 'bg-yellow-400', text: 'text-yellow-400' }
    return { fill: 'bg-green-400', text: 'text-green-400' }
  }

  const { fill, text } = getColor(percent)

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fill}`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <span className={`text-[0.7rem] font-semibold tabular-nums min-w-[36px] ${text}`}>
        {percent}%
      </span>
    </div>
  )
}
