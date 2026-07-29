interface WeeklyChartProps {
  data: number[]
}

const days = ['\u0623\u062d', '\u0625\u062b', '\u062b', '\u0623\u0631', '\u062e', '\u062c', '\u0633']

export function WeeklyChart({ data }: WeeklyChartProps) {
  const max = Math.max(...data)

  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((value, i) => {
        const height = max > 0 ? (value / max) * 100 : 0
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className="w-full rounded-t bg-primary/70 hover:bg-primary transition-colors cursor-pointer min-h-[2px]"
              style={{ height: `${height}%` }}
              title={`${value} \u0646\u0642\u0631\u0629`}
            />
            <span className="text-[0.6rem] text-muted-foreground">{days[i]}</span>
          </div>
        )
      })}
    </div>
  )
}
