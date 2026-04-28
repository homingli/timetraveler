# Project Architecture Notes
> **AI Instruction:** All proposed solutions and code structures must align with the decisions documented here.

## 1. High-Level Paradigm
- **Paradigm:** Functional React with Hooks using Next.js App Router.
- **State Management:** React Context (`TimeContext`) for managing global time state (current time, selected time, target timezones).

## 2. Directory Structure
This outlines how standard features should be laid out in the codebase. Do not create new top-level directories without explicit permission from the user.

- `src/`: Core application logic.
    - `app/`: Next.js App Router pages and layouts.
    - `components/`: Pure presentation UI layers and reusable client components.
    - `hooks/`: Custom React hooks (e.g., `useTimeContext`).
    - `lib/`: All external integrations (Luxon wrappers) and pure conversion logic.
    - `types/`: Shared TypeScript interface and type definitions.

## 3. Data Flow
1. User interacts with `[Component layer]` (UI elements in `src/components`).
2. This invokes handlers in `TimeContext` or local component state.
3. Time calculations are performed via `src/lib/timeUtils.ts` (Luxon).
4. State updates trigger re-renders across the dashboard via `TimeContext`.

## 4. Third-Party Integrations
- **Luxon:** Primary timezone and date-time manipulation library. Used in `src/lib/timeUtils.ts`.
- **TailwindCSS v4:** Styling engine for modern, minimalist UI.
- **Lucide React:** Icon library for a clean interface.
