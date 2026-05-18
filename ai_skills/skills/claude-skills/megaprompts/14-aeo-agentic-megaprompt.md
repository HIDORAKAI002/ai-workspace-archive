#  Agentic Answer Engine Optimization Application

> **Build a production-ready, agentic-driven AEO application using Claude Agent SDK**
> Multi-agent orchestration system for automated content optimization, citation tracking, and LLM performance analysis

---

## 🎯 PROJECT OVERVIEW

### What We're Building

A **self-service Answer Engine Optimization (AEO) application** that uses the Claude Agent SDK to build an intelligent multi-agent system. The application helps marketers and SEO specialists optimize their content to be cited by AI language models (ChatGPT, Perplexity, Claude, Gemini, Mistral) through automated workflows powered by specialized AI agents.

### Core Value Proposition

- **Automated AEO Workflows**: Run complete optimization campaigns with a single command
- **Intelligent Agent Coordination**: Orchestrator agent manages 6 specialized subagents for optimal task execution
- **Quality Assurance**: Built-in validation, error handling, and executive summarization
- **Cost-Effective**: Leverage Claude Code CLI + Max Pro plan for 60%+ cost savings

---

## 🏗️ SYSTEM ARCHITECTURE

### Architecture Type: Multi-Agent Orchestration System

```
┌──────────────────────────────────────────────────────────────┐
│                    USER INTERFACE LAYER                      │
├──────────────┬─────────────────────────────────┬─────────────┤
│  CLI Client  │       Web API (FastAPI)         │  Slash Cmds │
└──────────────┴──────────────┬──────────────────┴─────────────┘
                               │
                               ▼
         ┌────────────────────────────────────────────┐
         │      ORCHESTRATOR AGENT (Main Agent)       │
         │  - Task Decomposition                      │
         │  - Workflow Coordination                   │
         │  - Quality Validation                      │
         │  - Executive Reporting                     │
         └────────────────────────────────────────────┘
                               │
         ┌─────────────────────┴─────────────────────┐
         │        AGENT COMMUNICATION LAYER          │
         │      (JSON + Markdown Hybrid Protocol)    │
         └─────────────────────┬─────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐      ┌───────────────┐     ┌──────────────┐
│   Auditor     │      │   Optimizer   │     │   Tracker    │
│    Agent      │      │     Agent     │     │    Agent     │
└───────────────┘      └───────────────┘     └──────────────┘
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐      ┌───────────────┐     ┌──────────────┐
│  Researcher   │      │   Reporter    │     │   Learning   │
│    Agent      │      │     Agent     │     │    Agent     │
└───────────────┘      └───────────────┘     └──────────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                               ▼
              ┌───────────────────────────────-─┐
              │    AEO SKILL (Python Modules)   │
              │  - content_analyzer.py          │
              │  - optimizer.py                 │
              │  - citation_tracker.py          │
              │  - query_researcher.py          │
              │  - report_generator.py          │
              │  - success_patterns.py          │
              └─────────────────────────────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │    DATA PERSISTENCE LAYER      │
              │  - .aeo-agent-data/            │
              │    ├── campaigns/              │
              │    ├── workflows/              │
              │    ├── agent_outputs/          │
              │    └── success_patterns.json   │
              └────────────────────────────────┘
```

### Deployment Model: Hybrid (CLI + Web API)

- **CLI Application**: Terminal-based for automation and power users
- **Web API (FastAPI)**: RESTful API for programmatic access
- **No Frontend**: Focus on backend orchestration (frontend can be added later)

---

## 🤖 AGENT SYSTEM DESIGN

### 1. Orchestrator Agent (Main Coordinator)

**Responsibilities**:
1. **Task Decomposition**:
   - Parse user requests into discrete subtasks
   - Determine which specialized agents to invoke
   - Create workflow execution plan with dependencies

2. **Workflow Coordination**:
   - Manage agent execution order (sequential vs parallel)
   - Handle inter-agent dependencies
   - Monitor progress and handle failures
   - Implement retry logic for failed tasks

3. **Quality Validation**:
   - Validate each subagent's output against quality criteria
   - Request revisions if output doesn't meet standards
   - Ensure consistency across agent outputs

4. **Executive Reporting**:
   - Synthesize subagent results into cohesive report
   - Generate executive summary
   - Provide actionable recommendations
   - Calculate ROI and metrics

**Communication Protocol**:
- **Receives**: User requests (natural language or structured commands)
- **Sends to Subagents**: Task specifications (JSON format)
- **Receives from Subagents**: Results (Hybrid JSON + Markdown)
- **Outputs**: Executive report (Markdown) + Structured data (JSON)

**Example Workflow**:
```python
# /aeo-campaign https://blog.com/article

Orchestrator receives request
  ↓
Decompose into tasks:
  1. Audit content (→ Auditor Agent)
  2. Research queries (→ Researcher Agent)
  3. Optimize content (→ Optimizer Agent)
  4. Track citations (→ Tracker Agent)
  5. Generate report (→ Reporter Agent)
  ↓
Execute tasks (parallel where possible):
  - Run Auditor + Researcher in parallel
  - Wait for completion
  - Run Optimizer (depends on Auditor results)
  - Run Tracker (parallel with Optimizer)
  - Run Reporter (depends on all above)
  ↓
Validate outputs:
  - Check Auditor score >= 0 (valid)
  - Check Optimizer improvement > 0 (successful)
  - Check Reporter completeness
  ↓
Generate executive summary:
  - Overall AEO score: 65 → 82 (+17 points)
  - Critical issues addressed: 3
  - Estimated citation improvement: 35%
  - Next steps: Monitor for 14 days
```

