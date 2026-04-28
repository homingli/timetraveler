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
[ ] Write rigorous unit tests for timezone logic and DST edge cases
[x] Add UI polish: Swap controls, copy-to-clipboard, timezone search/presets, and day boundary indicators
[x] Add keyboard shortcut: arrow up/down for moving an hour up or down
[/] Finalize documentation and deployment configuration for Vercel

Current Execution Status
Current Task: Updating documentation (PROJECT_PLAN.md, README.md) and preparing for Vercel deployment.

Recent accomplishment: Completed Phase 2 UI polish including day boundary indicators, keyboard shortcuts, localStorage persistence, swap controls, copy-to-clipboard, timezone presets, and live updating.

Blocked By: None.

Note to Human: Update "Current Execution Status" at the end of every programming session.