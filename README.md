# Time Traveler Tool

Welcome to your vibecoding workspace. This repository acts as the "living context" for your conversational AI coding assistants (e.g. Claude, Gemini).

To effectively "vibecode", the AI needs persistent context. Instead of hoping the model remembers everything during a long session, we explicitly manage its long-term memory through these markdown files.

## How to Start a Session

At the start of every new chat session, attach the following files to your initial prompt:
1. `PROJECT_PLAN.md` to establish what the system is and what we are working on today.
2. `DEBUG_LOG.md` to prevent the AI from repeating past mistakes.
3. `AGENTS.md` to reference the specific behavior you want from the given agent.

In your prompt, write something like:
> "Read the attached project plan and debug log. I would like to work on task X as defined in the roadmap."

## Harness Directory Structure

*   **`PROJECT_PLAN.md`:** The living memory of our goals, roadmaps, and the current task in progress.
*   **`DEBUG_LOG.md`:** A log of failed attempts, common gotchas, and specific behaviors that the AI struggles with and shouldn't repeat.
*   **`AGENTS.md`:** Reference sheet for how to prompt different agents (e.g., Claude vs. Gemini) for different tasks.
*   **`rules/`**
    *   `architecture.md`: Generic rules dictating project structure and patterns.
    *   `style-guide.md`: Generic styling rules, naming conventions, and testing requirements.

## Tech Stack (Generic)
* **Frontend:** [TBD]
* **Backend:** [TBD]
* **Database:** [TBD]
* **Deployment:** [TBD]

*Note: Update the generic stack above once your architecture is fully defined.*