---

### 2. Content Auditor Agent

**Specialization**: Comprehensive content audits and gap analysis

**Capabilities**:
- Run E-E-A-T analysis (Experience, Expertise, Authoritativeness, Trustworthiness)
- Analyze content structure for LLM optimization
- Assess citation quality
- Calculate readability metrics
- Identify gaps compared to competitors

**Input** (from Orchestrator):
```json
{
  "task": "audit_content",
  "url": "https://blog.com/article",
  "context": {
    "industry": "SaaS",
    "competitors": ["competitor1.com", "competitor2.com"]
  }
}
```

**Output** (to Orchestrator):
```json
{
  "status": "success",
  "agent": "auditor",
  "task_id": "audit_20250107_001",
  "timestamp": "2025-01-07T10:30:00Z",
  "results": {
    "overall_score": 65,
    "scores": {
      "eeat": 58,
      "structure": 72,
      "citations": 45,
      "readability": 80
    },
    "critical_issues": [
      "No authoritative citations",
      "Missing author credentials",
      "Poor content structure"
    ],
    "recommendations": [...],
    "competitor_comparison": {...}
  },
  "markdown_report": "# Audit Report\n\n..."
}
```

**Uses AEO Skill**: `content_analyzer.py` module

---

### 3. Content Optimizer Agent

**Specialization**: AEO-optimized content generation

**Capabilities**:
- Apply audit recommendations
- Generate optimized content versions
- Preserve brand voice while enhancing AEO signals
- Add citations, improve structure, enhance E-E-A-T
- Compare before/after performance

**Input**:
```json
{
  "task": "optimize_content",
  "url": "https://blog.com/article",
  "audit_results": {...},  // From Auditor Agent
  "optimization_level": "balanced",
  "focus_areas": ["citations", "eeat"]
}
```

**Output**:
```json
{
  "status": "success",
  "agent": "optimizer",
  "results": {
    "before_score": 65,
    "after_score": 82,
    "improvement": 17,
    "changes_applied": [
      "Added 5 authoritative citations",
      "Restructured into 6 H2 sections",
      "Added author bio with credentials"
    ],
    "optimized_content": "...",
    "estimated_citation_improvement": 0.35
  },
  "markdown_report": "# Optimization Report\n\n..."
}
```

**Uses AEO Skill**: `optimizer.py` module

---

### 4. Citation Tracker Agent

**Specialization**: LLM citation monitoring and trend analysis

**Capabilities**:
- Monitor citations across ChatGPT, Perplexity, Claude, Gemini, Mistral
- Track citation frequency and trends
- Analyze query variations that trigger citations
- Alert on ranking changes
- Generate citation performance reports

**Input**:
```json
{
  "task": "track_citations",
  "url": "https://blog.com/article",
  "target_llms": ["ChatGPT", "Perplexity", "Claude", "Gemini"],
  "queries": ["project management software", "best pm tools"],
  "tracking_period_days": 14
}
```

**Output**:
```json
{
  "status": "success",
  "agent": "tracker",
  "results": {
    "total_citations": 12,
    "llm_breakdown": {
      "ChatGPT": 5,
      "Perplexity": 4,
      "Claude": 2,
      "Gemini": 1
    },
    "trending": "improving",
    "citation_rate": 0.42,
    "alerts": ["New citation on Perplexity for query 'pm tools'"]
  },
  "markdown_report": "# Citation Tracking Report\n\n..."
}
```

**Uses AEO Skill**: `citation_tracker.py` module

---

### 5. Query Researcher Agent

**Specialization**: Query opportunities and competitor analysis

**Capabilities**:
- Research high-value query opportunities
- Analyze competitor citation strategies
- Identify content gaps
- Generate target query lists
- Recommend content angles

**Input**:
```json
{
  "task": "research_queries",
  "topic": "project management software",
  "industry": "SaaS",
  "competitors": ["competitor1.com", "competitor2.com"]
}
```

**Output**:
```json
{
  "status": "success",
  "agent": "researcher",
  "results": {
    "target_queries": [
      {"query": "best project management software", "priority": "high", "citation_potential": 0.85},
      {"query": "pm tools for remote teams", "priority": "high", "citation_potential": 0.78}
    ],
    "competitor_analysis": {...},
    "content_gaps": [...],
    "recommended_angles": [...]
  },
  "markdown_report": "# Query Research Report\n\n..."
}
```

**Uses AEO Skill**: `query_researcher.py` module

---

### 6. Report Generator Agent

**Specialization**: Client-ready reports and executive summaries

**Capabilities**:
- Synthesize results from all agents
- Generate markdown reports
- Create executive summaries
- Calculate ROI metrics
- Produce client deliverables

**Input**:
```json
{
  "task": "generate_report",
  "campaign_id": "camp_20250107_001",
  "agent_results": {
    "auditor": {...},
    "optimizer": {...},
    "tracker": {...},
    "researcher": {...}
  },
  "report_type": "executive"
}
```

**Output**:
```json
{
  "status": "success",
  "agent": "reporter",
  "results": {
    "report_path": ".aeo-agent-data/reports/camp_20250107_001_report.md",
    "executive_summary": "...",
    "key_metrics": {
      "score_improvement": 17,
      "citations_gained": 12,
      "roi_estimate": "35% increase in LLM citations"
    }
  },
  "markdown_report": "# Executive Report\n\n..."
}
```

**Uses AEO Skill**: `report_generator.py` module

---

### 7. Learning Optimizer Agent

**Specialization**: Adaptive learning and pattern analysis

