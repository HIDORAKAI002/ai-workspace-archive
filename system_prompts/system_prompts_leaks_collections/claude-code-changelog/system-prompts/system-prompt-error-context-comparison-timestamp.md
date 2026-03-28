# System Prompt: error-context-comparison-timestamp

- Source: inline

## Summary

Analyzes error with context and timestamp details.

# Raw Prompt Text
=== ERROR ===
${EXPR_1}

=== CONTEXT COMPARISON ===
timestamp: ${EXPR_2}
model: ${EXPR_3}
mainLoopTokens: ${EXPR_4}
classifierChars: ${EXPR_5}
classifierTokensEst: ${EXPR_6}
transcriptEntries: ${EXPR_7}
messages: ${EXPR_8}
delta (classifierEst - mainLoop): ${EXPR_9}

=== ACTION BEING CLASSIFIED ===
${EXPR_10}

=== SYSTEM PROMPT ===
${EXPR_11}

=== USER PROMPT (transcript) ===
${EXPR_12}
