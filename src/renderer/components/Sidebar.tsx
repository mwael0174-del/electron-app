import { type ReactNode } from 'react'

export type Page = 'dashboard' | 'campaigns' | 'schedule' | 'reports' | 'settings'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

interface NavItem {
  key: Page
  label: string
  icon: ReactNode
  section?: string
}

const navItems: NavItem[] = [
  {
    key: 'dashboard',
    label: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[17px] h-[17px]"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    key: 'campaigns',
    label: '\u0627\u0644\u062d\u0645\u0644\u0627\u062a',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[17px] h-[17px]"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    key: 'schedule',
    label: '\u0627\u0644\u062c\u062f\u0648\u0644\u0629',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[17px] h-[17px]"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
  {
    key: 'reports',
    label: '\u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[17px] h-[17px]"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
  {
    key: 'settings',
    label: '\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a',
    section: '\u0627\u0644\u0646\u0638\u0627\u0645',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[17px] h-[17px]"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  },
]

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[210px] bg-[oklch(11%_0.007_55)] border-l border-border flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 pb-4">
        <h1 className="text-[1.05rem] font-bold tracking-tight">
          Ad<span className="text-primary">Flow</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <div key={item.key}>
            {item.section && (
              <p className="text-[0.62rem] font-semibold text-muted-foreground/50 tracking-widest px-3 pt-4 pb-1.5">
                {item.section}
              </p>
            )}
            <button
              onClick={() => onNavigate(item.key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[0.82rem] font-medium transition-all ${
                currentPage === item.key
                  ? 'bg-primary/12 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <span className={currentPage === item.key ? 'opacity-100' : 'opacity-60'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-border flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary grid place-items-center text-[0.72rem] font-bold text-primary-foreground">
          \u0645
        </div>
        <div>
          <p className="text-[0.78rem] font-semibold">\u0645\u0635\u0637\u0641\u0649</p>
          <p className="text-[0.65rem] text-muted-foreground">Zoom Design</p>
        </div>
      </div>
    </aside>
  )
}