**Capabilities**:
- Analyze success patterns across campaigns
- Identify what optimizations work best
- Update recommendation strategies
- Build industry-specific knowledge base
- Improve orchestrator decision-making

**Input**:
```json
{
  "task": "analyze_patterns",
  "campaigns": ["camp_001", "camp_002", "camp_003"],
  "industry": "SaaS"
}
```

**Output**:
```json
{
  "status": "success",
  "agent": "learning",
  "results": {
    "successful_patterns": [
      {
        "pattern": "Adding authoritative .gov/.edu citations",
        "success_rate": 0.87,
        "avg_improvement": 3.2
      }
    ],
    "industry_insights": {...},
    "recommended_strategy_updates": [...]
  },
  "markdown_report": "# Learning Analysis Report\n\n..."
}
```

**Uses AEO Skill**: `success_patterns.py` module

---

## 📋 SLASH COMMANDS

### 1. `/aeo-campaign <url> [options]`

**Purpose**: Launch complete end-to-end AEO campaign

**Workflow**:
```
1. Content Audit (Auditor Agent)
2. Query Research (Researcher Agent) [parallel with 1]
3. Content Optimization (Optimizer Agent)
4. Citation Tracking Setup (Tracker Agent)
5. Report Generation (Reporter Agent)
6. Executive Summary (Orchestrator)
```

**Usage**:
```bash
# Basic campaign
/aeo-campaign https://blog.com/article

# With options
/aeo-campaign https://blog.com/article --industry SaaS --level aggressive --track 30
```

**Expected Output**:
- Comprehensive audit report
- Optimized content version
- Citation tracking setup (30 days)
- Executive summary with ROI estimate
- Actionable next steps

**Orchestrator Logic**:
```python
async def execute_campaign(url, options):
    # 1. Decompose into tasks
    tasks = {
        "audit": {"agent": "auditor", "priority": 1},
        "research": {"agent": "researcher", "priority": 1},
        "optimize": {"agent": "optimizer", "priority": 2, "depends_on": ["audit"]},
        "track": {"agent": "tracker", "priority": 3},
        "report": {"agent": "reporter", "priority": 4, "depends_on": ["audit", "optimize", "track"]}
    }

    # 2. Execute tasks respecting dependencies
    results = {}
    for priority in [1, 2, 3, 4]:
        tasks_at_priority = [t for t in tasks if t["priority"] == priority]
        results.update(await execute_parallel(tasks_at_priority))

    # 3. Validate outputs
    validate_all_results(results)

    # 4. Generate executive summary
    return create_executive_summary(results)
```

---

### 2. `/aeo-compete <topic> <competitors...>`

**Purpose**: Deep competitive analysis for AEO strategies

**Workflow**:
```
1. Query Research for topic (Researcher Agent)
2. Competitor Content Audit (Auditor Agent per competitor)
3. Citation Analysis (Tracker Agent)
4. Gap Analysis (Researcher Agent)
5. Strategy Report (Reporter Agent)
```

**Usage**:
```bash
/aeo-compete "project management" competitor1.com competitor2.com competitor3.com
```

**Expected Output**:
- Competitor AEO scores comparison
- Citation frequency analysis
- Content gap identification
- Recommended differentiation strategy
- Target query opportunities

---

### 3. `/aeo-monitor <url> [duration_days]`

**Purpose**: Continuous citation monitoring with alerts

**Workflow**:
```
1. Initial Baseline Audit (Auditor Agent)
2. Set up Tracking (Tracker Agent)
3. Scheduled Citation Checks (daily)
4. Alert on Changes (Tracker Agent)
5. Weekly Summary Reports (Reporter Agent)
```

**Usage**:
```bash
/aeo-monitor https://blog.com/article 90  # Monitor for 90 days
```

**Expected Output**:
- Initial baseline metrics
- Daily citation checks across 5 LLMs
- Alerts on ranking changes
- Weekly trend reports
- Final 90-day performance summary

---

## 🔄 AGENT COMMUNICATION PROTOCOL

### Standard Message Format

**Task Assignment (Orchestrator → Subagent)**:
```json
{
  "message_id": "msg_20250107_001",
  "timestamp": "2025-01-07T10:30:00Z",
  "from": "orchestrator",
  "to": "auditor",
  "message_type": "task_assignment",
  "task": {
    "task_id": "audit_20250107_001",
    "task_type": "audit_content",
    "priority": "high",
    "deadline": "2025-01-07T11:00:00Z",
    "input_data": {
      "url": "https://blog.com/article",
      "context": {...}
    },
    "quality_criteria": {
      "min_score": 0,
      "required_sections": ["eeat", "structure", "citations"],
      "max_execution_time_seconds": 300
    }
  }
}
```

**Task Result (Subagent → Orchestrator)**:
```json
{
  "message_id": "msg_20250107_002",
  "timestamp": "2025-01-07T10:45:00Z",
  "from": "auditor",
  "to": "orchestrator",
  "message_type": "task_result",
  "task_id": "audit_20250107_001",
  "status": "success",  // or "failed", "partial"
  "execution_time_seconds": 127,
  "results": {
    // Agent-specific results (structured data)
  },
  "markdown_report": "# Report Title\n\n...",
  "errors": [],  // Empty if successful
  "warnings": ["Warning: competitor1.com returned 404"],
  "metadata": {
    "aeo_skill_version": "1.0.0",
    "confidence_score": 0.95
  }
}
```

