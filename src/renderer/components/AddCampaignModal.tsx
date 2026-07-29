import { useState, useRef, useEffect, type FormEvent } from 'react'
import { Button } from '../screens/Settings/components/Button'

type Platform = 'meta' | 'tiktok' | 'google'
type Goal = 'awareness' | 'traffic' | 'leads' | 'sales'

interface CampaignFormData {
  name: string
  platform: Platform
  budget: number
  startDate: string
  endDate: string
  goal: Goal
  notes: string
}

interface AddCampaignModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: CampaignFormData) => void
}

const platforms: { key: Platform; label: string; icon: string; color: string }[] = [
  { key: 'meta', label: 'Meta', icon: 'f', color: 'bg-blue-950 text-blue-400 border-blue-800' },
  { key: 'tiktok', label: 'TikTok', icon: 'T', color: 'bg-neutral-900 text-neutral-300 border-neutral-700' },
  { key: 'google', label: 'Google', icon: 'G', color: 'bg-red-950 text-red-400 border-red-800' },
]

const goals: { key: Goal; label: string }[] = [
  { key: 'awareness', label: '\u0648\u0639\u064a \u0628\u0627\u0644\u0639\u0644\u0627\u0645\u0629' },
  { key: 'traffic', label: '\u0632\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u0648\u0642\u0639' },
  { key: 'leads', label: '\u062a\u0648\u0644\u064a\u062f \u0639\u0645\u0644\u0627\u0621' },
  { key: 'sales', label: '\u0645\u0628\u064a\u0639\u0627\u062a \u0645\u0628\u0627\u0634\u0631\u0629' },
]

export function AddCampaignModal({ open, onClose, onSave }: AddCampaignModalProps) {
  const [name, setName] = useState('')
  const [platform, setPlatform] = useState<Platform>('meta')
  const [budget, setBudget] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [goal, setGoal] = useState<Goal>('awareness')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
      setTimeout(() => nameRef.current?.focus(), 100)
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = '\u0627\u0633\u0645 \u0627\u0644\u062d\u0645\u0644\u0629 \u0645\u0637\u0644\u0648\u0628'
    if (!budget || Number(budget) <= 0) errs.budget = '\u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629 \u0644\u0627\u0632\u0645 \u062a\u0643\u0648\u0646 \u0623\u0643\u0628\u0631 \u0645\u0646 0'
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      errs.endDate = '\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621 \u0644\u0627\u0632\u0645 \u064a\u0643\u0648\u0646 \u0628\u0639\u062f \u0627\u0644\u0628\u062f\u0627\u064a\u0629'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    await onSave({ name: name.trim(), platform, budget: Number(budget), startDate, endDate, goal, notes })
    setSaving(false)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setName(''); setPlatform('meta'); setBudget('')
    setStartDate(''); setEndDate(''); setGoal('awareness')
    setNotes(''); setErrors({})
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-transparent p-0 m-0 w-full h-full max-w-none max-h-none"
      onCancel={onClose}
    >
      <div
        className="fixed inset-0 bg-black/70 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-card border border-border rounded-2xl w-full max-w-[460px] max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-[0.95rem] font-bold">\u062d\u0645\u0644\u0629 \u062c\u062f\u064a\u062f\u0629</h2>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg border border-border grid place-items-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              \u2715
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Campaign Name */}
            <Field label="\u0627\u0633\u0645 \u0627\u0644\u062d\u0645\u0644\u0629" error={errors.name} required>
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="\u0645\u062b\u0627\u0644: \u062d\u0645\u0644\u0629 \u0627\u0644\u0639\u064a\u062f 2026"
                className={`form-input ${errors.name ? 'border-destructive' : ''}`}
              />
            </Field>

            {/* Platform Selector */}
            <Field label="\u0627\u0644\u0645\u0646\u0635\u0629 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u064a\u0629">
              <div className="grid grid-cols-3 gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPlatform(p.key)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all ${
                      platform === p.key
                        ? `${p.color} border-current`
                        : 'border-border bg-secondary/30 text-muted-foreground hover:border-border/80'
                    }`}
                  >
                    <span className="text-lg font-bold">{p.icon}</span>
                    <span className="text-[0.68rem] font-medium">{p.label}</span>
                  </button>
                ))}
              </div>
            </Field>

            {/* Budget & Goal Row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="\u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629 (\u062c.\u0645)" error={errors.budget} required>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="5000"
                  min="0"
                  className={`form-input ${errors.budget ? 'border-destructive' : ''}`}
                />
              </Field>
              <Field label="\u0627\u0644\u0647\u062f\u0641">
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as Goal)}
                  className="form-input"
                >
                  {goals.map((g) => (
                    <option key={g.key} value={g.key}>{g.label}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0628\u062f\u0627\u064a\u0629">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-input"
                />
              </Field>
              <Field label="\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621" error={errors.endDate}>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || undefined}
                  className={`form-input ${errors.endDate ? 'border-destructive' : ''}`}
                />
              </Field>
            </div>

            {/* Notes */}
            <Field label="\u0645\u0644\u0627\u062d\u0638\u0627\u062a">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="\u0623\u064a \u062a\u0641\u0627\u0635\u064a\u0644 \u0625\u0636\u0627\u0641\u064a\u0629..."
                className="form-input resize-none"
              />
            </Field>
          </form>

          {/* Footer */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t border-border">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:bg-secondary transition-colors"
            >
              \u0625\u0644\u063a\u0627\u0621
            </button>
            <button
              onClick={(e) => handleSubmit(e as any)}
              disabled={saving}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground border border-primary hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? '\u062c\u0627\u0631\u064a \u0627\u0644\u062d\u0641\u0638...' : '\u062d\u0641\u0638 \u0627\u0644\u062d\u0645\u0644\u0629'}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

// --- Field wrapper ---
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[0.72rem] font-medium text-muted-foreground mb-1.5">
        {label}
        {required && <span className="text-destructive mr-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-[0.68rem] text-destructive mt-1">{error}</p>}
    </div>
  )
}
