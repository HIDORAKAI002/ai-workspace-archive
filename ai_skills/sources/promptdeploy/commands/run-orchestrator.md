Use task-orchestrator to analyze and coordinate work

Pay close attention to the comments and restrictions in @CLAUDE.md

When working on the provided project:

- Use Web Search and Perplexity as needed for research and discovering resources.
- Use sequential-thinking when appropriate to break down tasks further.
- Use context7 whenever code examples might help.
- Before claiming anything is complete, save test results

The orchestrator will:

1. Initialize session with project name as channel
2. Save findings during investigation
3. Create checkpoint before major changes
4. Document what actually works vs what should work
5. Check task dependencies
6. Identify tasks that can run in parallel
7. Deploy executors for available work
8. Monitor progress and deploy new executors as tasks complete

Use task-executor for specific task implementation

When the orchestrator identifies task 2.3 needs work: The executor will
implement that specific task

DO NOT pause your work to ask if I would like to review or continue. Work
continuously until the entire project is completed. Commit your work to Git
after each time you reach a point where no tasks are currently running, just
before you begin the next task, but not stop and ask for my review or input.
Simply continue with your tasks until you reach completion.