**Revision Request (Orchestrator → Subagent)**:
```json
{
  "message_id": "msg_20250107_003",
  "timestamp": "2025-01-07T10:50:00Z",
  "from": "orchestrator",
  "to": "auditor",
  "message_type": "revision_request",
  "original_task_id": "audit_20250107_001",
  "revision_reason": "Missing competitor comparison section",
  "required_changes": [
    "Add competitor benchmark for competitor1.com and competitor2.com",
    "Include citation quality comparison"
  ],
  "deadline": "2025-01-07T11:15:00Z"
}
```

### Quality Validation Rules

**Orchestrator validates each subagent output**:

1. **Status Check**:
   - `status === "success"` → Continue
   - `status === "failed"` → Retry up to 3 times, then abort workflow
   - `status === "partial"` → Request revision

2. **Completeness Check**:
   - All required fields present in `results`
   - Markdown report generated
   - No critical errors

3. **Quality Criteria Check**:
   - Agent-specific validation (e.g., Auditor must have `overall_score >= 0`)
   - Execution time within limits
   - Confidence score >= 0.7

4. **Consistency Check**:
   - Results align with input parameters
   - No conflicting data across agents

---

## 💾 DATA PERSISTENCE

### Storage Structure

```
.aeo-agent-data/
├── campaigns/
│   ├── camp_20250107_001/
│   │   ├── metadata.json          # Campaign info
│   │   ├── orchestrator_log.json  # Orchestrator decisions
│   │   ├── agent_outputs/         # Individual agent results
│   │   │   ├── auditor_output.json
│   │   │   ├── optimizer_output.json
│   │   │   ├── tracker_output.json
│   │   │   ├── researcher_output.json
│   │   │   └── reporter_output.json
│   │   └── final_report.md        # Executive summary
│   └── camp_20250107_002/
│       └── ...
├── workflows/
│   ├── workflow_templates.json    # Reusable workflow definitions
│   └── active_workflows.json      # Currently running workflows
├── monitoring/
│   ├── active_monitors.json       # /aeo-monitor tracking
│   └── citation_history.csv       # Historical citation data
├── success_patterns.json          # Adaptive learning data
└── config.json                    # Application configuration
```

### File Formats

**Campaign Metadata** (`metadata.json`):
```json
{
  "campaign_id": "camp_20250107_001",
  "created_at": "2025-01-07T10:30:00Z",
  "command": "/aeo-campaign https://blog.com/article",
  "status": "completed",
  "url": "https://blog.com/article",
  "options": {
    "industry": "SaaS",
    "optimization_level": "balanced"
  },
  "workflow_id": "workflow_campaign_v1",
  "duration_seconds": 487,
  "final_score": 82,
  "score_improvement": 17
}
```

**Orchestrator Log** (`orchestrator_log.json`):
```json
{
  "campaign_id": "camp_20250107_001",
  "decisions": [
    {
      "timestamp": "2025-01-07T10:30:05Z",
      "decision": "task_decomposition",
      "reasoning": "Decomposed /aeo-campaign into 5 tasks: audit, research, optimize, track, report",
      "tasks_created": ["audit_001", "research_001", "optimize_001", "track_001", "report_001"]
    },
    {
      "timestamp": "2025-01-07T10:30:10Z",
      "decision": "parallel_execution",
      "reasoning": "audit and research have no dependencies, executing in parallel",
      "tasks": ["audit_001", "research_001"]
    },
    {
      "timestamp": "2025-01-07T10:45:30Z",
      "decision": "quality_validation",
      "reasoning": "Auditor output validation passed all criteria",
      "task": "audit_001",
      "validation_result": "passed"
    }
  ],
  "metrics": {
    "total_tasks": 5,
    "successful_tasks": 5,
    "failed_tasks": 0,
    "revisions_requested": 0
  }
}
```

---

## 🛠️ TECHNICAL IMPLEMENTATION

### Technology Stack

**Backend**:
- **Language**: Python 3.10+
- **Agent Framework**: Claude Agent SDK (via Claude Code CLI)
- **Web API**: FastAPI (async support, auto-generated docs)
- **CLI**: Click (command-line interface)
- **Task Queue**: asyncio (built-in, no external dependencies)

**Testing**:
- **Unit Tests**: pytest (>80% coverage)
- **Integration Tests**: pytest-asyncio
- **E2E Tests**: Test full workflows

**Dependencies**:
```txt
# Core
claude-sdk>=0.1.0          # Claude Agent SDK
fastapi>=0.104.0           # Web API
uvicorn>=0.24.0            # ASGI server
click>=8.1.0               # CLI framework
pydantic>=2.5.0            # Data validation

# AEO Skill (already packaged)
# No additional dependencies - uses local modules

# Development
pytest>=7.4.0
pytest-asyncio>=0.21.0
pytest-cov>=4.1.0
black>=23.11.0
mypy>=1.7.0
```

### Project Structure

