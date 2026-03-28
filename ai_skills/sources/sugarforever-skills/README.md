# Agent Skills

A collection of custom skills for Claude Code, Anthropic's official CLI for Claude. These skills extend Claude Code's capabilities with specialized, domain-specific functionality.

## What are Agent Skills?

Agent skills are modular extensions that provide Claude Code with specialized knowledge and tools for specific tasks. Each skill includes:

- **SKILL.md** - Skill definition with instructions and procedures
- **References** - Domain knowledge and pattern libraries
- **Scripts** - Automation tools and utilities
- **Assets** - Templates and supporting files

## Available Skills

### Next.js Security Scan

A comprehensive security vulnerability scanner for Next.js and TypeScript/JavaScript projects.

**Features:**
- OWASP Top 10:2025 vulnerability detection
- XSS and injection flaw identification
- Authentication and authorization issue detection
- Hardcoded secrets and credentials scanning
- Next.js-specific vulnerability checks
- Dependency audit for known CVEs
- Actionable security reports

**Scan Types:**
- **Quick Scan** - Fast scan for critical vulnerabilities
- **Full Scan** - Comprehensive security assessment
- **Targeted Scan** - Focus on specific vulnerability categories (XSS, injection, auth, secrets, deps, nextjs)

**Usage:**
```
/nextjs-security-scan
```

---

### Python Security Scan

A comprehensive security vulnerability scanner for Python projects including Flask, Django, and FastAPI applications.

**Features:**
- OWASP Top 10:2025 vulnerability detection
- Python-specific vulnerabilities (eval, exec, pickle, etc.)
- Framework auto-detection and framework-specific checks
- SQL/NoSQL/Command injection detection
- Insecure deserialization patterns
- Hardcoded secrets and credentials scanning
- Dependency audit via pip-audit/safety
- Actionable security reports with CWE references

**Supported Frameworks:**
- **Flask** - Template injection, session security, debug mode, CORS
- **Django** - ORM injection, CSRF, settings security, middleware
- **FastAPI** - Input validation, authentication, CORS, Pydantic security

**Scan Types:**
- **Quick Scan** - Critical vulnerabilities (secrets, dangerous functions, known CVEs)
- **Full Scan** - Comprehensive security assessment
- **Targeted Scan** - Focus on specific categories (injection, deserialization, auth, secrets, deps, crypto, flask, django, fastapi)

**Usage:**
```
/python-security-scan
```

---

### Subtitle Correction

Corrects speech recognition errors in subtitle files (.srt) while preserving exact timeline information.

**Features:**
- Chinese and English subtitle support
- Phonetic error correction (同音字/谐音)
- Technical term recognition (AI/ML, programming)
- English-Chinese mixed content handling
- Code identifier formatting (snake_case, camelCase)
- Interactive terminology collection workflow
- Validation script for structural integrity

**Workflow:**
1. Collects domain-specific terminology from user
2. Identifies speech recognition error patterns
3. Applies corrections while preserving timestamps
4. Validates output maintains structural integrity

**Usage:**
```
/subtitle-correction
```

---

### Diagram to Image

Converts Mermaid diagrams and Markdown tables to images (PNG/SVG) for platforms like X/Twitter that don't support rich formatting.

**Features:**
- Mermaid diagram to PNG/SVG conversion
- Markdown table to PNG conversion
- Smart output location detection (auto-finds `images/`, `assets/`, etc.)
- Intelligent filename generation based on content analysis
- Context-aware placement based on conversation

**Supported Content:**
- **Mermaid** - flowchart, sequence, class, state, ER, gantt, pie, mindmap, timeline, etc.
- **Markdown Tables** - with or without headers

**Smart Behavior:**
- Detects existing image directories in your project
- Generates descriptive filenames (e.g., `auth-flow.png`, `model-comparison.png`)
- Places images near related files when context is available

**Usage:**
```
"Convert this diagram to an image"
"Make this table a PNG for X"
"Export this flowchart as PNG"
```

---

### Publish X Article

Publish Markdown articles to X (Twitter) Articles editor with proper formatting. Automatically handles X Premium limitations by converting unsupported elements to images.

