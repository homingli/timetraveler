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
[x] PWA support for offline use
[x] Optimize client state, timezone lookup, and hydration behavior
[x] Add light/dark mode, add toggle for theme changes
[x] Toggle for showing/hiding seconds
[x] Write rigorous unit tests for timezone logic and DST edge cases
[x] Write test cases to ensure the drag and drop works on desktop and mobile

Current Execution Status
Current Task: Phase 3 implementation is complete.

Recent accomplishment: Added a system/light/dark theme toggle, a persisted show/hide seconds control, rigorous Vitest coverage for timezone and DST edge cases, and Playwright E2E drag-and-drop coverage for desktop and mobile layouts. Verified lint, unit tests, E2E tests, and production build.

Blocked By: None.

Note to Human: Update "Current Execution Status" at the end of every programming session.
