import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycle = () => {
    const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
    setTheme(next)
  }

  return (
    <button
      onClick={cycle}
      title={`\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062d\u0627\u0644\u064a: ${labels[theme]}`}
      className="w-8 h-8 rounded-lg border border-border grid place-items-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
    >
      {icons[theme]}
    </button>
  )
}

const labels: Record<string, string> = {
  dark: '\u062f\u0627\u0643\u0646',
  light: '\u0641\u0627\u062a\u062d',
  system: '\u0627\u0644\u0646\u0638\u0627\u0645',
}

const icons: Record<string, JSX.Element> = {
  dark: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  light: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  system: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
}
