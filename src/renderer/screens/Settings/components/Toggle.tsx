interface ToggleProps {
  checked: boolean
  onChange: (value: boolean) => void
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <label className="relative inline-flex w-11 h-6 cursor-pointer flex-shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <span className="absolute inset-0 rounded-full bg-secondary transition-colors peer-checked:bg-primary" />
      <span className="absolute top-[3px] right-[3px] w-[18px] h-[18px] rounded-full bg-muted-foreground transition-all peer-checked:bg-white peer-checked:right-[calc(100%-21px)]" />
    </label>
  )
}
