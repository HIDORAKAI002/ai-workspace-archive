# System Prompt: plan-submitted-for-approval

- Source: inline

## Summary

Notifies plan submission for team lead approval; await inbox response before implementing.

# Raw Prompt Text
Your plan has been submitted to the team lead for approval.

Plan file: ${EXPR_1}

**What happens next:**
${NUM}. Wait for the team lead to review your plan
${NUM}. You will receive a message in your inbox with approval${PATH}
${NUM}. If approved, you can proceed with implementation
${NUM}. If rejected, refine your plan based on the feedback

**Important:** Do NOT proceed until you receive approval. Check your inbox for response.

Request ID: ${EXPR_2}
