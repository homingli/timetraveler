Vision Statement
A client-only timezone conversion application designed to provide instant, accurate time comparisons for developers and remote professionals. The app offers a dual-mode interface: a live "now" dashboard and a "selected time" conversion tool, ensuring seamless coordination across international timezones without backend dependency.

System Architecture
Core Entity: A client-side "TimeContext" state manager that synchronizes current and converted timestamps using IANA timezone definitions.

Data Flow: User input triggers immediate timezone recalculation via the client-side library; the UI re-renders reactively using Next.js App Router components.

Primary Interfaces: A responsive, minimalist dashboard featuring an auto-updating clock for the local timezone and an interactive form for calculating conversions between arbitrary zones.

Roadmap
Use [x] for finished items, [/] for items currently being worked on, and [ ] for future tasks.

Phase 1: MVP Core
[x] Define basic architectural foundations (update rules/architecture.md when done)
[x] Set up project skeleton (Next.js/React/TypeScript/Tailwind)
[x] Implement core feature: "Selected time" conversion engine
[x] Use localStorage to store preset timezone locations

Phase 2: Refinement
[x] Add UI polish: Swap controls, copy-to-clipboard, timezone search input, drag-and-drop reordering, GMT offsets, random city buttons, mobile optimization
[x] Add keyboard shortcut: arrow up/down for moving an hour up or down
[x] Finalize documentation and deployment configuration for Vercel

Phase 3: Enhancement
[ ] Add light/dark mode, add toggle for theme changes
[x] PWA support for offline use
[x] Optimize client state, timezone lookup, and hydration behavior
[ ] Write rigorous unit tests for timezone logic and DST edge cases

Current Execution Status
Current Task: Phase 3 remains open for theme toggle and timezone/DST tests. Mobile drag-and-drop validation is complete.

Recent accomplishment: Validated mobile card reordering in the in-app browser at a 653px viewport: dragging UTC below New York updated the order, then the original order was restored. Previously: Optimized the timezone app while maintaining behavior: centralized browser timezone discovery, memoized repeated calculations and handlers, improved localStorage-backed state subscriptions, fixed the Next.js hydration mismatch caused by live clock rendering, and verified lint/build plus clean browser console reload.

Blocked By: None.

Note to Human: Update "Current Execution Status" at the end of every programming session.
