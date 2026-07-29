# Smoke Test Checklist — AdFlow Desktop v0.1.0

Run through this after building the installer. Every item must pass before publishing.

## Installation

- [ ] Installer runs without errors on Windows 10/11
- [ ] Desktop shortcut created
- [ ] Start Menu entry created
- [ ] App icon shows correctly (not default Electron icon)
- [ ] App opens on first launch without crash

## Startup

- [ ] No errors in DevTools console (Ctrl+Shift+I)
- [ ] Window title shows "AdFlow Desktop"
- [ ] Sidebar renders with all nav items
- [ ] Dashboard loads as default page
- [ ] App loads in < 3 seconds

## Navigation

- [ ] Sidebar: clicking each page navigates correctly
- [ ] Active state highlights current page
- [ ] Back navigation works in Campaigns detail view

## Dashboard

- [ ] 4 metric cards display values
- [ ] Campaign table renders rows
- [ ] Filter buttons work (all/active/scheduled/paused)
- [ ] Weekly chart bars display
- [ ] Upcoming list renders items

## Add Campaign Modal

- [ ] "+  حملة جديدة" button opens modal
- [ ] Modal closes on backdrop click
- [ ] Modal closes on Escape key
- [ ] Validation: empty name shows error
- [ ] Validation: budget <= 0 shows error
- [ ] Validation: end date before start date shows error
- [ ] Platform selector highlights selected
- [ ] Successful save closes modal + shows toast
- [ ] New campaign appears in list after save

## Data Persistence (IPC + Local Storage)

- [ ] Added campaign persists after app restart
- [ ] `campaigns.json` exists in `%APPDATA%/AdFlow/data/`
- [ ] JSON file contains valid data
- [ ] Delete campaign removes from file
- [ ] App handles empty/missing JSON file gracefully (first run)

## Campaigns Page

- [ ] Campaign list renders all campaigns
- [ ] Clicking a campaign opens detail view
- [ ] KPI cards show correct numbers
- [ ] Budget progress bar colored correctly (green/yellow/red)
- [ ] Daily spend chart renders bars
- [ ] Performance funnel displays proportions
- [ ] Cost breakdown shows CPC, CPA, CPM
- [ ] Pause/Resume buttons show based on status

## Settings Page

- [ ] Connected accounts section renders
- [ ] Toggle switches work (click toggles state)
- [ ] Language dropdown changes
- [ ] Currency dropdown changes
- [ ] Storage bar shows usage
- [ ] "Open folder" button opens AppData directory
- [ ] "Export CSV" button triggers (even if no data)
- [ ] Version info displays at bottom

## Notifications

- [ ] Toast appears and auto-dismisses after 5s
- [ ] Toast close button works
- [ ] Progress bar animates on toast

## Theme

- [ ] Theme toggle button cycles (dark → light → system)
- [ ] Dark mode: dark background, orange accent
- [ ] Light mode: light background, readable text
- [ ] Theme persists after restart (localStorage)
- [ ] Transition is smooth (no flash)

## Security

- [ ] DevTools: `window.require` is undefined (no Node in renderer)
- [ ] DevTools: `window.api` exists with campaigns methods only
- [ ] No `nodeIntegration` warnings in console

## Performance

- [ ] No memory leaks (Task Manager stays stable after 5 min)
- [ ] No frozen UI during campaign save
- [ ] Scrolling is smooth in campaign list

## Edge Cases

- [ ] App works with 0 campaigns (empty state)
- [ ] App works with 50+ campaigns (no lag)
- [ ] Arabic text renders correctly (RTL)
- [ ] Long campaign names truncate properly
- [ ] Budget = 0 doesn't cause division by zero

---

**Result:** ___/50 passed

**Tested by:** _______________

**Date:** _______________

**Build:** v0.1.0-beta
