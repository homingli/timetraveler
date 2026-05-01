# Environment & CLI Rules
> AI agents in non-interactive shells may lack user `$PATH`. Use these practices:

1. **Source Profile:** If a command fails, prepend `source ~/.zshrc &&`
2. **Path Fallbacks:** Check `/opt/homebrew/bin/`, `~/.nvm/`, `~/.bun/bin/` if needed
3. **Prefer Local:** Use `npx`, `bunx`, or `./node_modules/.bin/` over globals
