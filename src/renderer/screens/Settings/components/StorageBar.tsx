interface StorageBarProps {
  used: number
  total: number
}

export function StorageBar({ used, total }: StorageBarProps) {
  const percentage = Math.min((used / total) * 100, 100)

  return (
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
