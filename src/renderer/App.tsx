import { useState } from 'react'
import { Sidebar, type Page } from './components/Sidebar'
import { Dashboard } from './screens/Dashboard/Dashboard'
import { Settings } from './screens/Settings/Settings'
import { ToastContainer } from './components/notifications/ToastContainer'
import { useToast } from './components/notifications/useToast'
import { AddCampaignModal } from './components/AddCampaignModal'

// Placeholder pages for routes not yet built
function Campaigns() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-xl font-bold mb-2">\u0627\u0644\u062d\u0645\u0644\u0627\u062a</h1>
      <p className="text-sm text-muted-foreground">\u0625\u062f\u0627\u0631\u0629 \u062a\u0641\u0635\u064a\u0644\u064a\u0629 \u0644\u0643\u0644 \u0627\u0644\u062d\u0645\u0644\u0627\u062a (\u0642\u0631\u064a\u0628\u0627\u064b)</p>
    </div>
  )
}

function Schedule() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-xl font-bold mb-2">\u0627\u0644\u062c\u062f\u0648\u0644\u0629</h1>
      <p className="text-sm text-muted-foreground">\u062c\u062f\u0648\u0644\u0629 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0627\u062a \u0648\u0627\u0644\u062d\u0645\u0644\u0627\u062a (\u0642\u0631\u064a\u0628\u0627\u064b)</p>
    </div>
  )
}

function Reports() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-xl font-bold mb-2">\u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631</h1>
      <p className="text-sm text-muted-foreground">\u062a\u0642\u0627\u0631\u064a\u0631 \u0627\u0644\u0623\u062f\u0627\u0621 \u0648\u0627\u0644\u062a\u062d\u0644\u064a\u0644\u0627\u062a (\u0642\u0631\u064a\u0628\u0627\u064b)</p>
    </div>
  )
}

const pages: Record<Page, () => JSX.Element> = {
  dashboard: Dashboard,
  campaigns: Campaigns,
  schedule: Schedule,
  reports: Reports,
  settings: Settings,
}

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [modalOpen, setModalOpen] = useState(false)
  const { toasts, dismissToast, budgetAlert } = useToast()

  const PageComponent = pages[currentPage]

  return (
    <div className="h-screen flex bg-background text-foreground" dir="rtl">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <PageComponent />
      </main>

      {/* Global: Toasts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Global: Add Campaign Modal */}
      <AddCampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={async (data) => {
          // TODO: wire to IPC
          console.log('New campaign:', data)
        }}
      />
    </div>
  )
}
