type Status = 'active' | 'scheduled' | 'paused'
type Platform = 'facebook' | 'google' | 'tiktok'

interface CampaignRowProps {
  name: string
  platform: Platform
  budget: number
  spent: number
  reach: string
  endDate: string
  status: Status
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  active: { label: '\u0646\u0634\u0637\u0629', className: 'bg-green-500/10 text-green-400' },
  scheduled: { label: '\u0645\u062c\u062f\u0648\u0644\u0629', className: 'bg-blue-500/10 text-blue-400' },
  paused: { label: '\u0645\u062a\u0648\u0642\u0641\u0629', className: 'bg-amber-500/10 text-amber-400' },
}

const platformColors: Record<Platform, string> = {
  facebook: '#1877F2',
  google: '#EA4335',
  tiktok: '#69C9D0',
}

const platformLabels: Record<Platform, string> = {
  facebook: '\u0641\u064a\u0633\u0628\u0648\u0643',
  google: '\u062c\u0648\u062c\u0644',
  tiktok: '\u062a\u064a\u0643 \u062a\u0648\u0643',
}

export function CampaignRow({ name, platform, budget, spent, reach, endDate, status }: CampaignRowProps) {
  const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0
  const s = statusConfig[status]

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 px-5 py-3.5 border-b border-border/50 last:border-b-0 items-center transition-colors hover:bg-secondary/20 cursor-pointer">
      {/* Campaign Name */}
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: platformColors[platform] }}
          />
          <span className="text-[0.7rem] text-muted-foreground">{platformLabels[platform]}</span>
        </div>
      </div>

      {/* Status */}
      <div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold ${s.className}`}>
          {s.label}
        </span>
      </div>

      {/* Budget */}
      <div>
        <p className="text-sm">{budget.toLocaleString()} \u062c</p>
        <div className="h-1 bg-secondary rounded-full mt-1.5 overflow-hidden w-20">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-[0.65rem] text-muted-foreground mt-0.5">{pct}% \u0645\u0646\u0635\u0631\u0641</p>
      </div>

      {/* Reach */}
      <p className="text-sm">{reach}</p>

      {/* End Date */}
      <p className="text-xs text-muted-foreground">{endDate}</p>
    </div>
  )
}
