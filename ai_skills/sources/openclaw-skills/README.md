# OpenClaw Prompts and Skills

If you've seen OpenClaw demos and wondered "how does it feel so human?" — this repo has the answer.

## The Short Version

OpenClaw's personality comes from markdown files. That's it. No secret sauce, no special model fine-tuning. Just well-crafted prompts that get injected into the system prompt before every message.

The same approach works with [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (Anthropic's official CLI). This repo contains the prompt files you need to get a similar experience.

## What's in Here

| File | Purpose |
|------|---------|
| `SOUL.md` | Core personality and values — "be genuinely helpful, have opinions, be resourceful" |
| `IDENTITY.md` | Name, creature type, vibe, emoji — the agent fills this in during first conversation |
| `USER.md` | Info about you — name, timezone, preferences, context |
| `CLAUDE.md` | Workspace behavior — memory system, safety rules, when to speak in group chats |
| `TOOLS.md` | Environment-specific notes — camera names, SSH hosts, speaker names |
| `BOOTSTRAP.md` | First-run ritual — guides the agent through figuring out who it is |
| `OPENCLAW_SYSTEM_PROMPT_STUDY.md` | Deep dive into how OpenClaw builds its system prompt |

## How to Use with Claude Code

1. Copy these files to your project directory (or `~/.claude/` for global use)
2. Rename `CLAUDE.md` to `CLAUDE.md` (Claude Code reads this automatically)
3. Start Claude Code and have a conversation

Claude Code will read `CLAUDE.md` on startup. You can `@mention` other files like `@SOUL.md` to include them in context.

For a more integrated experience, you can create a `settings.json` that includes these files automatically — see the [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code/settings).

## The System Prompt Study

`OPENCLAW_SYSTEM_PROMPT_STUDY.md` breaks down exactly how OpenClaw constructs its system prompt:

- Base identity injection
- Tool definitions
- Skill discovery
- Memory recall instructions
- Project context file injection (SOUL.md, IDENTITY.md, etc.)
- Message flow diagrams
- Heartbeat/proactive check-in system

If you want to understand why OpenClaw behaves the way it does, start there.

## Key Insights

**Memory is just files.** The agent reads `memory/YYYY-MM-DD.md` for recent context and `MEMORY.md` for long-term memories. It updates these files as it learns. No vector database, no embeddings — just markdown.

**Personality is explicit.** SOUL.md literally says things like "Have opinions. You're allowed to disagree." and "Be the assistant you'd actually want to talk to." The model follows these instructions.

**First impressions matter.** BOOTSTRAP.md creates that "coming alive" moment by having the agent ask "Who am I? Who are you?" on first run. It's theatrical, but it works.

**Group chat behavior is prompted.** The rules about when to stay silent (HEARTBEAT_OK), when to react vs reply, and how to avoid dominating conversations — all in the prompts.

## Telegram Bot (Proof of Concept)

`telegram-claude-poc.py` is a ~100 line script that connects Telegram to Claude Code. It's a minimal example of how OpenClaw's messaging works — receive message, call Claude, send response.

### Setup

1. **Install dependencies**
   ```bash
   pip install python-telegram-bot mistune
   ```

2. **Create a Telegram bot**
   - Message [@BotFather](https://t.me/BotFather) on Telegram
   - Send `/newbot` and follow the prompts
   - Copy the bot token

3. **Get your Telegram user ID**
   - Message [@userinfobot](https://t.me/userinfobot) on Telegram
   - It will reply with your user ID

4. **Create a `.env` file** (optional, or use environment variables)
   ```bash
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ALLOWED_USERS=123456789  # Your user ID, comma-separated for multiple
   ```

5. **Run the bot**
   ```bash
   python telegram-claude-poc.py
   ```

   Or with environment variables directly:
   ```bash
   TELEGRAM_BOT_TOKEN=xxx ALLOWED_USERS=123456789 python telegram-claude-poc.py
   ```

### How It Works

The bot calls Claude Code in headless mode:

```bash
claude -p "your message" --output-format json --allowedTools Read,Write,Edit,Bash,Glob,Grep,WebFetch,WebSearch
```

It maintains conversation continuity by saving session IDs and using `--resume` on subsequent messages.

### Commands

- `/new` — Clear session and start fresh
- `/status` — Check if you have an active session

### What This Demonstrates

This is the core of what OpenClaw does for messaging — the rest is polish:
- Channel adapters (WhatsApp, Discord, Signal, etc.)
- Heartbeat/proactive check-ins
- Markdown → platform-specific formatting
- Session persistence across restarts

The magic isn't in the infrastructure. It's in the prompts.

## Related

- [OpenClaw](https://github.com/openclaw/openclaw) — The full project
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — Anthropic's CLI
- [OpenClaw Docs](https://docs.openclaw.ai) — Official documentation

## License

These prompts are extracted from the OpenClaw project for educational purposes. See the original project for licensing.
