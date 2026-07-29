interface UpcomingItem {
  name: string
  date: string
  color: string
}

interface UpcomingListProps {
  items: UpcomingItem[]
}

export function UpcomingList({ items }: UpcomingListProps) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 py-3 border-b border-border/50 last:border-b-0"
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: item.color }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-[0.7rem] text-muted-foreground mt-0.5">{item.date}</p>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-6">
          \u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u062d\u062f\u0627\u062b \u0642\u0627\u062f\u0645\u0629
        </p>
      )}
    </div>
  )
}
