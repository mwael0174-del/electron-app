interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  defaultValue?: string
  onChange?: (value: string) => void
}

export function Select({ options, defaultValue, onChange }: SelectProps) {
  return (
    <div className="relative flex-shrink-0">
      <select
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        className="appearance-none min-w-[140px] rounded-lg border border-border bg-secondary px-3.5 py-2 pr-9 text-sm text-foreground cursor-pointer transition-colors hover:border-border/80 focus:outline-none focus:border-primary"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[0.65rem] pointer-events-none">
        \u25BC
      </span>
    </div>
  )
}
