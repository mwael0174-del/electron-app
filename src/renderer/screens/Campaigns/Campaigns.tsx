import { useState } from 'react'
import { Button } from '../Settings/components/Button'
import { BudgetBar } from '../../components/notifications/BudgetBar'

// Types
type Platform = 'meta' | 'tiktok' | 'google'
type Status = 'active' | 'scheduled' | 'paused' | 'ended'
type TimeRange = '7d' | '30d' | '90d'

interface Campaign {
  id: string
  name: string
  platform: Platform
  status: Status
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  dailySpend: number[]
  startDate: string
  endDate: string
}

// Mock data
const campaigns: Campaign[] = [
  {
    id: '1', name: '\u062d\u0645\u0644\u0629 \u0635\u064a\u0641 2026', platform: 'meta', status: 'active',
    budget: 8000, spent: 5400, impressions: 142000, clicks: 4820,
    conversions: 156, ctr: 3.4, cpc: 1.12,
    dailySpend: [180, 220, 195, 240, 210, 260, 230, 245, 200, 190, 270, 250, 235, 220],
    startDate: '2026-06-15', endDate: '2026-07-30',
  },
  {
    id: '2', name: '\u0625\u0639\u0644\u0627\u0646\u0627\u062a \u062c\u0648\u062c\u0644 - \u0631\u0645\u0636\u0627\u0646', platform: 'google', status: 'active',
    budget: 12000, spent: 9800, impressions: 310000, clicks: 12400,
    conversions: 430, ctr: 4.0, cpc: 0.79,
    dailySpend: [320, 350, 310, 380, 400, 360, 390, 410, 370, 340, 420, 380, 350, 330],
    startDate: '2026-06-01', endDate: '2026-08-15',
  },
  {
    id: '3', name: '\u062a\u064a\u0643 \u062a\u0648\u0643 - \u0645\u0646\u062a\u062c \u062c\u062f\u064a\u062f', platform: 'tiktok', status: 'scheduled',
    budget: 5500, spent: 0, impressions: 0, clicks: 0,
    conversions: 0, ctr: 0, cpc: 0,
    dailySpend: [],
    startDate: '2026-08-01', endDate: '2026-08-20',
  },
  {
    id: '4', name: '\u062d\u0645\u0644\u0629 Brand Awareness', platform: 'meta', status: 'active',
    budget: 3000, spent: 1800, impressions: 67000, clicks: 2010,
    conversions: 45, ctr: 3.0, cpc: 0.90,
    dailySpend: [120, 140, 130, 150, 145, 160, 135, 140, 150, 130, 155, 145, 140, 130],
    startDate: '2026-07-01', endDate: '2026-08-20',
  },
  {
    id: '5', name: 'Retargeting Q3', platform: 'google', status: 'paused',
    budget: 4200, spent: 2100, impressions: 89000, clicks: 3560,
    conversions: 89, ctr: 4.0, cpc: 0.59,
    dailySpend: [150, 160, 140, 170, 155, 165, 145, 150, 160, 140],
    startDate: '2026-07-10', endDate: '2026-09-01',
  },
]

