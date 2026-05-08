Vision Statement
A client-only timezone conversion application designed to provide instant, accurate time comparisons for developers and remote professionals. The app offers a dual-mode interface: a live "now" dashboard and a "selected time" conversion tool, ensuring seamless coordination across international timezones without backend dependency.

System Architecture
The application follows a unidirectional data flow pattern:

1.  **Input & Trigger:** User interaction (e.g., selecting a timezone, inputting a time) triggers a component event.
2.  **TimeContext State Manager (Core Entity):** The centralized `TimeContext` state manager captures the user input. It is responsible for managing the primary state: current local time, selected target times, and user preferences.
3.  **Logic Layer (Luxon):** Upon state update, the system utilizes the Luxon library to perform time zone calculations, handling Daylight Saving Time (DST) and offsets accurately.
4.  **Output & Rendering:** The calculated data is made available to the Next.js components, which re-render reactively. Primary Interfaces include the live dashboard and the interactive conversion tool.

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
[x] Toggle for 12h/24h time format
[ ] Write rigorous unit tests for timezone logic and DST edge cases
[ ] Write test cases to ensure the drag and drop works on desktop and mobile

Phase 4: Security Hardening
[x] Add baseline security headers (CSP, frame-ancestors, referrer policy, permissions policy)
[x] Harden persisted state parsing and error handling for localStorage-backed preferences
[x] Track and remediate dependency advisories before release (Next/PostCSS audit follow-up)

Current Execution Status
Current Task: Implementation and documentation complete. Next: Testing.
Recent accomplishment: Fixed 24h toggle in Converter and updated README.md with latest features.

Blocked By: None.

Note to Human: Update "Current Execution Status" at the end of every programming session.
