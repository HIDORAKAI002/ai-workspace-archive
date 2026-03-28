# System Prompt: remote-control-sessions

- Source: inline

## Summary

Control local sessions remotely with Claude.

# Raw Prompt Text
Remote Control - Connect your local environment to claude.ai${PATH}

USAGE
  claude remote-control [options]
OPTIONS
  --name <name>                    Name for the session (shown in claude.ai${PATH})
  --permission-mode <mode>         Permission mode for spawned sessions
                                   (${EXPR_1})
  --debug-file <path>              Write debug logs to file
  -v, --verbose                    Enable verbose output
  -h, --help                       Show this help
${EXPR_2}
DESCRIPTION
  Remote Control allows you to control sessions on your local device from
  claude.ai${PATH} (${URL}). Run this command in the
  directory you want to work in, then connect from the Claude app or web.

  Remote Control runs as a persistent server that accepts multiple concurrent
  sessions in the current directory. One session is pre-created on start so
  you have somewhere to type immediately. Use --spawn=worktree to isolate
  each on-demand session in its own git worktree, or --spawn=session for
  the classic single-session mode (exits when that session ends). Press 'w'
  during runtime to toggle between same-dir and worktree.

NOTES
  - You must be logged in with a Claude account that has a subscription
  - Run `claude` first in the directory to accept the workspace trust dialog
  - Worktree mode requires a git repository or WorktreeCreate${PATH} hooks
