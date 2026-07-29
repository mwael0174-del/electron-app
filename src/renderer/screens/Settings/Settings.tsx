import { useState } from 'react'
import { Toggle } from './components/Toggle'
import { Select } from './components/Select'
import { AccountCard } from './components/AccountCard'
import { SettingRow } from './components/SettingRow'
import { StorageBar } from './components/StorageBar'
import { Button } from './components/Button'

export function Settings() {
  const [autoStart, setAutoStart] = useState(true)
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [budgetAlert, setBudgetAlert] = useState(true)
  const [dailySummary, setDailySummary] = useState(false)
  const [alertThreshold, setAlertThreshold] = useState(80)

  const handleExportCSV = () => {
    window.api?.campaigns?.export()
  }

  const handleClearData = () => {
    if (confirm('\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f\u061f \u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u062a\u0631\u0627\u062c\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062c\u0631\u0627\u0621.')) {
      window.api?.storage?.clear()
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-10 max-w-[800px]">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-1">\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a</h1>
        <p className="text-sm text-muted-foreground">\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u062d\u0633\u0627\u0628\u0627\u062a\u060c \u0627\u0644\u062a\u062e\u0632\u064a\u0646\u060c \u0648\u0627\u0644\u062a\u0641\u0636\u064a\u0644\u0627\u062a</p>
      </header>

      {/* Connected Accounts */}
      <Section label="\u0627\u0644\u062d\u0633\u0627\u0628\u0627\u062a \u0627\u0644\u0645\u062a\u0635\u0644\u0629">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <AccountCard
            platform="meta"
            name="Zoom Design Egypt"
            detail="Meta Business \u00b7 \u0622\u062e\u0631 \u0645\u0632\u0627\u0645\u0646\u0629: \u0645\u0646\u0630 3 \u0633\u0627\u0639\u0627\u062a"
            status="connected"
          />
          <AccountCard
            platform="tiktok"
            name="ZoomDesign_EG"
            detail="TikTok Business \u00b7 \u0622\u062e\u0631 \u0645\u0632\u0627\u0645\u0646\u0629: \u0645\u0646\u0630 \u064a\u0648\u0645"
            status="connected"
          />
          <AccountCard
            platform="google"
            name="Google Ads"
            detail="\u0627\u0646\u062a\u0647\u062a \u0635\u0644\u0627\u062d\u064a\u0629 \u0627\u0644\u062a\u0648\u0643\u0646 \u00b7 \u064a\u0644\u0632\u0645 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0627\u062a\u0635\u0627\u0644"
            status="expired"
          />
        </div>
      </Section>

      {/* General */}
      <Section label="\u0639\u0627\u0645">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <SettingRow title="\u0627\u0644\u0644\u063a\u0629" description="\u0644\u063a\u0629 \u0648\u0627\u062c\u0647\u0629 \u0627\u0644\u062a\u0637\u0628\u064a\u0642">
            <Select
              options={[
                { value: 'ar', label: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' },
                { value: 'en', label: 'English' },
              ]}
              defaultValue="ar"
            />
          </SettingRow>
          <SettingRow title="\u0627\u0644\u0639\u0645\u0644\u0629 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629" description="\u062a\u064f\u0633\u062a\u062e\u062f\u0645 \u0641\u064a \u0639\u0631\u0636 \u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0627\u062a \u0648\u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631">
            <Select
              options={[
                { value: 'EGP', label: '\u062c\u0646\u064a\u0647 \u0645\u0635\u0631\u064a (EGP)' },
                { value: 'USD', label: '\u062f\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064a\u0643\u064a (USD)' },
                { value: 'SAR', label: '\u0631\u064a\u0627\u0644 \u0633\u0639\u0648\u062f\u064a (SAR)' },
              ]}
              defaultValue="EGP"
            />
          </SettingRow>
          <SettingRow title="\u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0639\u0646\u062f \u0628\u062f\u0621 Windows" description="\u062a\u0634\u063a\u064a\u0644 AdFlow \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b \u0639\u0646\u062f \u0641\u062a\u062d \u0627\u0644\u062c\u0647\u0627\u0632">
            <Toggle checked={autoStart} onChange={setAutoStart} />
          </SettingRow>
          <SettingRow title="\u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0627\u0644\u062a\u0644\u0642\u0627\u0626\u064a\u0629" description="\u062a\u0646\u0632\u064a\u0644 \u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0648\u062a\u062b\u0628\u064a\u062a\u0647\u0627 \u0639\u0646\u062f \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u0634\u063a\u064a\u0644">
            <Toggle checked={autoUpdate} onChange={setAutoUpdate} />
          </SettingRow>
        </div>
      </Section>

      {/* Notifications */}
      <Section label="\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <SettingRow title="\u062a\u0646\u0628\u064a\u0647 \u062a\u062c\u0627\u0648\u0632 \u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629" description="\u0625\u0634\u0639\u0627\u0631 \u0639\u0646\u062f\u0645\u0627 \u062a\u0635\u0644 \u062d\u0645\u0644\u0629 \u0644\u0646\u0633\u0628\u0629 \u0645\u0639\u064a\u0646\u0629 \u0645\u0646 \u0645\u064a\u0632\u0627\u0646\u064a\u062a\u0647\u0627">
            <Toggle checked={budgetAlert} onChange={setBudgetAlert} />
          </SettingRow>
          <SettingRow title="\u0646\u0633\u0628\u0629 \u0627\u0644\u062a\u0646\u0628\u064a\u0647" description="\u0627\u0644\u0646\u0633\u0628\u0629 \u0627\u0644\u0645\u0626\u0648\u064a\u0629 \u0645\u0646 \u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629 \u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062a\u0646\u0628\u064a\u0647">
            <input
              type="number"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              min={50}
              max={100}
              className="w-20 text-center rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </SettingRow>
          <SettingRow title="\u0645\u0644\u062e\u0635 \u064a\u0648\u0645\u064a" description="\u0625\u0634\u0639\u0627\u0631 \u0646\u0647\u0627\u064a\u0629 \u0627\u0644\u064a\u0648\u0645 \u0628\u0645\u0644\u062e\u0635 \u0623\u062f\u0627\u0621 \u0627\u0644\u062d\u0645\u0644\u0627\u062a">
            <Toggle checked={dailySummary} onChange={setDailySummary} />
          </SettingRow>
        </div>
      </Section>

      {/* Data & Storage */}
      <Section label="\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0627\u0644\u062a\u062e\u0632\u064a\u0646">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border/50">
            <p className="text-sm font-semibold mb-2">\u0627\u0644\u062a\u062e\u0632\u064a\u0646 \u0627\u0644\u0645\u062d\u0644\u064a</p>
            <StorageBar used={12.4} total={50} />
            <p className="text-xs text-muted-foreground mt-1.5">12.4 MB \u0645\u0646 50 MB \u0645\u0633\u062a\u062e\u062f\u0645</p>
          </div>
          <SettingRow title="\u0645\u0633\u0627\u0631 \u0627\u0644\u062a\u062e\u0632\u064a\u0646" description="C:\\Users\\Mostafa\\AppData\\Roaming\\AdFlow\\">
            <Button onClick={() => window.api?.storage?.openFolder()}>\u0641\u062a\u062d \u0627\u0644\u0645\u062c\u0644\u062f</Button>
          </SettingRow>
          <SettingRow title="\u062a\u0635\u062f\u064a\u0631 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a" description="\u062a\u062d\u0645\u064a\u0644 \u062c\u0645\u064a\u0639 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062d\u0645\u0644\u0627\u062a \u0643\u0645\u0644\u0641 CSV">
            <Button onClick={handleExportCSV}>\u062a\u0635\u062f\u064a\u0631 CSV</Button>
          </SettingRow>
          <SettingRow title="\u0645\u0633\u062d \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0629" description="\u062d\u0630\u0641 \u062c\u0645\u064a\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062e\u0632\u0646\u0629 (\u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u062a\u0631\u0627\u062c\u0639)">
            <Button variant="danger" onClick={handleClearData}>\u0645\u0633\u062d \u0627\u0644\u0643\u0644</Button>
          </SettingRow>
        </div>
      </Section>

      {/* Version */}
      <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground/70">AdFlow Desktop</span>
          {' '}\u00b7 \u0627\u0644\u0625\u0635\u062f\u0627\u0631 0.2.0-beta \u00b7 Electron 39.8
        </p>
        <Button>\u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a</Button>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <p className="text-[0.7rem] font-semibold text-muted-foreground tracking-wide mb-4">
        {label}
      </p>
      {children}
    </section>
  )
}
