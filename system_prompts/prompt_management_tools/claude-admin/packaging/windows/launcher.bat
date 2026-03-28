@echo off
:: ClaudeAdmin launcher — starts the server and opens the browser.
start "ClaudeAdmin Server" /min "%~dp0claude-admin-backend.exe"
timeout /t 3 /nobreak >nul
start "" http://localhost:9022