```
agentic-aeo/
├── README.md                      # Project overview
├── ARCHITECTURE.md                # System design document
├── COST_OPTIMIZATION.md           # Max Pro plan savings guide
├── requirements.txt               # Python dependencies
├── pyproject.toml                 # Project configuration
├── .env.example                   # Environment variables template
│
├── src/
│   ├── __init__.py
│   │
│   ├── agents/                    # Agent implementations
│   │   ├── __init__.py
│   │   ├── base_agent.py          # Base agent class
│   │   ├── orchestrator.py        # Orchestrator agent
│   │   ├── auditor.py             # Content auditor agent
│   │   ├── optimizer.py           # Content optimizer agent
│   │   ├── tracker.py             # Citation tracker agent
│   │   ├── researcher.py          # Query researcher agent
│   │   ├── reporter.py            # Report generator agent
│   │   └── learning.py            # Learning optimizer agent
│   │
│   ├── workflows/                 # Workflow definitions
│   │   ├── __init__.py
│   │   ├── base_workflow.py       # Base workflow class
│   │   ├── campaign_workflow.py   # /aeo-campaign workflow
│   │   ├── compete_workflow.py    # /aeo-compete workflow
│   │   └── monitor_workflow.py    # /aeo-monitor workflow
│   │
│   ├── communication/             # Agent communication
│   │   ├── __init__.py
│   │   ├── protocol.py            # Message protocol
│   │   ├── queue.py               # Task queue
│   │   └── validator.py           # Output validation
│   │
│   ├── persistence/               # Data storage
│   │   ├── __init__.py
│   │   ├── campaign_store.py      # Campaign data
│   │   ├── workflow_store.py      # Workflow data
│   │   └── pattern_store.py       # Learning patterns
│   │
│   ├── aeo_skill/                 # AEO skill modules (copied from skill)
│   │   ├── __init__.py
│   │   ├── content_analyzer.py
│   │   ├── optimizer.py
│   │   ├── citation_tracker.py
│   │   ├── query_researcher.py
│   │   ├── report_generator.py
│   │   ├── success_patterns.py
│   │   ├── api_manager.py
│   │   └── utils.py
│   │
│   ├── api/                       # Web API
│   │   ├── __init__.py
│   │   ├── main.py                # FastAPI app
│   │   ├── routes/
│   │   │   ├── campaigns.py       # Campaign endpoints
│   │   │   ├── agents.py          # Agent status endpoints
│   │   │   └── monitoring.py      # Monitoring endpoints
│   │   └── models.py              # Pydantic models
│   │
│   ├── cli/                       # CLI interface
│   │   ├── __init__.py
│   │   ├── main.py                # Click CLI app
│   │   └── commands/
│   │       ├── campaign.py        # /aeo-campaign
│   │       ├── compete.py         # /aeo-compete
│   │       └── monitor.py         # /aeo-monitor
│   │
│   └── utils/                     # Utilities
│       ├── __init__.py
│       ├── config.py              # Configuration
│       ├── logging.py             # Logging setup
│       └── errors.py              # Custom exceptions
│
├── tests/
│   ├── unit/                      # Unit tests
│   │   ├── test_agents/
│   │   ├── test_workflows/
│   │   └── test_communication/
│   ├── integration/               # Integration tests
│   │   ├── test_campaign_workflow.py
│   │   └── test_agent_coordination.py
│   └── e2e/                       # End-to-end tests
│       ├── test_full_campaign.py
│       └── test_monitoring.py
│
├── scripts/                       # Utility scripts
│   ├── setup.sh                   # Initial setup
│   ├── run_tests.sh               # Test runner
│   └── deploy.sh                  # Deployment
│
└── docs/                          # Documentation
    ├── API_REFERENCE.md           # API documentation
    ├── AGENT_GUIDE.md             # Agent development guide
    ├── TROUBLESHOOTING.md         # Common issues
    └── examples/                  # Usage examples
        ├── campaign_example.py
        ├── compete_example.py
        └── monitor_example.py
```

---

## 📝 IMPLEMENTATION REQUIREMENTS

### Phase 1: Core Agent System (Week 1-2)

**Deliverables**:
1. ✅ Base agent class with Claude SDK integration
2. ✅ Orchestrator agent with task decomposition logic
3. ✅ Communication protocol (JSON + Markdown)
4. ✅ Data persistence layer (local files)
5. ✅ Unit tests (>80% coverage)

**Key Files**:
- `src/agents/base_agent.py` - Abstract base class for all agents
- `src/agents/orchestrator.py` - Main orchestrator implementation
- `src/communication/protocol.py` - Message format and validation
- `src/persistence/campaign_store.py` - Campaign data storage

**Success Criteria**:
- Orchestrator can decompose a simple task into subtasks
- Agents can communicate via standardized protocol
- Data persists to local files
- All tests pass

---

### Phase 2: Specialized Agents (Week 3-4)

**Deliverables**:
1. ✅ Content Auditor Agent (using `content_analyzer.py`)
2. ✅ Content Optimizer Agent (using `optimizer.py`)
3. ✅ Citation Tracker Agent (using `citation_tracker.py`)
4. ✅ Query Researcher Agent (using `query_researcher.py`)
5. ✅ Report Generator Agent (using `report_generator.py`)
6. ✅ Learning Optimizer Agent (using `success_patterns.py`)

**Key Files**:
- `src/agents/auditor.py`
- `src/agents/optimizer.py`
- `src/agents/tracker.py`
- `src/agents/researcher.py`
- `src/agents/reporter.py`
- `src/agents/learning.py`

**Success Criteria**:
- Each agent can execute its specialized task independently
- Agents integrate with AEO skill modules
- Output validation works for all agents
- Integration tests pass

---

### Phase 3: Workflow Orchestration (Week 5)

**Deliverables**:
1. ✅ Campaign workflow (`/aeo-campaign`)
2. ✅ Competitive analysis workflow (`/aeo-compete`)
3. ✅ Monitoring workflow (`/aeo-monitor`)
4. ✅ Workflow dependency management
5. ✅ Parallel execution support

**Key Files**:
- `src/workflows/campaign_workflow.py`
- `src/workflows/compete_workflow.py`
- `src/workflows/monitor_workflow.py`

**Success Criteria**:
- Complete campaign workflow executes end-to-end
- Parallel tasks execute concurrently
- Dependencies are respected
- E2E tests pass

---

### Phase 4: CLI + API (Week 6)

**Deliverables**:
1. ✅ CLI interface with Click
2. ✅ FastAPI web API
3. ✅ API documentation (auto-generated)
4. ✅ Error handling and logging
5. ✅ Configuration management

