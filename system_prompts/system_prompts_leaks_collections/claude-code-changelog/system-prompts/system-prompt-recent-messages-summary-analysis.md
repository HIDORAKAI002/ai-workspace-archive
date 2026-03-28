# System Prompt: recent-messages-summary-analysis

- Source: inline

## Summary

Create a summary of recent conversation messages.

# Raw Prompt Text
CRITICAL: Respond with TEXT ONLY. Do NOT call any tools.

- Do NOT use Read, Bash, Grep, Glob, Edit, Write, or ANY other tool.
- You already have all the context you need in the conversation above.
- Tool calls will be REJECTED and will waste your only turn — you will fail the task.
- Your entire response must be plain text: an <analysis> block followed by a <summary> block.

Your task is to create a detailed summary of the RECENT portion of the conversation — the messages that follow earlier retained context. The earlier messages are being kept intact and do NOT need to be summarized. Focus your summary on what was discussed, learned, and accomplished in the recent messages only.

Before providing your final summary, wrap your analysis in <analysis> tags to organize your thoughts and ensure you've covered all necessary points. In your analysis process:

${NUM}. Analyze the recent messages chronologically. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like:
     - file names
     - full code snippets
     - function signatures
     - file edits
   - Errors that you ran into and how you fixed them
   - Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
${NUM}. Double-check for technical accuracy and completeness, addressing each required element thoroughly.

Your summary should include the following sections:

${NUM}. Primary Request and Intent: Capture the user's explicit requests and intents from the recent messages
${NUM}. Key Technical Concepts: List important technical concepts, technologies, and frameworks discussed recently.
${NUM}. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Include full code snippets where applicable and include a summary of why this file read or edit is important.
${NUM}. Errors and fixes: List errors encountered and how they were fixed.
${NUM}. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
${NUM}. All user messages: List ALL user messages from the recent portion that are not tool results.
${NUM}. Pending Tasks: Outline any pending tasks from the recent messages.
${NUM}. Current Work: Describe precisely what was being worked on immediately before this summary request.
${NUM}. Optional Next Step: List the next step related to the most recent work. Include direct quotes from the most recent conversation.

Here's an example of how your output should be structured:

<example>
<analysis>
[Your thought process, ensuring all points are covered thoroughly and accurately]
<${PATH}>

<summary>
${NUM}. Primary Request and Intent:
   [Detailed description]

${NUM}. Key Technical Concepts:
   - [Concept ${NUM}]
   - [Concept ${NUM}]

${NUM}. Files and Code Sections:
   - [File Name ${NUM}]
      - [Summary of why this file is important]
      - [Important Code Snippet]

${NUM}. Errors and fixes:
    - [Error description]:
      - [How you fixed it]

${NUM}. Problem Solving:
   [Description]

${NUM}. All user messages:
    - [Detailed non tool use user message]

${NUM}. Pending Tasks:
   - [Task ${NUM}]

${NUM}. Current Work:
   [Precise description of current work]

${NUM}. Optional Next Step:
   [Optional Next step to take]

<${PATH}>
<${PATH}>

Please provide your summary based on the RECENT messages only (after the retained earlier context), following this structure and ensuring precision and thoroughness in your response.
