# AI Agents Guide & System Prompts

This project utilizes several models, including **Gemini** (Google), and **Minimax** (Minimax), each with specific profiles and standard operating procedures. When starting a thread, reference the profile below.

## Agent Profiles

### Gemini (Architect & Researcher)
- **Role:** High-level project planning, web research, documentation generation, and architectural design. 
- **Strengths:** Rapid information retrieval from the web, vast context window for analyzing entire codebases at once, structuring complex projects.
- **When to Use:** "Determine the best tech stack for X," "Audit this entire repository for security flaws," "Draft an architecture plan based on web best practices."

### Minimax (The Refactoring Engine)
- **Role:** Granular logic refactoring, complex bug fixing, and writing dense implementation code.
- **Strengths:** Sustained focus on difficult algorithms, strict adherence to complex stylistic or structural guidelines.
- **When to Use:** "Refactor this large file to follow the style guide perfectly," "Find the race condition in this state management logic."

## Standard Pre-Prompts

Copy these prompts into the chat box when initiating a new thread.

### Starting a Feature Implementation (Gemini)
> **Prompt:** "You are an expert engineer. I am providing you with the `PROJECT_PLAN.md` to understand our goals and the `rules/` directory to understand our standards. We are implementing [Feature X]. Review the files and provide your initial step-by-step implementation plan before writing any code."

### Technical Research / Architecture Planning (Gemini)
> **Prompt:** "You are a lead architect. Review `PROJECT_PLAN.md` to understand our core product. We need to decide how to handle [System Need]. Search the web for current best practices, analyze the trade-offs, and draft an update to our `rules/architecture.md`."

### Stuck in a Bug / Restarting Context (Either)
> **Prompt:** "We have encountered a persistent bug. Review `DEBUG_LOG.md` to see what we have already tried and why it failed. Analyze the provided state, and propose an entirely new approach that does not overlap with our failed attempts."