**Key Files**:
- `src/cli/main.py`
- `src/api/main.py`
- `src/utils/config.py`

**Success Criteria**:
- CLI commands work from terminal
- API endpoints respond correctly
- Swagger docs generated automatically
- Errors are handled gracefully

---

### Phase 5: Testing & Documentation (Week 7)

**Deliverables**:
1. ✅ >80% test coverage
2. ✅ README.md with quick start
3. ✅ ARCHITECTURE.md with system design
4. ✅ API_REFERENCE.md with endpoint docs
5. ✅ COST_OPTIMIZATION.md with savings strategies

**Success Criteria**:
- All tests pass
- Documentation is comprehensive
- Examples are working and tested
- Project is ready for production use

---

## 💰 COST OPTIMIZATION (Max Pro Plan)

### Optimization Strategies

**1. Prompt Caching (60% Savings)**

Cache the AEO skill instructions and agent system prompts:

```python
# Orchestrator system prompt (cache this - it's reused every request)
ORCHESTRATOR_SYSTEM_PROMPT = """
You are an AEO Orchestrator Agent responsible for coordinating 6 specialized subagents...
[Full orchestrator instructions - ~2000 tokens]
"""

# Mark as cacheable in Claude SDK
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    system=[
        {"type": "text", "text": ORCHESTRATOR_SYSTEM_PROMPT, "cache_control": {"type": "ephemeral"}}
    ],
    messages=[{"role": "user", "content": user_request}]
)
```

**Cached on first request**: Pay full price (~2000 tokens @ $3/MTok = $0.006)
**Subsequent requests**: Pay cache read price (~2000 tokens @ $0.30/MTok = $0.0006) - **90% savings**

**2. Extended Context (200K Tokens)**

Use extended context to avoid multiple round trips:

```python
# Instead of multiple API calls, include full context in one request
full_context = {
    "aeo_skill_docs": "...",           # 10K tokens
    "previous_campaign_results": "...", # 5K tokens
    "industry_patterns": "...",         # 3K tokens
    "current_task": "..."              # 2K tokens
}
# Total: 20K tokens - fits easily in 200K context
```

**3. Request Batching**

Batch agent communications:

```python
# Instead of 6 separate API calls (one per agent)
# Orchestrator makes 1 call with all agent tasks

orchestrator_prompt = f"""
Execute the following tasks in parallel:

1. AUDITOR TASK: Audit {url}
2. RESEARCHER TASK: Research queries for {topic}
3. ... (include all tasks)

Return results in JSON format for each task.
"""
```

**Savings**: 6 requests → 1 request = **83% fewer API calls**

### Expected Costs

**Without Optimization** (6 agents, no caching, separate calls):
- 6 API calls per campaign
- ~2000 tokens per call = 12,000 total tokens
- Cost: $0.036 per campaign
- 100 campaigns/day = **$3.60/day = $108/month**

**With Optimization** (caching, batching, extended context):
- 1 API call per campaign (batched)
- ~2000 tokens cached (90% savings)
- ~10,000 tokens new content
- Cost: $0.0006 (cached) + $0.030 (new) = $0.0306 per campaign
- 100 campaigns/day = **$3.06/day = $92/month**

**Monthly Savings**: $108 - $92 = **$16/month** (15% savings)
**Annual Savings**: **$192/year**

For larger volumes (1000 campaigns/day):
- Without optimization: **$1,080/month**
- With optimization: **$918/month**
- **Savings: $162/month = $1,944/year**

---

## 🧪 TESTING STRATEGY

### Unit Tests (>80% Coverage)

Test each agent individually:

```python
# tests/unit/test_agents/test_auditor.py
import pytest
from src.agents.auditor import AuditorAgent

@pytest.mark.asyncio
async def test_auditor_audit_success():
    """Test successful content audit"""
    agent = AuditorAgent()

    task = {
        "task_id": "test_001",
        "task_type": "audit_content",
        "input_data": {
            "url": "https://example.com/article",
            "context": {"industry": "SaaS"}
        }
    }

    result = await agent.execute_task(task)

    assert result["status"] == "success"
    assert "overall_score" in result["results"]
    assert result["results"]["overall_score"] >= 0
    assert result["results"]["overall_score"] <= 100
```

### Integration Tests

Test agent coordination:

```python
# tests/integration/test_agent_coordination.py
@pytest.mark.asyncio
async def test_orchestrator_agent_communication():
    """Test orchestrator can assign task to auditor and receive result"""
    orchestrator = OrchestratorAgent()
    auditor = AuditorAgent()

    # Orchestrator assigns task
    task = orchestrator.create_task("audit_content", url="https://example.com")

    # Auditor executes
    result = await auditor.execute_task(task)

    # Orchestrator validates
    validated = orchestrator.validate_result(result)

    assert validated is True
```

### E2E Tests

Test complete workflows:

```python
# tests/e2e/test_full_campaign.py
@pytest.mark.asyncio
async def test_full_campaign_workflow():
    """Test complete /aeo-campaign workflow"""
    from src.workflows.campaign_workflow import CampaignWorkflow

    workflow = CampaignWorkflow()

    result = await workflow.execute(
        url="https://example.com/article",
        options={"industry": "SaaS", "level": "balanced"}
    )

    # Verify all agents executed
    assert "auditor" in result["agent_results"]
    assert "optimizer" in result["agent_results"]
    assert "tracker" in result["agent_results"]

    # Verify executive summary generated
    assert "executive_summary" in result
    assert result["final_score"] > 0
```

---

