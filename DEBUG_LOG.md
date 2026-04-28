# Known Issues & Debug Log
> **AI Instruction:** Before suggesting any complex code fixes or logic structures, consult this document. YOU MUST NOT suggest any fix documented as a "Failed Attempt" here.

This document exists to prevent AI models from falling into repetition loops, or proposing solutions we have already discovered do not work in this specific codebase.

## Components (Clock, Converter)
### The Issue 
Hydration failed because the server-rendered time (Next.js SSR) didn't match the client-hydrated time. Even a 1-second difference causes a mismatch error in the UI.

**We Tried:**
1. Initializing state with `DateTime.now()` in `TimeContext` -> Resulted in `Hydration failed` error when the server render time differs from the user's hydration time.

**Current Solution / Workaround:**
We use a `mounted` state hook in client components. We only render time-sensitive UI (clocks, conversions) once `mounted` is true. This ensures the server renders a consistent (or empty) skeleton, and the client takes over once the React tree is stable.


***

*(Add a new section delimited by `***` whenever a stubborn bug takes more than 3 AI turns to resolve)*
