import { Button } from './Button'

type Platform = 'meta' | 'tiktok' | 'google'
type Status = 'connected' | 'expired'

interface AccountCardProps {
  platform: Platform
  name: string
  detail: string
  status: Status
}

const platformStyles: Record<Platform, { bg: string; color: string; label: string }> = {
  meta: { bg: 'bg-blue-950', color: 'text-blue-400', label: 'f' },
  tiktok: { bg: 'bg-neutral-900', color: 'text-neutral-300', label: 'T' },
  google: { bg: 'bg-red-950', color: 'text-red-400', label: 'G' },
}

export function AccountCard({ platform, name, detail, status }: AccountCardProps) {
  const style = platformStyles[platform]

  return (
    <div className="flex items-center gap-3.5 px-5 py-4 border-b border-border/50 last:border-b-0">
      <div
        className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-sm font-bold flex-shrink-0 ${style.bg} ${style.color}`}
      >
        {style.label}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
      </div>
      <span
        className={`inline-flex items-center gap-1.5 text-[0.7rem] font-medium px-2.5 py-1 rounded-md ${
          status === 'connected'
            ? 'bg-green-500/10 text-green-400'
            : 'bg-red-500/10 text-red-400'
        }`}
      >
        \u25CF {status === 'connected' ? '\u0645\u062a\u0635\u0644' : '\u0645\u0646\u062a\u0647\u064a'}
      </span>
      <div className="flex gap-2">
        {status === 'connected' ? (
          <>
            <Button>\u0645\u0632\u0627\u0645\u0646\u0629</Button>
            <Button variant="danger">\u0641\u0635\u0644</Button>
          </>
        ) : (
          <Button variant="primary">\u0625\u0639\u0627\u062f\u0629 \u0627\u062a\u0635\u0627\u0644</Button>
        )}
      </div>
    </div>
  )
}
