---
name: diagram-to-image
description: Convert Mermaid diagrams and Markdown tables to images (PNG) for platforms that don't support rich formatting. Use when user asks to "convert to image", "export as PNG", "make this an image", or has content for X/Twitter that needs visual exports.
---

# Diagram to Image

Convert Mermaid diagrams and Markdown tables to PNG images via the mermaid-red API (diagramless.xyz). Produces high-quality, styled output with custom themes — no heavy local dependencies needed.

## When to Use

Use this skill when:
- User has a Mermaid diagram that needs to be converted to an image
- User has a Markdown table that needs to be converted to an image
- User is writing content for X/Twitter and needs visual exports
- User asks to "convert to image", "export as PNG", "make this an image", or similar

## Prerequisites

The bundled script uses Node.js built-in `fetch` (Node 18+). No npm install needed.

```bash
# The render script is bundled with this skill:
SKILL_DIR=~/.claude/skills/diagram-to-image/scripts
ls $SKILL_DIR/diagram-to-image.mjs
```


## Smart Output Location

**IMPORTANT:** Determine the best output location based on context. Follow this decision tree:

### 1. User Specifies Path
If user explicitly mentions a path or filename, use that.

### 2. Project Context Detection
Check for common image/asset directories in the current project:

```bash
# Check for existing image directories (in order of preference)
ls -d ./images ./assets ./img ./static ./public/images ./assets/images 2>/dev/null | head -1
```

Use the first existing directory found. Common patterns:
- `./images/` - General projects
- `./assets/` - Web projects
- `./assets/images/` - Structured web projects
- `./public/images/` - Next.js, React projects
- `./static/` - Hugo, other static site generators
- `./img/` - Short form convention

### 3. Article/Document Context
If user is writing an article or document:
- Look for the document's directory
- Create `images/` subdirectory if appropriate
- Name the image based on the document name + descriptor

### 4. Conversation Context
Analyze the conversation to determine:
- **What the diagram represents** → Use for filename (e.g., `auth-flow.png`, `user-journey.png`)
- **Related file being discussed** → Place image near that file
- **Topic being discussed** → Use for naming

### 5. Default Fallback
If no context clues:
- Use current working directory
- Generate descriptive filename from diagram content

## Filename Generation

Create meaningful filenames based on content analysis:

| Content Pattern | Example Filename |
|----------------|------------------|
| `flowchart` with auth/login | `auth-flow.png` |
| `sequenceDiagram` with API | `api-sequence.png` |
| `erDiagram` | `entity-relationship.png` |
| `pie` chart about X | `x-distribution.png` |
| `gantt` chart | `project-timeline.png` |
| Table with comparison | `comparison-table.png` |
| Table with data | `data-table.png` |

**Rules:**
- Use kebab-case (lowercase with hyphens)
- Keep names concise but descriptive (2-4 words)
- Avoid generic names like `diagram.png` or `image.png`
- Include topic/subject when identifiable

## Conversion Process

### Step 1: Analyze Context

Before converting, gather context:
1. Check current working directory
2. Look for existing image directories
3. Analyze diagram/table content for naming
4. Consider any files or topics mentioned in conversation

### Step 2: Determine Output Path

```bash
# Example logic (implement mentally, not as literal script)
if user_specified_path:
    output_path = user_specified_path
elif exists("./images"):
    output_path = "./images/{generated_name}.png"
elif exists("./assets"):
    output_path = "./assets/{generated_name}.png"
elif exists("./public/images"):
    output_path = "./public/images/{generated_name}.png"
else:
    output_path = "./{generated_name}.png"
```

### Step 3: Create Temporary Input File

```bash
# For Mermaid diagrams
cat > /tmp/diagram.mmd << 'DIAGRAM_EOF'
<mermaid content>
DIAGRAM_EOF

# For Markdown tables
cat > /tmp/table.md << 'TABLE_EOF'
<table content>
TABLE_EOF
```

### Step 4: Convert via mermaid-red API

The API auto-detects content type (mermaid vs table). Both use the same command.

**Using the bundled script:**
```bash
# Mermaid diagram
node ~/.claude/skills/diagram-to-image/scripts/diagram-to-image.mjs /tmp/diagram.mmd -o <output_path>.png

# Markdown table
node ~/.claude/skills/diagram-to-image/scripts/diagram-to-image.mjs /tmp/table.md -o <output_path>.png

# With custom theme
node ~/.claude/skills/diagram-to-image/scripts/diagram-to-image.mjs /tmp/diagram.mmd -o <output_path>.png --theme ocean

# Force content type (if auto-detect gets it wrong)
node ~/.claude/skills/diagram-to-image/scripts/diagram-to-image.mjs /tmp/table.md -o <output_path>.png --type table
```

**Available options:**
- `--theme <name>` — default, dark, forest, neutral, ocean, emerald, midnight, slate, lavender, blueprint
- `--type <type>` — auto (default), mermaid, table
- `--scale <n>` — 1-4 (default: 2, for 2x DPI)
- `--bg <color>` — Background color (default: white, use "transparent" for no bg)
- `--server <url>` — Override server (default: https://diagramless.xyz)

**Piping from stdin also works:**
```bash
echo "graph TD; A-->B" | node ~/.claude/skills/diagram-to-image/scripts/diagram-to-image.mjs -o out.png
cat /tmp/table.md | node ~/.claude/skills/diagram-to-image/scripts/diagram-to-image.mjs --type table -o table.png
```

### Step 5: Report Result

After conversion, tell the user:
1. **Full path** where image was saved
2. **Why** that location was chosen (briefly)
3. **File size** in bytes (printed by the script)
4. Suggest they can specify a different location if needed

## Examples

### Example 1: Project with images/ directory

**Context:** User is in a project that has `./images/` directory, discussing authentication.

**User:** "Convert this to an image"
```
flowchart TD
    A[Login] --> B{Valid?}
    B -->|Yes| C[Dashboard]
    B -->|No| D[Error]
```

**Action:**
1. Detect `./images/` exists
2. Analyze content → authentication flow
3. Generate filename: `login-flow.png`
4. Save content to `/tmp/diagram.mmd`
5. Run: `node ~/.claude/skills/diagram-to-image/scripts/diagram-to-image.mjs /tmp/diagram.mmd -o ./images/login-flow.png`

---

### Example 2: Writing X article about AI with ocean theme

**Context:** User mentioned writing an article about AI agents for X.

**User:** "Make this a PNG with ocean theme"
```
flowchart LR
    User --> Agent --> Tools --> Response
```

**Action:**
1. Save content to `/tmp/diagram.mmd`
2. Run: `node ~/.claude/skills/diagram-to-image/scripts/diagram-to-image.mjs /tmp/diagram.mmd -o ./ai-agent-flow.png --theme ocean`

---

### Example 3: Data comparison table

**User:** "Export this table as image"
```
| Model | Speed | Accuracy |
|-------|-------|----------|
| GPT-4 | Slow | High |
| Claude | Fast | High |
```

**Action:**
1. Save content to `/tmp/table.md`
2. Run: `node ~/.claude/skills/diagram-to-image/scripts/diagram-to-image.mjs /tmp/table.md -o ./model-comparison.png`
   (auto-detects as table)

---

### Example 4: User specifies location

**User:** "Save this diagram to ~/Desktop/my-chart.png"

**Action:** Use exactly `~/Desktop/my-chart.png` as output path.

## Error Handling

- If the API server is unreachable, the script prints a clear error message
- If content type auto-detection fails, use `--type mermaid` or `--type table` explicitly
- For local development/testing, use `--server http://localhost:3000`