const platformMeta: Record<Platform, { label: string; color: string; bg: string }> = {
  meta: { label: 'Meta', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  tiktok: { label: 'TikTok', color: 'text-neutral-300', bg: 'bg-neutral-500/10' },
  google: { label: 'Google', color: 'text-red-400', bg: 'bg-red-500/10' },
}

const statusMeta: Record<Status, { label: string; cls: string }> = {
  active: { label: '\u0646\u0634\u0637\u0629', cls: 'bg-green-500/10 text-green-400' },
  scheduled: { label: '\u0645\u062c\u062f\u0648\u0644\u0629', cls: 'bg-blue-500/10 text-blue-400' },
  paused: { label: '\u0645\u062a\u0648\u0642\u0641\u0629', cls: 'bg-yellow-500/10 text-yellow-400' },
  ended: { label: '\u0627\u0646\u062a\u0647\u062a', cls: 'bg-secondary text-muted-foreground' },
}

export function Campaigns() {
  const [selected, setSelected] = useState<Campaign | null>(null)
  const [timeRange, setTimeRange] = useState<TimeRange>('30d')

  if (selected) {
    return <CampaignDetail campaign={selected} onBack={() => setSelected(null)} timeRange={timeRange} setTimeRange={setTimeRange} />
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">\u0627\u0644\u062d\u0645\u0644\u0627\u062a</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{campaigns.length} \u062d\u0645\u0644\u0629 \u00b7 {campaigns.filter(c => c.status === 'active').length} \u0646\u0634\u0637\u0629</p>
        </div>
        <Button variant="primary">+ \u062d\u0645\u0644\u0629 \u062c\u062f\u064a\u062f\u0629</Button>
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard label="\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0625\u0646\u0641\u0627\u0642" value={`${(campaigns.reduce((s, c) => s + c.spent, 0) / 1000).toFixed(1)}\u0643`} suffix=" \u062c" />
        <StatCard label="\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0646\u0642\u0631\u0627\u062a" value={campaigns.reduce((s, c) => s + c.clicks, 0).toLocaleString()} />
        <StatCard label="\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a" value={campaigns.reduce((s, c) => s + c.conversions, 0).toLocaleString()} />
        <StatCard label="\u0645\u062a\u0648\u0633\u0637 CTR" value={`${(campaigns.filter(c => c.ctr > 0).reduce((s, c) => s + c.ctr, 0) / campaigns.filter(c => c.ctr > 0).length).toFixed(1)}`} suffix="%" />
      </div>

      {/* Campaign List */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {campaigns.map((camp) => {
          const pct = camp.budget > 0 ? Math.round((camp.spent / camp.budget) * 100) : 0
          const plat = platformMeta[camp.platform]
          const stat = statusMeta[camp.status]
          return (
            <div
              key={camp.id}
              onClick={() => setSelected(camp)}
              className="flex items-center gap-4 px-5 py-4 border-b border-border/50 last:border-b-0 cursor-pointer transition-colors hover:bg-secondary/40"
            >
              {/* Platform badge */}
              <div className={`w-9 h-9 rounded-lg grid place-items-center text-sm font-bold flex-shrink-0 ${plat.bg} ${plat.color}`}>
                {camp.platform === 'meta' ? 'f' : camp.platform === 'tiktok' ? 'T' : 'G'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold truncate">{camp.name}</p>
                  <span className={`text-[0.65rem] font-medium px-2 py-0.5 rounded-md ${stat.cls}`}>{stat.label}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {plat.label} \u00b7 {camp.startDate} \u2192 {camp.endDate}
                </p>
              </div>

              {/* Budget */}
              <div className="w-32">
                <BudgetBar percent={pct} />
                <p className="text-[0.68rem] text-muted-foreground mt-1">
                  {camp.spent.toLocaleString()} / {camp.budget.toLocaleString()} \u062c
                </p>
              </div>

              {/* Stats */}
              <div className="text-left w-20">
                <p className="text-sm font-semibold tabular-nums">{camp.clicks.toLocaleString()}</p>
                <p className="text-[0.68rem] text-muted-foreground">\u0646\u0642\u0631\u0629</p>
              </div>
              <div className="text-left w-16">
                <p className="text-sm font-semibold tabular-nums">{camp.ctr}%</p>
                <p className="text-[0.68rem] text-muted-foreground">CTR</p>
              </div>

              {/* Arrow */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/40 flex-shrink-0 rotate-180">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ===== DETAIL VIEW =====
function CampaignDetail({
  campaign: c,
  onBack,
  timeRange,
  setTimeRange,
}: {
  campaign: Campaign
  onBack: () => void
  timeRange: TimeRange
  setTimeRange: (t: TimeRange) => void
}) {
  const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0
  const plat = platformMeta[c.platform]
  const stat = statusMeta[c.status]
  const maxSpend = Math.max(...c.dailySpend, 1)

  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* Back + Title */}
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        \u0627\u0644\u0631\u062c\u0648\u0639 \u0644\u0644\u062d\u0645\u0644\u0627\u062a
      </button>

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl grid place-items-center text-base font-bold ${plat.bg} ${plat.color}`}>
            {c.platform === 'meta' ? 'f' : c.platform === 'tiktok' ? 'T' : 'G'}
          </div>
          <div>
            <h1 className="text-lg font-bold">{c.name}</h1>
            <p className="text-xs text-muted-foreground">{plat.label} \u00b7 {c.startDate} \u2192 {c.endDate}</p>
          </div>
          <span className={`text-[0.68rem] font-medium px-2.5 py-1 rounded-md mr-2 ${stat.cls}`}>{stat.label}</span>
        </div>
        <div className="flex gap-2">
          {c.status === 'active' && <Button variant="danger">\u0625\u064a\u0642\u0627\u0641</Button>}
          {c.status === 'paused' && <Button variant="primary">\u0627\u0633\u062a\u0626\u0646\u0627\u0641</Button>}
          <Button>\u062a\u0639\u062f\u064a\u0644</Button>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        <KPICard label="\u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629" value={`${c.budget.toLocaleString()} \u062c`} sub={`${pct}% \u0645\u0646\u0635\u0631\u0641`} />
        <KPICard label="\u0627\u0644\u0627\u0646\u0637\u0628\u0627\u0639\u0627\u062a" value={c.impressions.toLocaleString()} />
        <KPICard label="\u0627\u0644\u0646\u0642\u0631\u0627\u062a" value={c.clicks.toLocaleString()} sub={`CTR ${c.ctr}%`} />
        <KPICard label="\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a" value={String(c.conversions)} sub={`CPC ${c.cpc} \u062c`} />
        <KPICard label="\u0627\u0644\u0645\u0646\u0635\u0631\u0641" value={`${c.spent.toLocaleString()} \u062c`} sub={`\u0645\u062a\u0628\u0642\u064a ${(c.budget - c.spent).toLocaleString()} \u062c`} />
      </div>

      {/* Budget Progress */}
      <div className="rounded-xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">\u0627\u0633\u062a\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629</h3>
          <span className="text-xs text-muted-foreground">{c.spent.toLocaleString()} / {c.budget.toLocaleString()} \u062c.\u0645</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${pct >= 90 ? 'bg-red-400' : pct >= 75 ? 'bg-yellow-400' : 'bg-primary'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[0.68rem] text-muted-foreground">0</span>
          <span className="text-[0.68rem] text-muted-foreground">{c.budget.toLocaleString()} \u062c</span>
        </div>
      </div>

      {/* Daily Spend Chart */}
      {c.dailySpend.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">\u0627\u0644\u0625\u0646\u0641\u0627\u0642 \u0627\u0644\u064a\u0648\u0645\u064a</h3>
            <div className="flex gap-1">
              {(['7d', '30d', '90d'] as TimeRange[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-2.5 py-1 rounded-md text-[0.68rem] font-medium transition-colors ${
                    timeRange === t
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {{ '7d': '7 \u0623\u064a\u0627\u0645', '30d': '30 \u064a\u0648\u0645', '90d': '90 \u064a\u0648\u0645' }[t]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-[3px] h-[120px]">
            {c.dailySpend.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className="w-full rounded-sm bg-primary/70 hover:bg-primary transition-colors cursor-pointer min-h-[2px]"
                  style={{ height: `${(val / maxSpend) * 100}%` }}
                  title={`${val} \u062c.\u0645`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[0.62rem] text-muted-foreground">\u0627\u0644\u0623\u0642\u062f\u0645</span>
            <span className="text-[0.62rem] text-muted-foreground">\u0627\u0644\u064a\u0648\u0645</span>
          </div>
        </div>
      )}

      {/* Performance Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Funnel */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">\u0642\u0645\u0639 \u0627\u0644\u0623\u062f\u0627\u0621</h3>
          <div className="space-y-3">
            <FunnelStep label="\u0627\u0646\u0637\u0628\u0627\u0639\u0627\u062a" value={c.impressions} max={c.impressions} color="bg-primary/30" />
            <FunnelStep label="\u0646\u0642\u0631\u0627\u062a" value={c.clicks} max={c.impressions} color="bg-primary/50" />
            <FunnelStep label="\u062a\u062d\u0648\u064a\u0644\u0627\u062a" value={c.conversions} max={c.impressions} color="bg-primary" />
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u062a\u0643\u0644\u0641\u0629</h3>
          <div className="space-y-4">
            <CostRow label="\u062a\u0643\u0644\u0641\u0629 \u0627\u0644\u0646\u0642\u0631\u0629 (CPC)" value={`${c.cpc} \u062c`} />
            <CostRow label="\u062a\u0643\u0644\u0641\u0629 \u0627\u0644\u062a\u062d\u0648\u064a\u0644 (CPA)" value={c.conversions > 0 ? `${(c.spent / c.conversions).toFixed(1)} \u062c` : '-'} />
            <CostRow label="\u062a\u0643\u0644\u0641\u0629 \u0627\u0644\u0623\u0644\u0641 (CPM)" value={c.impressions > 0 ? `${((c.spent / c.impressions) * 1000).toFixed(1)} \u062c` : '-'} />
            <CostRow label="\u0645\u062a\u0648\u0633\u0637 \u064a\u0648\u0645\u064a" value={c.dailySpend.length > 0 ? `${Math.round(c.dailySpend.reduce((a, b) => a + b, 0) / c.dailySpend.length)} \u062c` : '-'} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== SUB COMPONENTS =====

function StatCard({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3">
      <p className="text-[0.65rem] font-semibold text-muted-foreground tracking-wide mb-1">{label}</p>
      <p className="text-lg font-bold tabular-nums">{value}<span className="text-sm font-normal text-muted-foreground">{suffix}</span></p>
    </div>
  )
}

function KPICard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3.5 text-center">
      <p className="text-[0.65rem] font-medium text-muted-foreground mb-1.5">{label}</p>
      <p className="text-base font-bold tabular-nums">{value}</p>
      {sub && <p className="text-[0.65rem] text-muted-foreground mt-1">{sub}</p>}
    </div>
  )
}

function FunnelStep({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[0.72rem] font-medium">{label}</span>
        <span className="text-[0.72rem] tabular-nums text-muted-foreground">{value.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(pct, 1)}%` }} />
      </div>
    </div>
  )
}

function CostRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[0.78rem] text-muted-foreground">{label}</span>
      <span className="text-[0.82rem] font-semibold tabular-nums">{value}</span>
    </div>
  )
}
