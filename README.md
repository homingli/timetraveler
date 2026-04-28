# Time Traveler

A client-only timezone conversion application for instant, accurate time comparisons across global timezones. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Dual Mode**: Live "now" dashboard and "selected time" conversion tool
- **Timezone Comparison**: Compare time across multiple timezones simultaneously
- **Keyboard Shortcuts**: Use arrow up/down to adjust time by ±1 hour
- **Day Boundary Indicators**: Shows "+1 day" or "-1 day" when crossing midnight
- **Timezone Presets**: Quick-select common timezone groups
- **Copy to Clipboard**: One-click copy of converted times
- **Swap Zones**: Quickly swap source and target timezones
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