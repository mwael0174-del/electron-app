# Migration from adflow-desktop to electron-app Boilerplate

## Why

The old `adflow-desktop` repo had a single initial commit with a custom Electron + Vite setup.
This boilerplate (daltonmenezes/electron-app) gives us:

- React 19 + TypeScript 5 + Tailwind 4 + shadcn/ui
- electron-vite with HMR for both main and renderer
- Proper main/preload/renderer separation (already secure)
- GitHub Actions for auto-releases
- Biome linter/formatter
- Window/screen routing

## Migration Steps

### 1. Clone & Setup

```powershell
git clone https://github.com/mwael0174-del/electron-app.git adflow-desktop-v2
cd adflow-desktop-v2
npm install
npm run dev  # verify it runs
```

### 2. Copy OAuth Files from Old Repo

```powershell
copy ..\adflow-desktop\src\main\meta-oauth.ts src\main\
copy ..\adflow-desktop\src\main\tiktok-oauth.ts src\main\
copy ..\adflow-desktop\src\main\pkce.ts src\main\
copy ..\adflow-desktop\src\main\loopback.ts src\main\
```

### 3. Adapt OAuth to New IPC Pattern

- Register IPC handlers in the boilerplate's main process entry
- Expose via the boilerplate's existing preload bridge pattern
- Channels: `auth:start-meta`, `auth:start-tiktok`, `auth:status`

### 4. Move Renderer Components

- Copy `OAuthConnector.tsx` to the new renderer directory
- Adapt imports to the boilerplate's structure (shadcn/ui components available)

### 5. Build Campaign Features

- `window.api.campaigns.getAll()` -> `ipcRenderer.invoke('campaigns:get-all')`
- `window.api.campaigns.save(data)` -> `ipcRenderer.invoke('campaigns:save', data)`
- `window.api.campaigns.delete(id)` -> `ipcRenderer.invoke('campaigns:delete', id)`
- Add input validation in main process handlers

### 6. Security Checklist

- [x] contextIsolation: true (boilerplate default)
- [x] nodeIntegration: false (boilerplate default)
- [ ] Enable sandbox: true in BrowserWindow options
- [ ] Add CSP meta tag in renderer index.html
- [ ] Verify Electron version >= 39.8 (CVE-2026-34780 patch)
- [ ] No raw ipcRenderer exposure in preload

### 7. Cleanup

- Archive or delete old `adflow-desktop` repo
- Rename this repo to `adflow-desktop` from GitHub settings (optional)
- Update Commit Cruz and Review Rex agents to point to new repo

## File Mapping (Old -> New)

| Old Path | New Path | Notes |
|----------|----------|-------|
| src/main/index.ts | src/main/index.ts | Adapt to boilerplate's entry |
| src/main/meta-oauth.ts | src/main/meta-oauth.ts | Copy as-is |
| src/main/tiktok-oauth.ts | src/main/tiktok-oauth.ts | Copy as-is |
| src/main/pkce.ts | src/main/pkce.ts | Copy as-is |
| src/main/loopback.ts | src/main/loopback.ts | Copy as-is |
| src/preload/index.ts | src/preload/index.ts | Use boilerplate pattern |
| src/renderer/OAuthConnector.tsx | src/renderer/screens/... | Adapt to routing |

## Priority Order (After Migration)

1. **Urgent**: Fix JS-to-links rendering bug (renderCamps, innerHTML, map)
2. **High**: Campaign data logic + budget calculations
3. **Normal**: Add Campaign modal + validation
4. **Low**: UI/Responsive polish (375px+)
