# System Prompt: memory-snapshot-heapdump

- Source: inline

## Summary

Displays memory state details in a heap dump.

# Raw Prompt Text
[HeapDump] Memory state:
  heapUsed: ${EXPR_1} GB (in snapshot)
  external: ${EXPR_2} GB (NOT in snapshot)
  rss: ${EXPR_3} GB (total process)
  ${EXPR_4}
