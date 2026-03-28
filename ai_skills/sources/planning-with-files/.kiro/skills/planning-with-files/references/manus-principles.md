# Manus context engineering (reference)

This workflow is inspired by **Manus**-style context engineering: treat markdown on disk as durable working memory while the model context window behaves like volatile RAM.

**Kiro layout:** planning files live under **`.kiro/plan/`** (not the project root). See [Kiro Steering — file references](https://kiro.dev/docs/steering/) for `#[[file:path]]` live includes.

---

# Reference: Manus Context Engineering Principles

This skill is based on context engineering principles from Manus, the AI agent company acquired by Meta for $2 billion in December 2025.

## The 6 Manus Principles

### Principle 1: Design Around KV-Cache

> "KV-cache hit rate is THE single most important metric for production AI agents."

**Statistics:**
- ~100:1 input-to-output token ratio
- Cached tokens: $0.30/MTok vs Uncached: $3/MTok
- 10x cost difference!

**Implementation:**
- Keep prompt prefixes STABLE (single-token change invalidates cache)
- NO timestamps in system prompts
- Make context APPEND-ONLY with deterministic serialization

### Principle 2: Mask, Don't Remove

Don't dynamically remove tools (breaks KV-cache). Use logit masking instead.

**Best Practice:** Use consistent action prefixes (e.g., `browser_`, `shell_`, `file_`) for easier masking.

### Principle 3: Filesystem as External Memory

> "Markdown is my 'working memory' on disk."

**The Formula:**
```
Context Window = RAM (volatile, limited)
Filesystem = Disk (persistent, unlimited)
```

**Compression Must Be Restorable:**
- Keep URLs even if web content is dropped
- Keep file paths when dropping document contents
- Never lose the pointer to full data

### Principle 4: Manipulate Attention Through Recitation

> "Creates and updates todo.md throughout tasks to push global plan into model's recent attention span."

**Problem:** After ~50 tool calls, models forget original goals ("lost in the middle" effect).

**Solution:** Re-read `.kiro/plan/task_plan.md` before major decisions. Goals appear in the attention window.

### Principle 5: Keep the Wrong Stuff In

> "Leave the wrong turns in the context."

**Why:**
- Failed actions with stack traces let model implicitly update beliefs
- Reduces mistake repetition
- Error recovery is "one of the clearest signals of TRUE agentic behavior"

### Principle 6: Don't Get Few-Shotted

> "Uniformity breeds fragility."

**Problem:** Repetitive action-observation pairs cause drift and hallucination.

**Solution:** Introduce controlled variation:
- Vary phrasings slightly
- Don't copy-paste patterns blindly
- Recalibrate on repetitive tasks

---

## The 3 Context Engineering Strategies

Based on Lance Martin's analysis of Manus architecture.

### Strategy 1: Context Reduction

**Compaction:**
```
Tool calls have TWO representations:
├── FULL: Raw tool content (stored in filesystem)
└── COMPACT: Reference/file path only

RULES:
- Apply compaction to STALE (older) tool results
- Keep RECENT results FULL (to guide next decision)
```

### Strategy 2: Context Isolation (Multi-Agent)

Multi-agent setups can isolate exploration in separate contexts while persisting shared state in files (e.g. under `.kiro/plan/`).

### Strategy 3: Context Offloading

- Store full results in the filesystem, not only in context
- Progressive disclosure: load information only as needed

---

## File Types (Kiro paths)

| File | Purpose |
|------|---------|
| `.kiro/plan/task_plan.md` | Phase tracking, progress |
| `.kiro/plan/findings.md` | Discoveries, decisions |
| `.kiro/plan/progress.md` | Session log |

---

## Source

Manus context engineering blog:
https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
