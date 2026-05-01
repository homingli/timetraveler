# Phase 3: Enhancement - Next Steps Implementation Plan

Based on the `PROJECT_PLAN.md` and the current state of the codebase, here is the detailed plan for completing the remaining tasks in Phase 3.

## Remaining Tasks
1. **Light/Dark Mode Toggle**: Implement theme switching and a UI toggle button.
2. **Show/Hide Seconds Toggle**: Update global state and UI to allow users to toggle the display of seconds on the clocks.
3. **Unit Tests (Timezone Logic)**: Implement rigorous unit testing for timezone and DST edge cases.
4. **E2E Tests (Drag and Drop)**: Implement E2E testing to validate desktop and mobile drag-and-drop interactions.

---

## Parallel Implementation Strategy (Subagents)

These tasks operate on mostly independent parts of the application (UI state vs. Unit Testing vs. E2E Testing). Therefore, they can be implemented concurrently by utilizing parallel subagents.

### 🤖 Subagent 1: UI & State Enhancements
**Focus:** Theme Toggle & Show/Hide Seconds Toggle
- **Tasks:**
  - **Theme:** Set up `next-themes` (or a custom React Context + localStorage setup) for light/dark mode support. Update `tailwind.config.ts` or CSS variables, and wrap the app in the theme provider in `src/app/layout.tsx`. Add a Theme Toggle button in the header.
  - **Seconds:** Extend `TimeContext` (or the respective state manager) to include a `showSeconds` boolean state (persisted to localStorage). Add a toggle button in the UI, and update clock display components to conditionally format time.
- **Expected Files Touched:** `package.json`, `src/app/layout.tsx`, `src/components/*`, `src/hooks/*`

### 🤖 Subagent 2: Core Logic Unit Testing
**Focus:** Timezone & DST Testing
- **Tasks:**
  - Install a fast unit testing framework like `vitest` (recommended for modern Next.js/Vite stacks) and configure it.
  - Write comprehensive unit tests targeting `src/lib/timeUtils.ts` (or equivalent Luxon wrapper).
  - Explicitly test edge cases: DST forward/backward transitions, cross-hemisphere timezone conversions, and leap years.
- **Expected Files Touched:** `package.json`, `vitest.config.ts`, `src/lib/**/*.test.ts`

### 🤖 Subagent 3: E2E Interaction Testing
**Focus:** Drag & Drop Functionality
- **Tasks:**
  - Install and configure an E2E testing framework like `@playwright/test`.
  - Write E2E test specs that simulate pointer events (mouse) for desktop viewports.
  - Write E2E test specs that simulate touch events for mobile viewports (`@dnd-kit` requires specific sensor handling for testing).
  - Validate that reordering works visually and that the new order persists correctly.
- **Expected Files Touched:** `package.json`, `playwright.config.ts`, `tests/e2e/drag-drop.spec.ts`

---

## Execution
Since you requested a plan for parallel execution, you can dispatch three separate agents (e.g., using the "Minimax" agent for dense implementation) with the exact focus areas listed above. 

> **Note:** If running concurrently in the same local workspace without branching, Subagent 1's package installations (`next-themes`) might conflict with Subagent 2 & 3's installations (`vitest`, `playwright`). Running `npm install` sequentially before starting the actual code implementation is recommended.