## 📚 DOCUMENTATION REQUIREMENTS

### README.md

**Sections**:
1. Project Overview
2. Quick Start (5-minute setup)
3. Installation
4. Usage Examples (CLI + API)
5. Configuration
6. Architecture Overview
7. Contributing
8. License

### ARCHITECTURE.md

**Sections**:
1. System Architecture Diagram
2. Agent System Design
3. Communication Protocol
4. Data Flow
5. Workflow Execution
6. Quality Validation
7. Error Handling
8. Scalability Considerations

### COST_OPTIMIZATION.md

**Sections**:
1. Max Pro Plan Benefits
2. Prompt Caching Strategy
3. Extended Context Usage
4. Request Batching
5. Cost Calculations (with examples)
6. Monthly/Annual Savings
7. Optimization Tips

### API_REFERENCE.md

**Sections**:
1. REST API Endpoints
   - `POST /campaigns` - Start campaign
   - `GET /campaigns/{id}` - Get campaign status
   - `POST /compete` - Competitive analysis
   - `POST /monitor` - Start monitoring
   - `GET /agents` - Agent status
2. Request/Response Formats
3. Error Codes
4. Rate Limits
5. Authentication (future)

---

## 🎯 SUCCESS CRITERIA

### Functional Requirements

- ✅ Orchestrator successfully decomposes complex tasks
- ✅ All 6 specialized agents execute their tasks correctly
- ✅ Agent communication protocol works reliably
- ✅ Quality validation catches errors and requests revisions
- ✅ All 3 slash commands work end-to-end
- ✅ Data persists correctly to local files
- ✅ CLI and API interfaces are functional

### Non-Functional Requirements

- ✅ >80% test coverage (unit + integration + E2E)
- ✅ Response time <5 minutes for `/aeo-campaign`
- ✅ 60%+ cost savings through Max Pro plan optimization
- ✅ Comprehensive documentation (README, ARCHITECTURE, API_REFERENCE)
- ✅ Error handling for all failure scenarios
- ✅ Logging for debugging and monitoring

### Quality Metrics

- ✅ Code follows PEP 8 (Python style guide)
- ✅ Type hints on all functions
- ✅ Docstrings on all public APIs
- ✅ No hardcoded credentials
- ✅ Graceful degradation on API failures
- ✅ Clear error messages for users

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] All tests passing (pytest)
- [ ] >80% code coverage
- [ ] Documentation complete
- [ ] Configuration validated
- [ ] AEO skill modules integrated
- [ ] Error handling tested
- [ ] Logging configured

### Deployment Steps

1. **Environment Setup**:
   ```bash
   # Clone repository
   git clone <repo-url>
   cd agentic-aeo

   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows

   # Install dependencies
   pip install -r requirements.txt

   # Copy AEO skill modules
   cp -r <path-to-aeo-skill>/modules src/aeo_skill/

   # Configure
   cp .env.example .env
   # Edit .env with your settings
   ```

2. **Run Tests**:
   ```bash
   pytest tests/ --cov=src --cov-report=html
   ```

3. **Start CLI**:
   ```bash
   python -m src.cli.main --help
   ```

4. **Start API**:
   ```bash
   uvicorn src.api.main:app --reload
   ```

### Post-Deployment

- [ ] Verify CLI commands work
- [ ] Test API endpoints
- [ ] Run sample campaign
- [ ] Check data persistence
- [ ] Monitor logs for errors
- [ ] Verify cost optimization (check Claude usage)

---

## 📊 EXAMPLE OUTPUTS

### `/aeo-campaign` Executive Summary

```markdown
# AEO Campaign Executive Summary

**Campaign ID**: camp_20250107_001
**URL**: https://blog.com/article-on-project-management
**Completed**: 2025-01-07 11:15:30 UTC
**Duration**: 8 minutes 7 seconds

---

## 📈 Overall Results

- **Initial AEO Score**: 65/100 (Fair)
- **Final AEO Score**: 82/100 (Very Good)
- **Improvement**: +17 points (26% increase)
- **Estimated Citation Improvement**: 35% more LLM citations

---

## 🎯 Key Achievements

1. ✅ **E-E-A-T Enhanced** (58 → 78)
   - Added author bio with credentials (Product Manager, 10+ years)
   - Included 3 first-hand case study examples
   - Added expert quotes from industry leaders

2. ✅ **Citations Improved** (45 → 88)
   - Added 5 authoritative sources (.gov, .edu, industry reports)
   - Linked to peer-reviewed research (3 studies)
   - Cited current statistics (2023-2024 data)

3. ✅ **Structure Optimized** (72 → 85)
   - Restructured into 6 clear H2 sections
   - Converted 3 paragraphs to bulleted lists
   - Added comparison table for PM tools

4. ✅ **Citation Tracking Active**
   - Monitoring across 5 LLMs (ChatGPT, Perplexity, Claude, Gemini, Mistral)
   - Baseline: 2 citations detected
   - Daily checks scheduled for 30 days

---

## 🔍 Critical Issues Addressed

| Priority | Issue | Resolution |
|----------|-------|------------|
| Critical | No authoritative citations | Added 5 high-authority sources |
| Critical | Missing author credentials | Added comprehensive author bio |
| High | Poor content structure | Restructured with clear sections + lists |

---

## 📊 Competitive Analysis

**Compared to 2 competitors:**

| Metric | Your Content | Competitor 1 | Competitor 2 | Rank |
|--------|--------------|--------------|--------------|------|
| AEO Score | 82 | 75 | 68 | 🥇 1st |
| Citation Count | 2 | 5 | 3 | 3rd |
| E-E-A-T | 78 | 72 | 65 | 🥇 1st |

**Analysis**: Your content now has the highest AEO score, but competitors have more existing citations. Expect to overtake them within 2-4 weeks as LLMs re-index.

---

## 🎯 Recommended Next Steps

1. **Immediate** (Week 1):
   - Publish optimized content to production
   - Submit sitemap to search engines for re-crawling
   - Monitor daily citation updates via dashboard

2. **Short-term** (Weeks 2-4):
   - Create 2-3 related articles targeting identified query opportunities
   - Build internal links to this cornerstone content
   - Share on LinkedIn/X to build social signals

3. **Long-term** (Month 2+):
   - Analyze citation performance data
   - Apply successful patterns to other content
   - Scale optimization to top 20 articles

---

## 💰 ROI Projection

**Conservative Estimate**:
- Current traffic: 500 visits/month from search
- Expected LLM citation traffic: +175 visits/month (35% increase)
- Value per visit: $5 (lead generation)
- **Monthly revenue impact**: +$875/month
- **Annual impact**: +$10,500/year

**Time to ROI**: <1 week (optimization cost: $200)

---

## 📁 Deliverables

- ✅ Detailed audit report: `.aeo-agent-data/campaigns/camp_20250107_001/agent_outputs/auditor_output.json`
- ✅ Optimized content: `.aeo-agent-data/campaigns/camp_20250107_001/agent_outputs/optimizer_output.json`
- ✅ Citation tracking setup: Active for 30 days
- ✅ Query research report: 12 high-value target queries identified
- ✅ This executive summary

---

**Generated by**: Agentic AEO v1.0.0
**Orchestrator**: campaign_orchestrator_v1
**Agents Used**: Auditor, Optimizer, Tracker, Researcher, Reporter
```

