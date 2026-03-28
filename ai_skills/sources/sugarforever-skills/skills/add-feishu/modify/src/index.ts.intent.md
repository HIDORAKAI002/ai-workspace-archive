# Intent: src/index.ts modifications

## What changed
Added Feishu channel initialization alongside existing channels.

## Key sections

### Imports (top of file)
- Added: `FeishuChannel` from `./channels/feishu.js`
- Added: `readEnvFile` from `./env.js`

### main()
- Added: After WhatsApp connect, reads `FEISHU_APP_ID` and `FEISHU_APP_SECRET` via `readEnvFile()` (NanoClaw does NOT load `.env` into `process.env`)
- Added: If both are set, creates `FeishuChannel` with shared `channelOpts` plus `appId`/`appSecret`, pushes to `channels[]`, calls `connect()`

## Invariants
- All existing message processing logic is preserved
- WhatsApp channel creation is unchanged
- State management, recovery, scheduler, IPC — all unchanged
- The `channels[]` array and `findChannel()` routing already exist (added by multi-channel refactor)

## Must-keep
- All existing exports (`escapeXml`, `formatMessages`, `_setRegisteredGroups`)
- The `isDirectRun` guard at bottom
- All error handling and cursor rollback logic
- The `readEnvFile` pattern — all `.env` values must go through this function, NOT `process.env` alone
