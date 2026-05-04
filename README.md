# Time Traveler

A client-only timezone conversion application for instant, accurate time comparisons across global timezones. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Dual Mode**: Live "now" dashboard with auto-updating clock and "selected time" conversion tool
- **Timezone Comparison**: Compare time across multiple timezones simultaneously
- **Searchable Input**: Type to search and select from all IANA timezones
- **Drag-and-Drop**: Reorder timezone cards via drag-and-drop
- **Live Updating**: Real-time clock updates every second in the dashboard
- **Keyboard Shortcuts**: Use arrow up/down to adjust time by ±1 hour
- **Display Settings**: Toggles for showing/hiding seconds and switching between 12h/24h formats
- **Dark Mode**: Support for light, dark, and system themes
- **PWA Ready**: Offline-first support with service worker caching via Serwist
- **Day Boundary Indicators**: Shows "+1 day" or "-1 day" when crossing midnight
- **GMT Offsets**: Inline GMT offset displayed beside each city name
- **Random City Buttons**: Quick-add major cities with one click
- **Copy to Clipboard**: One-click copy of converted times
- **Swap Zones**: Quickly swap source and target timezones
- **Mobile Optimized**: Card actions visible on mobile, hover-reveal on desktop
- **Persistence**: Remembers your timezone selections and preferences via localStorage

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Time Handling:** Luxon
- **PWA:** Serwist
- **Theme:** Next Themes
- **Icons:** Lucide React
- **Drag & Drop:** @dnd-kit

## Security & Privacy

- **Client-Only**: All time calculations and data storage happen entirely in your browser. No data is sent to any server.
- **Hardened Headers**: Implements strict Content Security Policy (CSP), Frame Options, and Referrer Policy.
- **Resilient Persistence**: Hardened `localStorage` parsing with validation to ensure UI stability.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Deploy to Vercel with zero configuration:

```bash
npm run build
vercel
```