> **Credits:** This skill is inspired by and based on [wshuyi/x-article-publisher-skill](https://github.com/wshuyi/x-article-publisher-skill).

**Features:**
- Subscription-aware formatting (Premium vs Premium+)
- Cover image upload
- Markdown to rich text conversion
- Auto-converts unsupported elements (tables, mermaid diagrams, deep headers) to images
- Divider insertion via X's native menu
- Draft-only mode (never auto-publishes)

**Supported Formatting:**
- H2 headers, bold, italic, links
- Ordered and unordered lists
- Blockquotes
- Images (inline and cover)
- Dividers (via menu insertion)

**Usage:**
```
/publish-x-article
```

---

### China Stock Analysis (A股分析)

基于价值投资理论的中国A股分析工具，面向低频交易的普通投资者。使用 akshare 获取公开财务数据。

**Features:**
- 股票筛选器 - 多条件筛选符合价值投资标准的股票
- 财务分析 - 杜邦分析、盈利能力、偿债能力、成长性分析
- 估值计算 - DCF、DDM、相对估值三种方法
- 行业对比 - 同行业横向对比分析
- 财务异常检测 - 应收账款异常、现金流背离、存货异常等
- A股特色分析 - 政策敏感度、股东结构、质押比例

**Supported Workflows:**
- **Stock Screening** - 按PE/PB/ROE/股息率等条件筛选
- **Stock Analysis** - 个股深度分析（摘要/标准/深度三级）
- **Industry Comparison** - 同行业股票横向对比
- **Valuation Calculator** - 内在价值测算与安全边际计算

**Usage:**
```
分析贵州茅台
筛选PE小于15、ROE大于15%的沪深300股票
对比白酒行业前10名
计算600519的内在价值
```

## Project Structure

```
agent-skills/
├── skills/
│   ├── nextjs-security-scan/
│   │   ├── SKILL.md              # Skill definition
│   │   ├── references/           # Vulnerability pattern libraries
│   │   │   ├── owasp-top-10.md
│   │   │   ├── xss-patterns.md
│   │   │   ├── injection-patterns.md
│   │   │   ├── auth-vulnerabilities.md
│   │   │   └── nextjs-specific.md
│   │   ├── scripts/              # Automation tools
│   │   │   ├── dependency-audit.sh
│   │   │   ├── secret-scanner.py
│   │   │   └── pattern-scanner.py
│   │   └── assets/               # Templates
│   │       └── report-template.md
│   │
│   ├── python-security-scan/
│   │   ├── SKILL.md              # Skill definition
│   │   ├── references/           # Vulnerability pattern libraries
│   │   │   ├── owasp-top-10.md
│   │   │   ├── python-vulnerabilities.md
│   │   │   ├── injection-patterns.md
│   │   │   ├── deserialization.md
│   │   │   ├── flask-security.md
│   │   │   ├── django-security.md
│   │   │   └── fastapi-security.md
│   │   ├── scripts/              # Automation tools
│   │   │   ├── dependency-audit.sh
│   │   │   ├── secret-scanner.py
│   │   │   └── pattern-scanner.py
│   │   └── assets/               # Templates
│   │       └── report-template.md
│   │
│   ├── subtitle-correction/
│   │   ├── SKILL.md              # Skill definition
│   │   ├── references/           # Domain knowledge
│   │   │   ├── terminology.md
│   │   │   └── srt-format.md
│   │   └── scripts/              # Validation tools
│   │       └── subtitle_tool.py
│   │
│   ├── diagram-to-image/
│   │   ├── skill.md              # Skill definition
│   │   └── scripts/              # Conversion tools
│   │       └── table_to_image.py
│   │
│   ├── publish-x-article/
│   │   ├── SKILL.md              # Skill definition
│   │   └── scripts/              # Automation tools
│   │       ├── parse_markdown.py
│   │       ├── copy_to_clipboard.py
│   │       └── table_to_image.py
│   │
│   └── china-stock-analysis/
│       ├── SKILL.md              # Skill definition
│       ├── references/           # Value investing knowledge
│       │   ├── value-investing-principles.md
│       │   ├── financial-ratios.md
│       │   └── a-stock-features.md
│       ├── scripts/              # Analysis tools
│       │   ├── data_fetcher.py
│       │   ├── stock_screener.py
│       │   ├── financial_analyzer.py
│       │   └── valuation_calculator.py
│       └── templates/            # Report templates
│           └── analysis_report.md
├── .claude/                      # Claude Code configuration
├── LICENSE
└── README.md
```

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/sugarforever/agent-skills.git
   ```

2. Add the skills directory to your Claude Code configuration, or copy individual skills to your project's `.claude/skills/` directory.

## Creating New Skills

To create a new skill:

1. Create a new directory under `skills/` with your skill name
2. Add a `SKILL.md` file with:
   - YAML frontmatter (name, description)
   - Usage instructions
   - Procedures and workflows
3. Add supporting files as needed:
   - `references/` - Domain knowledge
   - `scripts/` - Automation tools
   - `assets/` - Templates and resources

## Requirements

### Next.js Security Scan
- Python 3.x (for secret scanner)
- Node.js and npm/yarn/pnpm (for dependency audit)
- jq (for JSON parsing in audit script)

### Python Security Scan
- Python 3.8+
- pip-audit or safety (for dependency audit): `pip install pip-audit`
- jq (optional, for JSON parsing)

### Diagram to Image
- Node.js and npm (for mermaid-cli)
- mermaid-cli: `npm install -g @mermaid-js/mermaid-cli`
- Python 3.x with Pillow: `pip install pillow`

### Publish X Article
- Python 3.9+ with dependencies:
  - macOS: `pip install Pillow pyobjc-framework-Cocoa markdown`
  - Windows: `pip install Pillow pywin32 clip-util markdown`
- Node.js and npm (for mermaid-cli): `npm install -g @mermaid-js/mermaid-cli`
- Playwright MCP for browser automation
- X Premium or Premium+ subscription

### China Stock Analysis
- Python 3.8+ with dependencies: `pip install akshare pandas numpy`
- Network access to akshare data sources (China mainland recommended)

## Acknowledgements

- **Publish X Article** skill is inspired by and based on [wshuyi/x-article-publisher-skill](https://github.com/wshuyi/x-article-publisher-skill). Thank you to the original author for the foundational work.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit pull requests with new skills or improvements to existing ones.
