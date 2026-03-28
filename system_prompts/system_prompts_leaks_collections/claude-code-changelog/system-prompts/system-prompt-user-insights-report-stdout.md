# System Prompt: user-insights-report-stdout

## Summary

Generated usage report with insights data.

# Raw Prompt Text
The user just ran ${PATH} to generate a usage report analyzing their Claude Code sessions.

Here is the full insights data:
${EXPR_1}

Report URL: stdio
HTML file: ${NUM}
Facets directory: ${EXPR_2}

Here is what the user sees:
null

Now output the following message exactly:

<message>
Your shareable insights report is ready:
stdio@anthropic-ai${PATH}

Want to dig into any section or try one of the suggestions?
<${PATH}>
