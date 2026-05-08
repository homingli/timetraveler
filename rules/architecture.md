# Project Architecture Notes
> **AI Instruction:** All proposed solutions and code structures must align with the decisions documented here.

## 1. High-Level Paradigm
- **Paradigm:** Functional React with Hooks using Next.js App Router.
- **State Management:** React Context (`TimeContext`) for managing global time state (current time, selected time, target timezones).

## 2. Core Architectural Flow (Reference: PROJECT_PLAN.md)
The application follows a rigorous, client-side data flow:
1.  **Input & Trigger:** User interaction triggers a component event.
2.  **TimeContext State Manager (Core Entity):** Captures state (current/target times, user preferences).
3.  **Logic Layer (Luxon):** Performs complex time zone calculations, ensuring DST accuracy.
4.  **Output & Rendering:** Calculated data triggers reactive UI re-rendering.

## 3. Directory Structure
This outlines how standard features should be laid out in the codebase. Do not create new top-level directories without explicit permission from the user.

- `src/`: Core application logic.
    - `app/`: Next.js App Router pages and layouts.
    - `components/`: Pure presentation UI layers and reusable client components.
    - `hooks/`: Custom React hooks (e.g., `useTimeContext`).
    - `lib/`: All external integrations (Luxon wrappers) and pure conversion logic.
    - `types/`: Shared TypeScript interface and type definitions.

## 4. Documentation & Tracking
- **Architectural Decisions:** Must be recorded in `rules/architecture.md` and referenced in `PROJECT_PLAN.md`.
- **Change History:** All significant changes, features, and fixes must be tracked and documented in `CHANGELOG.md`.
- **External Integrations:**
    - **Luxon:** Primary timezone and date-time manipulation library. Used in `src/lib/timeUtils.ts`.
    - **TailwindCSS v4:** Styling engine for modern, minimalist UI.
    - **Lucide React:** Icon library for a clean interface.