---

## 🎓 DEVELOPER GUIDE

### Adding a New Agent

**Step 1**: Create agent class inheriting from `BaseAgent`:

```python
# src/agents/my_new_agent.py
from .base_agent import BaseAgent
from typing import Dict

class MyNewAgent(BaseAgent):
    """Description of what this agent does"""

    def __init__(self):
        super().__init__(agent_type="my_new_agent")

    async def execute_task(self, task: Dict) -> Dict:
        """
        Execute the assigned task.

        Args:
            task: Task specification from orchestrator

        Returns:
            Task result with status, results, and markdown report
        """
        try:
            # 1. Extract task parameters
            input_data = task["input_data"]

            # 2. Execute agent logic (use AEO skill modules as needed)
            results = self._process_task(input_data)

            # 3. Generate markdown report
            markdown = self._generate_report(results)

            # 4. Return standardized result
            return {
                "status": "success",
                "agent": self.agent_type,
                "task_id": task["task_id"],
                "results": results,
                "markdown_report": markdown,
                "errors": [],
                "warnings": []
            }

        except Exception as e:
            return self._error_result(task["task_id"], str(e))
```

**Step 2**: Register agent in orchestrator:

```python
# src/agents/orchestrator.py
from .my_new_agent import MyNewAgent

class OrchestratorAgent:
    def __init__(self):
        self.agents = {
            "auditor": AuditorAgent(),
            "optimizer": OptimizerAgent(),
            # ... existing agents ...
            "my_new_agent": MyNewAgent()  # Add here
        }
```

**Step 3**: Add agent to workflow:

```python
# src/workflows/campaign_workflow.py
async def execute(self, url, options):
    tasks = [
        # ... existing tasks ...
        {
            "agent": "my_new_agent",
            "task_type": "my_task",
            "priority": 2,
            "depends_on": ["auditor"]
        }
    ]
```

---

## ⚠️ IMPORTANT NOTES

### DO NOT Include

- ❌ API keys (use Claude Code CLI credentials only)
- ❌ Hardcoded secrets
- ❌ Proprietary AEO algorithms (use skill modules)
- ❌ External API dependencies (optional, graceful degradation)

### DO Include

- ✅ Comprehensive error handling
- ✅ Detailed logging (without secrets)
- ✅ Type hints on all functions
- ✅ Docstrings on all public APIs
- ✅ Unit + integration + E2E tests
- ✅ Cost optimization strategies
- ✅ Complete documentation

### Best Practices

1. **Agent Communication**: Always use standardized protocol (JSON + Markdown)
2. **Error Handling**: Retry transient errors, fail gracefully on permanent errors
3. **Logging**: Log decisions, not sensitive data
4. **Testing**: Test each agent independently, then integration, then E2E
5. **Cost Optimization**: Cache system prompts, batch requests, use extended context
6. **Quality**: Validate all agent outputs before proceeding

---

## 🎉 FINAL CHECKLIST

Before considering the project complete, verify:

- [ ] All 7 agents implemented and tested
- [ ] All 3 slash commands working end-to-end
- [ ] Orchestrator coordinates workflows correctly
- [ ] Agent communication protocol standardized
- [ ] Quality validation catches errors
- [ ] Data persists to local files
- [ ] CLI interface functional
- [ ] Web API functional with Swagger docs
- [ ] >80% test coverage (unit + integration + E2E)
- [ ] Cost optimization implemented (caching, batching)
- [ ] Documentation complete (README, ARCHITECTURE, API_REFERENCE, COST_OPTIMIZATION)
- [ ] Error handling comprehensive
- [ ] Logging configured
- [ ] Configuration management working
- [ ] Examples tested and working

---

**This is your complete specification. Use it to build the agentic AEO application with Claude Code!**

**Next Step**: Feed this prompt to Claude Code and start implementing Phase 1 (Core Agent System).

Good luck! 🚀
