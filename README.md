# AdFlow Desktop

> Manage all your ad campaigns from one desktop app. Meta, TikTok, and Google Ads in a single dashboard.

![AdFlow Desktop](https://img.shields.io/badge/status-beta-orange) ![Platform](https://img.shields.io/badge/platform-Windows-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## What is AdFlow?

AdFlow Desktop is a native Windows application for managing advertising campaigns across multiple platforms. Instead of juggling 15 browser tabs, you get one focused app with real-time budget tracking, campaign management, and performance analytics.

**Key Features:**

- Unified dashboard for Meta, TikTok, and Google Ads
- Real-time budget tracking with overspend alerts
- Secure OAuth (tokens never leave your machine)
- Native desktop performance with offline data access
- Multi-account support for agency workflows
- Silent auto-updates via GitHub Releases

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Electron 39+ |
| Frontend | React 19, TypeScript 5, Tailwind 4 |
| UI Components | shadcn/ui |
| Build | electron-vite (Vite 7) |
| Linter | Biome |
| Releases | electron-builder + GitHub Actions |

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 9
- Windows 10/11

### Install & Run

```bash
# Clone the repo
git clone https://github.com/mwael0174-del/electron-app.git
cd electron-app

# Install dependencies
npm install

# Run in development mode (with HMR)
npm run dev
```

### Build for Production

```bash
# Create Windows installer (.exe)
npm run build
```

The output will be in the `release/` directory.

## Project Structure

```
src/
├── main/           # Electron main process (Node.js)
│   ├── index.ts      # App entry, window management, IPC handlers
│   ├── meta-oauth.ts # Facebook/Meta OAuth + PKCE
│   ├── tiktok-oauth.ts # TikTok Business OAuth
│   ├── pkce.ts       # PKCE code verifier/challenge
│   └── loopback.ts   # Local HTTP server for OAuth callbacks
├── preload/        # Security bridge (contextBridge)
│   └── index.ts      # Exposes safe APIs to renderer
└── renderer/       # React frontend (sandboxed)
    ├── screens/      # App screens/pages
    ├── components/   # Shared UI components
    └── main.tsx      # React entry point
```

## Architecture

AdFlow uses Electron's three-layer security model:

```
┌─────────────────┐     ┌───────────────────┐     ┌─────────────────┐
│   Renderer      │     │   Preload Bridge    │     │   Main Process   │
│   (React UI)    │────│  (contextBridge)    │────│   (Node.js)      │
│                 │ IPC │  Whitelist only     │ IPC │   OAuth, APIs    │
└─────────────────┘     └───────────────────┘     └─────────────────┘
```

- **Renderer** has zero Node.js access
- **Preload** exposes only whitelisted, validated APIs
- **Main** handles all system access, OAuth, and external API calls

## Security

- `contextIsolation: true` (default)
- `nodeIntegration: false` (default)
- `sandbox: true`
- OAuth tokens encrypted in local storage
- PKCE flow for all OAuth providers
- No raw `ipcRenderer` exposure
- Electron 39.8+ (patched CVE-2026-34780)

## Roadmap

- [x] OAuth integration (Meta + TikTok)
- [ ] Campaign data logic + budget calculations
- [ ] Add Campaign modal with validation
- [ ] UI/Responsive polish
- [ ] Google Ads integration
- [ ] macOS build
- [ ] Auto-update via GitHub Releases

## Contributing

This is currently a solo project by [@mwael0174-del](https://github.com/mwael0174-del). If you're interested in contributing, open an issue first.

## License

MIT

---

Built by [Zoom Design](https://facebook.com/ZoomDesignEgypt) • [WhatsApp](https://wa.me/2001205592861)
