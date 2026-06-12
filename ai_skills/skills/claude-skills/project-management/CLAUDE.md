# Project Management Skills - Claude Code Guidance

This guide covers the 9 production-ready project management skills, 12 Python automation tools, and bundled Atlassian Remote MCP integration (`.mcp.json` ships with the plugin — OAuth handled by Claude Code, no env vars required).

## PM Skills Overview

**Available Skills:**
1. **senior-pm/** - Portfolio health, risk analysis, resource planning (3 scripts)
2. **scrum-master/** - Sprint health, velocity forecasting, retrospectives (3 scripts)
3. **jira-expert/** - JQL building, workflow validation (2 scripts)
4. **confluence-expert/** - Space structure, content auditing (2 scripts)
5. **atlassian-admin/** - Permission auditing (1 script)
6. **atlassian-templates/** - Template scaffolding (1 script)

**Total Tools:** 12 Python automation tools
**Agent:** cs-project-manager (orchestrates all 6 skills)
**Slash Commands:** 3 (/sprint-health, /project-health, /retro)
**Key Feature:** Atlassian MCP Server integration for direct Jira/Confluence operations

## Atlassian MCP Integration

**Purpose:** Direct integration with Jira and Confluence via Model Context Protocol (MCP)

**Canonical tool list:** [references/atlassian-mcp-tools.md](references/atlassian-mcp-tools.md) — the single source of truth for real tool names. Never invent tool names; if a capability isn't in that list (project creation, sprint management, field configuration, automation rules, space creation, …), it is NOT available via MCP — use the Atlassian web UI or REST API.

**Capabilities (real tools, camelCase):**
- Jira issues: `createJiraIssue`, `getJiraIssue`, `editJiraIssue`, `searchJiraIssuesUsingJql`, `transitionJiraIssue`, `addCommentToJiraIssue`, `createIssueLink`
- Confluence pages: `createConfluencePage`, `getConfluencePage`, `updateConfluencePage`, `searchConfluenceUsingCql`, `getConfluencePageDescendants`
- Discovery: `getAccessibleAtlassianResources` (get `cloudId` first), `getVisibleJiraProjects`, `getConfluenceSpaces`

**Setup:** Bundled `.mcp.json` registers the `atlassian` SSE server; tools surface as `mcp__atlassian__<toolName>`.

**Usage Pattern:**
```
# Jira: create an issue (call getAccessibleAtlassianResources first to obtain cloudId)
mcp__atlassian__createJiraIssue (cloudId, projectKey="PROJ", issueTypeName="Story", summary="New feature")

# Confluence: create a page (body must be storage-format XHTML or ADF, not wiki markup)
mcp__atlassian__createConfluencePage (cloudId, space, title="Sprint Retrospective", body=<storage-format XHTML>)
```

**Not available via MCP** (use web UI/REST API): project creation, sprints, boards, filters, space creation, page deletion, labels, field/workflow/permission configuration, user provisioning, automation rules.

## Skill-Specific Guidance

### Senior PM (`senior-pm/`)

**Focus:** Project planning, stakeholder management, risk mitigation

**Key Workflows:**
- Project charter creation
- Stakeholder analysis and communication plans
- Risk register maintenance
- Status reporting and escalation

### Scrum Master (`scrum-master/`)

**Focus:** Agile ceremonies, team coaching, impediment removal

**Key Workflows:**
- Sprint planning facilitation
- Daily standup coordination
- Sprint retrospectives
- Backlog refinement

### Jira Expert (`jira-expert/`)

**Focus:** Jira configuration, custom workflows, automation rules

**Scripts:**
- `scripts/jql_query_builder.py` — Pattern-matching JQL builder from natural language
- `scripts/workflow_validator.py` — Validates workflow definitions for anti-patterns

**Key Workflows:**
- Workflow customization
- Automation rule creation
- Board configuration
- JQL query optimization

### Confluence Expert (`confluence-expert/`)

**Focus:** Documentation strategy, templates, knowledge management

**Scripts:**
- `scripts/space_structure_generator.py` — Generates space hierarchy from team description
- `scripts/content_audit_analyzer.py` — Analyzes page inventory for stale/orphaned content

**Key Workflows:**
- Space architecture design
- Template library creation
- Documentation standards
- Search optimization

### Atlassian Admin (`atlassian-admin/`)

**Focus:** Suite administration, user management, integrations

**Scripts:**
- `scripts/permission_audit_tool.py` — Analyzes permission schemes for security gaps

**Key Workflows:**
- User provisioning and permissions
- SSO/SAML configuration
- App marketplace management
- Performance monitoring

### Atlassian Templates (`atlassian-templates/`)

**Focus:** Ready-to-use templates for common PM tasks

**Scripts:**
- `scripts/template_scaffolder.py` — Generates Confluence storage-format XHTML templates

**Available Templates:**
- Sprint planning template
- Retrospective formats (Start-Stop-Continue, 4Ls, Mad-Sad-Glad)
- Project charter
- Risk register
- Decision log

## Integration Patterns

### Pattern 1: Sprint Planning

```bash
# 1. Create the sprint in the Jira board UI (sprint creation is NOT available via MCP —
#    use Jira Software UI or REST /rest/agile/1.0/sprint)

# 2. Generate user stories (product-team integration)
python ../product-team/agile-product-owner/scripts/user_story_generator.py sprint 30

# 3. Import stories to Jira via MCP: one mcp__atlassian__createJiraIssue call per story
#    (cloudId, projectKey, issueTypeName="Story", summary, description)
```

### Pattern 2: Documentation Workflow

```bash
# 1. Scaffold storage-format XHTML, then create the Confluence page via MCP
python skills/atlassian-templates/scripts/template_scaffolder.py meeting-notes
#    → pass the emitted markup as the body of mcp__atlassian__createConfluencePage

# 2. Link the page to a Jira issue: paste the page URL into the issue via
#    mcp__atlassian__editJiraIssue or as a comment via mcp__atlassian__addCommentToJiraIssue
#    (read existing links with mcp__atlassian__getJiraIssueRemoteIssueLinks)
```

## Python Automation Tools

### New Scripts (Phase 2)

```bash
# JQL from natural language
python jira-expert/scripts/jql_query_builder.py "high priority bugs assigned to me"

# Validate Jira workflow
python jira-expert/scripts/workflow_validator.py workflow.json

# Generate Confluence space structure
python confluence-expert/scripts/space_structure_generator.py team_info.json

# Audit Confluence content health
python confluence-expert/scripts/content_audit_analyzer.py pages.json

# Audit Atlassian permissions
python atlassian-admin/scripts/permission_audit_tool.py permissions.json

# Scaffold Confluence templates
python atlassian-templates/scripts/template_scaffolder.py meeting-notes
```

## Additional Resources

- **Installation Guide:** `INSTALLATION_GUIDE.txt`
- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`
- **Real-World Scenario:** `REAL_WORLD_SCENARIO.md`
- **PM Overview:** `README.md`
- **Main Documentation:** `../CLAUDE.md`

---

**Last Updated:** June 10, 2026
**Skills Deployed:** 9/9 PM skills production-ready
**Total Tools:** 12 Python automation tools
**Agent:** cs-project-manager | **Commands:** 3
**Integration:** Atlassian Remote MCP Server (bundled via `.mcp.json`) for Jira/Confluence automation
