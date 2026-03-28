#!/Users/johnturner/.cc-tools-venv/bin/python
"""
Telegram bot that talks to headless Claude Code.
Proof of concept - ~60 lines.

Setup:
1. pip install python-telegram-bot
2. Get bot token from @BotFather on Telegram
3. Get your user ID from @userinfobot on Telegram
4. Run: TELEGRAM_BOT_TOKEN=xxx python telegram-claude-poc.py
"""

import subprocess
import json
import os
import html
from pathlib import Path
import mistune
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Load .env file if it exists
ENV_FILE = Path(__file__).parent / ".env"
if ENV_FILE.exists():
    for line in ENV_FILE.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
ALLOWED_USERS = [int(x) for x in os.environ.get("ALLOWED_USERS", "").split(",") if x]
SESSION_FILE = Path.home() / ".telegram-claude-sessions.json"

def load_sessions() -> dict:
    if SESSION_FILE.exists():
        return json.loads(SESSION_FILE.read_text())
    return {}

def save_sessions(sessions: dict):
    SESSION_FILE.write_text(json.dumps(sessions, indent=2))

class TelegramRenderer(mistune.HTMLRenderer):
    """Custom renderer for Telegram-compatible HTML."""

    def heading(self, text, level, **attrs):
        return f"<b>{text}</b>\n\n"

    def paragraph(self, text):
        return f"{text}\n\n"

    def list(self, text, ordered, **attrs):
        return text + "\n"

    def list_item(self, text, **attrs):
        return f"• {text}\n"

    def block_code(self, code, info=None):
        escaped = html.escape(code.strip())
        return f"<pre>{escaped}</pre>\n\n"

    def codespan(self, text):
        return f"<code>{html.escape(text)}</code>"

    def emphasis(self, text):
        return f"<i>{text}</i>"

    def strong(self, text):
        return f"<b>{text}</b>"

    def strikethrough(self, text):
        return f"<s>{text}</s>"

    def link(self, text, url, title=None):
        return f'<a href="{html.escape(url)}">{text}</a>'

    def image(self, text, url, title=None):
        return f'[Image: {text}]'

    def block_quote(self, text):
        return f"<blockquote>{text}</blockquote>\n"

    def thematic_break(self):
        return "\n---\n\n"

    def linebreak(self):
        return "\n"

    # Table support (Telegram doesn't support HTML tables, convert to text)
    def table(self, text):
        return f"<pre>{text}</pre>\n\n"

    def table_head(self, text):
        return text + "─" * 20 + "\n"

    def table_body(self, text):
        return text

    def table_row(self, text):
        return text + "\n"

    def table_cell(self, text, align=None, head=False):
        if head:
            return f"<b>{text}</b> │ "
        return f"{text} │ "

# Create markdown parser with GFM support
md = mistune.create_markdown(
    renderer=TelegramRenderer(escape=False),
    plugins=['strikethrough', 'table', 'task_lists', 'url']
)

def markdown_to_telegram_html(text: str) -> str:
    """Convert GitHub-flavored markdown to Telegram-compatible HTML."""
    result = md(text)
    # Clean up extra newlines
    result = result.strip()
    return result

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if ALLOWED_USERS and user_id not in ALLOWED_USERS:
        await update.message.reply_text("Not authorized.")
        return

    message = update.message.text
    sessions = load_sessions()

    # Build command with auto-approved tools
    cmd = [
        "claude", "-p", message,
        "--output-format", "json",
        "--allowedTools", "Read,Write,Edit,Bash,Glob,Grep,WebFetch,WebSearch"
    ]

    # Continue conversation if we have a session
    if str(user_id) in sessions:
        cmd.extend(["--resume", sessions[str(user_id)]])

    # Show typing indicator
    await update.message.chat.send_action("typing")

    # Run Claude Code
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True
    )

    try:
        data = json.loads(result.stdout)
        response = data.get("result", "No response")
        # Save session for continuity
        if data.get("session_id"):
            sessions[str(user_id)] = data["session_id"]
            save_sessions(sessions)
    except json.JSONDecodeError:
        response = result.stdout or result.stderr or "Error running Claude"

    # Convert markdown to Telegram HTML
    response = markdown_to_telegram_html(response)

    # Telegram has 4096 char limit
    if len(response) > 4000:
        response = response[:4000] + "\n\n... (truncated)"

    await update.message.reply_text(response, parse_mode="HTML")

async def new_session(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    sessions = load_sessions()
    if str(user_id) in sessions:
        del sessions[str(user_id)]
        save_sessions(sessions)
    await update.message.reply_text("Session cleared. Next message starts fresh.")

async def status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    sessions = load_sessions()
    has_session = str(user_id) in sessions
    await update.message.reply_text(
        f"User ID: {user_id}\n"
        f"Active session: {'Yes' if has_session else 'No'}"
    )

def main():
    if not BOT_TOKEN:
        print("Set TELEGRAM_BOT_TOKEN environment variable")
        return

    print(f"Starting bot...")
    print(f"Allowed users: {ALLOWED_USERS or 'Everyone (set ALLOWED_USERS to restrict)'}")

    app = Application.builder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("new", new_session))
    app.add_handler(CommandHandler("status", status))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("Bot running. Send messages on Telegram.")
    app.run_polling()

if __name__ == "__main__":
    main()
