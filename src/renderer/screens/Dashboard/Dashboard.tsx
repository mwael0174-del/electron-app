import { useState } from 'react'
import { MetricCard } from './components/MetricCard'
import { CampaignRow } from './components/CampaignRow'
import { WeeklyChart } from './components/WeeklyChart'
import { UpcomingList } from './components/UpcomingList'
import { Button } from '../Settings/components/Button'

type FilterType = 'all' | 'active' | 'scheduled' | 'paused'

const campaigns = [
  { id: '1', name: 'حملة صيف 2026', platform: 'facebook', budget: 8000, spent: 5400, reach: '24,500', endDate: '30 يوليو', status: 'active' as const },
  { id: '2', name: 'إعلانات جوجل - رمضان', platform: 'google', budget: 12000, spent: 9800, reach: '87,200', endDate: '15 أغسطس', status: 'active' as const },
  { id: '3', name: 'تيك توك - منتج جديد', platform: 'tiktok', budget: 5500, spent: 0, reach: '-', endDate: '1 أغسطس', status: 'scheduled' as const },
  { id: '4', name: 'حملة Brand Awareness', platform: 'facebook', budget: 3000, spent: 1200, reach: '15,000', endDate: '20 أغسطس', status: 'paused' as const },
  { id: '5', name: 'إعلانات Retargeting', platform: 'google', budget: 4200, spent: 3100, reach: '41,000', endDate: '10 أغسطس', status: 'active' as const },
]

const weeklyData = [320, 410, 280, 560, 490, 720, 380]

const upcoming = [
  { name: 'إطلاق حملة تيك توك', date: '1 أغسطس', color: '#010101' },
  { name: 'مراجعة ميزانية Q3', date: '5 أغسطس', color: '#f59e0b' },
  { name: 'تجديد توكن Google Ads', date: '7 أغسطس', color: '#ef4444' },
]

export function Dashboard() {
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = filter === 'all'
    ? campaigns
    : campaigns.filter((c) => c.status === filter)

  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length

  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight">الرئيسية</h1>
          <p className="text-sm text-muted-foreground mt-0.5">ملخص أداء حملاتك</p>
        </div>
        <Button variant="primary">➕ حملة جديدة</Button>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <MetricCard
          label="حملات نشطة"
          value={String(activeCampaigns)}
          change="+2 هذا الشهر"
          trend="up"
        />
        <MetricCard
          label="إجمالي الإنفاق"
          value={`${(totalSpent / 1000).toFixed(1)}ك`}
          suffix=" ج"
          change="-5% عن الهدف"
          trend="down"
        />
        <MetricCard
          label="نسبة النقر CTR"
          value="3.4"
          suffix="%"
          change="+0.6% عن الشهر"
          trend="up"
        />
        <MetricCard
          label="عائد الاستثمار"
          value="2.1"
          suffix="\u00d7"
          change="أعلى من المستهدف"
          trend="up"
        />
      </div>

      {/* Campaign Table */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">الحملات الحالية</h2>
          <div className="flex gap-1.5">
            {(['all', 'active', 'scheduled', 'paused'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  filter === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {{ all: 'الكل', active: 'نشطة', scheduled: 'مجدولة', paused: 'متوقفة' }[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 px-5 py-3 border-b border-border bg-secondary/30">
            <span className="text-[0.68rem] font-semibold text-muted-foreground tracking-wide">الحملة</span>
            <span className="text-[0.68rem] font-semibold text-muted-foreground tracking-wide">الحالة</span>
            <span className="text-[0.68rem] font-semibold text-muted-foreground tracking-wide">الميزانية</span>
            <span className="text-[0.68rem] font-semibold text-muted-foreground tracking-wide">الوصول</span>
            <span className="text-[0.68rem] font-semibold text-muted-foreground tracking-wide">الانتهاء</span>
          </div>
          {/* Rows */}
          {filtered.map((campaign) => (
            <CampaignRow key={campaign.id} {...campaign} />
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              لا توجد حملات في ه\u0630\u0627 \u0627\u0644\u062a\u0635\u0646\u064a\u0641
            </div>
          )}
        </div>
      </section>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">الأداء الأسبوعي</h3>
            <span className="text-[0.68rem] text-muted-foreground">النقرات</span>
          </div>
          <WeeklyChart data={weeklyData} />
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">قادم هذا الشهر</h3>
            <span className="text-[0.68rem] text-muted-foreground">أغسطس 2026</span>
          </div>
          <UpcomingList items={upcoming} />
        </div>
      </div>
    </div>
  )
}
