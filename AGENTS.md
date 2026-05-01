# AI Agents Guide

Agents: **Gemini** (Architect/Researcher), **Minimax** (Refactoring Engine).

## Gemini
- High-level planning, web research, architecture
- Use for: "Determine best stack," "Audit security," "Draft architecture"

## Minimax
- Refactoring, bug fixing, dense implementation
- Use for: "Refactor to follow style," "Find race condition"

## Pre-Prompts

**Feature Implementation (Gemini):** "Review `PROJECT_PLAN.md` and `rules/`. Provide step-by-step plan before coding."

**Architecture Planning (Gemini):** "Review `PROJECT_PLAN.md`. Research best practices and draft update to `rules/architecture.md`."

**Bug/Restart (Either):** "Review `DEBUG_LOG.md`. Analyze failed attempts and propose new approach."
