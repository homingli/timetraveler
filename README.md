# Time Traveler

A client-only timezone conversion application for instant, accurate time comparisons across global timezones. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Dual Mode**: Live "now" dashboard with auto-updating clock and "selected time" conversion tool
- **Timezone Comparison**: Compare time across multiple timezones simultaneously
- **Searchable Input**: Type to search and select from all IANA timezones
- **Drag-and-Drop**: Reorder timezone cards via drag-and-drop
- **Live Updating**: Real-time clock updates every second in the dashboard
- **Keyboard Shortcuts**: Use arrow up/down to adjust time by ±1 hour
- **Day Boundary Indicators**: Shows "+1 day" or "-1 day" when crossing midnight
- **GMT Offsets**: Inline GMT offset displayed beside each city name
- **Random City Buttons**: Quick-add major cities with one click
- **Copy to Clipboard**: One-click copy of converted times
- **Swap Zones**: Quickly swap source and target timezones
- **Mobile Optimized**: Card actions visible on mobile, hover-reveal on desktop
- **UTC First**: UTC is always the first timezone in the list
- **Persistence**: Remembers your timezone selections via localStorage

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Time Handling:** Luxon
- **Icons:** Lucide React

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