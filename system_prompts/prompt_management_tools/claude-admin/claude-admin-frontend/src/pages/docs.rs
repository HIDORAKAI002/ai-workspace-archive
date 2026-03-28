use crate::i18n::t;
use leptos::*;
use leptos_router::*;

#[component]
pub fn DocsPage() -> impl IntoView {
    let query = use_query_map();
    let initial_section = query
        .with_untracked(|q| q.get("section").cloned())
        .unwrap_or_else(|| "overview".to_string());
    let active_section = create_rw_signal(initial_section);

    view! {
        <div class="page-header">
            <h2>{t("docs.title")}</h2>
            <p>{t("docs.subtitle")}</p>
        </div>

        <div class="docs-layout">
            <nav class="docs-toc">
                <div class="docs-toc-title">{t("docs.toc_contents")}</div>
                <TocLink section="overview" active=active_section label=t("docs.toc_why_claudeadmin")/>
                <TocLink section="capabilities" active=active_section label=t("docs.toc_capabilities")/>
                <div class="docs-toc-divider"></div>
                <div class="docs-toc-group">{t("docs.toc_group")}</div>
                <TocLink section="claude-md" active=active_section label=t("docs.toc_claude_md")/>
                <TocLink section="rules" active=active_section label=t("docs.toc_rules")/>
                <TocLink section="skills" active=active_section label=t("docs.toc_skills")/>
                <TocLink section="memory" active=active_section label=t("docs.toc_memory")/>
                <TocLink section="settings" active=active_section label=t("docs.toc_settings")/>
                <TocLink section="mcp" active=active_section label=t("docs.toc_mcp")/>
                <TocLink section="plans" active=active_section label=t("docs.toc_plans")/>
                <div class="docs-toc-divider"></div>
                <TocLink section="scopes" active=active_section label=t("docs.toc_scopes")/>
                <TocLink section="optimization" active=active_section label=t("docs.toc_optimization")/>
                <TocLink section="tips" active=active_section label=t("docs.toc_tips")/>
                <TocLink section="links" active=active_section label=t("docs.toc_links")/>
            </nav>

            <div class="docs-content">
                {move || {
                    match active_section.get().as_str() {
                        "overview" => view! { <SectionOverview/> }.into_view(),
                        "capabilities" => view! { <SectionCapabilities/> }.into_view(),
                        "claude-md" => view! { <SectionClaudeMd/> }.into_view(),
                        "rules" => view! { <SectionRules/> }.into_view(),
                        "skills" => view! { <SectionSkills/> }.into_view(),
                        "memory" => view! { <SectionMemory/> }.into_view(),
                        "settings" => view! { <SectionSettings/> }.into_view(),
                        "mcp" => view! { <SectionMcp/> }.into_view(),
                        "plans" => view! { <SectionPlans/> }.into_view(),
                        "scopes" => view! { <SectionScopes/> }.into_view(),
                        "optimization" => view! { <SectionOptimization/> }.into_view(),
                        "tips" => view! { <SectionTips/> }.into_view(),
                        "links" => view! { <SectionLinks/> }.into_view(),
                        _ => view! { <SectionOverview/> }.into_view(),
                    }
                }}
            </div>
        </div>
    }
}

#[component]
fn TocLink(
    section: &'static str,
    active: RwSignal<String>,
    label: Signal<String>,
) -> impl IntoView {
    let s = section.to_string();
    let is_active = move || active.get() == section;
    view! {
        <a
            class=move || if is_active() { "docs-toc-link active" } else { "docs-toc-link" }
            href="javascript:void(0)"
            on:click=move |_| active.set(s.clone())
        >
            {label}
        </a>
    }
}

// ─────────────────────────────────────────────
// Section: Why ClaudeAdmin?
// ─────────────────────────────────────────────
#[component]
fn SectionOverview() -> impl IntoView {
    view! {
        <div class="docs-section">
            <h3 class="docs-heading">{t("docs.overview_heading")}</h3>

            <div class="docs-callout docs-callout-accent">
                <strong>"ClaudeAdmin"</strong>
                {t("docs.overview_callout")}
            </div>

            <p class="docs-text">
                {t("docs.overview_text1")}
            </p>
            <p class="docs-text">
                {t("docs.overview_text2")}
            </p>
            <ul class="docs-list">
                <li><strong>{t("docs.overview_li_visibility_label")}</strong>{t("docs.overview_li_visibility")}</li>
                <li><strong>{t("docs.overview_li_editing_label")}</strong>{t("docs.overview_li_editing")}</li>
                <li><strong>{t("docs.overview_li_health_label")}</strong>{t("docs.overview_li_health")}</li>
                <li><strong>{t("docs.overview_li_analytics_label")}</strong>{t("docs.overview_li_analytics")}</li>
                <li><strong>{t("docs.overview_li_advisor_label")}</strong>{t("docs.overview_li_advisor")}</li>
            </ul>
        </div>
    }
}

// ─────────────────────────────────────────────
// Section: Capabilities
// ─────────────────────────────────────────────
#[component]
fn SectionCapabilities() -> impl IntoView {
    view! {
        <div class="docs-section">
            <h3 class="docs-heading">{t("docs.cap_heading")}</h3>

            <div class="docs-two-col">
                <div class="docs-col">
                    <h4 class="docs-subheading docs-subheading-success">{t("docs.cap_can_heading")}</h4>
                    <ul class="docs-list">
                        <li>{t("docs.cap_can_1")}</li>
                        <li>{t("docs.cap_can_2")}</li>
                        <li>{t("docs.cap_can_3")}</li>
                        <li>{t("docs.cap_can_4")}</li>
                        <li>{t("docs.cap_can_5")}</li>
                        <li>{t("docs.cap_can_6")}</li>
                        <li>{t("docs.cap_can_7")}</li>
                        <li>{t("docs.cap_can_8")}</li>
                        <li>{t("docs.cap_can_9")}</li>
                        <li>{t("docs.cap_can_10")}</li>
                        <li>{t("docs.cap_can_11")}</li>
                        <li>{t("docs.cap_can_12")}</li>
                    </ul>
                </div>
                <div class="docs-col">
                    <h4 class="docs-subheading docs-subheading-muted">{t("docs.cap_cannot_heading")}</h4>
                    <ul class="docs-list">
                        <li>{t("docs.cap_cannot_1")}</li>
                        <li>{t("docs.cap_cannot_2")}</li>
                        <li>{t("docs.cap_cannot_3")}</li>
                        <li>{t("docs.cap_cannot_4")}</li>
                        <li>{t("docs.cap_cannot_5")}</li>
                        <li>{t("docs.cap_cannot_6")}</li>
                    </ul>
                    <div class="docs-callout docs-callout-muted" style="margin-top: 1rem;">
                        {t("docs.cap_cannot_callout")}
                    </div>
                </div>
            </div>
        </div>
    }
}

// ─────────────────────────────────────────────
// Section: CLAUDE.md
// ─────────────────────────────────────────────
#[component]
fn SectionClaudeMd() -> impl IntoView {
    view! {
        <div class="docs-section">
            <h3 class="docs-heading">"CLAUDE.md"</h3>
            <div class="docs-callout docs-callout-accent">
                {t("docs.claudemd_callout")}
            </div>

            <h4 class="docs-subheading">{t("docs.claudemd_how_heading")}</h4>
            <p class="docs-text">
                {t("docs.claudemd_how_text")}
            </p>

            <h4 class="docs-subheading">{t("docs.claudemd_locations_heading")}</h4>
            <div class="docs-scope-table">
                <div class="docs-scope-row">
                    <span class="badge badge-success">{t("docs.scope_project")}</span>
                    <code>"./CLAUDE.md"</code>
                    <span class="docs-scope-desc">{t("docs.claudemd_loc_project_or")}<code>"./.claude/CLAUDE.md"</code></span>
                </div>
                <div class="docs-scope-row">
                    <span class="badge badge-warning">{t("docs.scope_parent")}</span>
                    <code>"../CLAUDE.md"</code>
                    <span class="docs-scope-desc">{t("docs.claudemd_loc_parent")}</span>
                </div>
                <div class="docs-scope-row">
                    <span class="badge badge-muted">{t("docs.scope_user")}</span>
                    <code>"~/CLAUDE.md"</code>
                    <span class="docs-scope-desc">{t("docs.claudemd_loc_user")}</span>
                </div>
            </div>

            <h4 class="docs-subheading">{t("docs.claudemd_whatto_heading")}</h4>
            <ul class="docs-list">
                <li><strong>{t("docs.claudemd_whatto_context_label")}</strong>{t("docs.claudemd_whatto_context")}</li>
                <li><strong>{t("docs.claudemd_whatto_standards_label")}</strong>{t("docs.claudemd_whatto_standards")}</li>
                <li><strong>{t("docs.claudemd_whatto_workflows_label")}</strong>{t("docs.claudemd_whatto_workflows")}</li>
                <li><strong>{t("docs.claudemd_whatto_dodont_label")}</strong>{t("docs.claudemd_whatto_dodont")}</li>
                <li><strong>{t("docs.claudemd_whatto_team_label")}</strong>{t("docs.claudemd_whatto_team")}</li>
            </ul>

            <h4 class="docs-subheading">{t("docs.tips_heading")}</h4>
            <div class="docs-tip">{t("docs.claudemd_tip1")}</div>
            <div class="docs-tip">{t("docs.claudemd_tip2")}</div>
            <div class="docs-tip">{t("docs.claudemd_tip3")}</div>
            <div class="docs-tip">{t("docs.claudemd_tip4")}</div>

            <div class="docs-link-box">
                <a href="https://docs.anthropic.com/en/docs/claude-code/memory#claudemd" target="_blank" class="docs-ext-link">
                    {t("docs.claudemd_ext_link")}
                </a>
            </div>
        </div>
    }
}

// ─────────────────────────────────────────────
// Section: Rules
// ─────────────────────────────────────────────
#[component]
fn SectionRules() -> impl IntoView {
    view! {
        <div class="docs-section">
            <h3 class="docs-heading">{t("docs.rules_heading")}</h3>
            <div class="docs-callout docs-callout-accent">
                {t("docs.rules_callout")}
            </div>

            <h4 class="docs-subheading">{t("docs.rules_how_heading")}</h4>
            <p class="docs-text">
                {t("docs.rules_how_text")}
            </p>

            <h4 class="docs-subheading">{t("docs.rules_locations_heading")}</h4>
            <div class="docs-scope-table">
                <div class="docs-scope-row">
                    <span class="badge badge-muted">{t("docs.scope_global")}</span>
                    <code>"~/.claude/rules/*.md"</code>
                    <span class="docs-scope-desc">{t("docs.rules_loc_global")}</span>
                </div>
                <div class="docs-scope-row">
                    <span class="badge badge-success">{t("docs.scope_project")}</span>
                    <code>"./.claude/rules/*.md"</code>
                    <span class="docs-scope-desc">{t("docs.rules_loc_project")}</span>
                </div>
            </div>

            <h4 class="docs-subheading">{t("docs.rules_examples_heading")}</h4>
            <ul class="docs-list">
                <li><code>"frontend.md"</code>{t("docs.rules_example_frontend")}</li>
                <li><code>"security.md"</code>{t("docs.rules_example_security")}</li>
                <li><code>"testing.md"</code>{t("docs.rules_example_testing")}</li>
                <li><code>"rust-style.md"</code>{t("docs.rules_example_rust")}</li>
            </ul>

            <h4 class="docs-subheading">{t("docs.tips_heading")}</h4>
            <div class="docs-tip">{t("docs.rules_tip1")}</div>
            <div class="docs-tip">{t("docs.rules_tip2")}</div>
            <div class="docs-tip">{t("docs.rules_tip3")}</div>
            <div class="docs-tip">{t("docs.rules_tip4")}</div>

            <div class="docs-link-box">
                <a href="https://docs.anthropic.com/en/docs/claude-code/memory#rules" target="_blank" class="docs-ext-link">
                    {t("docs.rules_ext_link")}
                </a>
            </div>
        </div>
    }
}

// ─────────────────────────────────────────────
// Section: Skills
// ─────────────────────────────────────────────
#[component]
fn SectionSkills() -> impl IntoView {
    view! {
            <div class="docs-section">
                <h3 class="docs-heading">{t("docs.skills_heading")}</h3>
                <div class="docs-callout docs-callout-accent">
                    {t("docs.skills_callout")}
                </div>

                <h4 class="docs-subheading">{t("docs.skills_how_heading")}</h4>
                <p class="docs-text">
                    {t("docs.skills_how_text")}
                </p>

                <h4 class="docs-subheading">{t("docs.skills_structure_heading")}</h4>
                <pre class="docs-code">
    {"~/.claude/skills/my-skill/
\u{251c}\u{2500}\u{2500} SKILL.md          # Main skill (required)
\u{251c}\u{2500}\u{2500} reference.md      # Additional context (optional)
\u{2514}\u{2500}\u{2500} examples/         # Example files (optional)"}
                </pre>
                <pre class="docs-code">
    {"---
description: Generate unit tests for Rust code
user_invocable: true
---
# Rust Test Generator

When writing tests for Rust code, follow these patterns..."}
                </pre>

                <h4 class="docs-subheading">{t("docs.skills_locations_heading")}</h4>
                <div class="docs-scope-table">
                    <div class="docs-scope-row">
                        <span class="badge badge-muted">{t("docs.scope_global")}</span>
                        <code>"~/.claude/skills/*/SKILL.md"</code>
                        <span class="docs-scope-desc">{t("docs.skills_loc_global")}</span>
                    </div>
                    <div class="docs-scope-row">
                        <span class="badge badge-success">{t("docs.scope_project")}</span>
                        <code>"./.claude/skills/*/SKILL.md"</code>
                        <span class="docs-scope-desc">{t("docs.skills_loc_project")}</span>
                    </div>
                </div>

                <h4 class="docs-subheading">{t("docs.tips_heading")}</h4>
                <div class="docs-tip">{t("docs.skills_tip1")}</div>
                <div class="docs-tip">{t("docs.skills_tip2")}</div>
                <div class="docs-tip">{t("docs.skills_tip3")}</div>
                <div class="docs-tip">{t("docs.skills_tip4")}</div>

                <div class="docs-link-box">
                    <a href="https://docs.anthropic.com/en/docs/claude-code/skills" target="_blank" class="docs-ext-link">
                        {t("docs.skills_ext_link")}
                    </a>
                </div>
            </div>
        }
}

// ─────────────────────────────────────────────
// Section: Memory
// ─────────────────────────────────────────────
#[component]
fn SectionMemory() -> impl IntoView {
    view! {
            <div class="docs-section">
                <h3 class="docs-heading">{t("docs.memory_heading")}</h3>
                <div class="docs-callout docs-callout-accent">
                    {t("docs.memory_callout")}
                </div>

                <h4 class="docs-subheading">{t("docs.memory_how_heading")}</h4>
                <p class="docs-text">
                    {t("docs.memory_how_text")}
                </p>

                <h4 class="docs-subheading">{t("docs.memory_structure_heading")}</h4>
                <pre class="docs-code">
    {"~/.claude/projects/<encoded>/memory/
\u{251c}\u{2500}\u{2500} MEMORY.md              # Main memory (first 200 lines auto-loaded)
\u{251c}\u{2500}\u{2500} debugging.md           # Topic: debugging patterns
\u{251c}\u{2500}\u{2500} api-conventions.md     # Topic: API design decisions
\u{2514}\u{2500}\u{2500} performance.md         # Topic: performance learnings"}
                </pre>

                <h4 class="docs-subheading">{t("docs.memory_auto_heading")}</h4>
                <p class="docs-text">
                    {t("docs.memory_auto_text")}
                </p>

                <h4 class="docs-subheading">{t("docs.tips_heading")}</h4>
                <div class="docs-tip">{t("docs.memory_tip1")}</div>
                <div class="docs-tip">{t("docs.memory_tip2")}</div>
                <div class="docs-tip">{t("docs.memory_tip3")}</div>
                <div class="docs-tip">{t("docs.memory_tip4")}</div>

                <div class="docs-link-box">
                    <a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" class="docs-ext-link">
                        {t("docs.memory_ext_link")}
                    </a>
                </div>
            </div>
        }
}

// ─────────────────────────────────────────────
// Section: Settings & Hooks
// ─────────────────────────────────────────────
#[component]
fn SectionSettings() -> impl IntoView {
    view! {
            <div class="docs-section">
                <h3 class="docs-heading">{t("docs.settings_heading")}</h3>
                <div class="docs-callout docs-callout-accent">
                    {t("docs.settings_callout")}
                </div>

                <h4 class="docs-subheading">{t("docs.settings_hierarchy_heading")}</h4>
                <p class="docs-text">
                    {t("docs.settings_hierarchy_text")}
                </p>
                <div class="docs-scope-table">
                    <div class="docs-scope-row">
                        <span class="badge badge-danger">{t("docs.scope_managed")}</span>
                        <code>{t("docs.settings_managed_code")}</code>
                        <span class="docs-scope-desc">{t("docs.settings_managed_desc")}</span>
                    </div>
                    <div class="docs-scope-row">
                        <span class="badge badge-muted">{t("docs.scope_global")}</span>
                        <code>"~/.claude/settings.json"</code>
                        <span class="docs-scope-desc">{t("docs.settings_global_desc")}</span>
                    </div>
                    <div class="docs-scope-row">
                        <span class="badge badge-success">{t("docs.scope_project")}</span>
                        <code>".claude/settings.json"</code>
                        <span class="docs-scope-desc">{t("docs.settings_project_desc")}</span>
                    </div>
                    <div class="docs-scope-row">
                        <span class="badge badge-warning">{t("docs.scope_local")}</span>
                        <code>".claude/settings.local.json"</code>
                        <span class="docs-scope-desc">{t("docs.settings_local_desc")}</span>
                    </div>
                </div>

                <h4 class="docs-subheading">{t("docs.settings_hooks_heading")}</h4>
                <p class="docs-text">
                    {t("docs.settings_hooks_text")}
                </p>
                <pre class="docs-code">
    {t("docs.settings_hooks_events")}
                </pre>

                <h4 class="docs-subheading">{t("docs.tips_heading")}</h4>
                <div class="docs-tip">{t("docs.settings_tip1")}</div>
                <div class="docs-tip">{t("docs.settings_tip2")}</div>
                <div class="docs-tip">{t("docs.settings_tip3")}</div>

                <div class="docs-link-box">
                    <a href="https://docs.anthropic.com/en/docs/claude-code/settings" target="_blank" class="docs-ext-link">
                        {t("docs.settings_ext_link")}
                    </a>
                    <a href="https://docs.anthropic.com/en/docs/claude-code/hooks" target="_blank" class="docs-ext-link">
                        {t("docs.settings_hooks_ext_link")}
                    </a>
                </div>
            </div>
        }
}

// ─────────────────────────────────────────────
// Section: MCP Servers
// ─────────────────────────────────────────────
#[component]
fn SectionMcp() -> impl IntoView {
    view! {
            <div class="docs-section">
                <h3 class="docs-heading">{t("docs.mcp_heading")}</h3>
                <div class="docs-callout docs-callout-accent">
                    {t("docs.mcp_callout")}
                </div>

                <h4 class="docs-subheading">{t("docs.mcp_how_heading")}</h4>
                <p class="docs-text">
                    {t("docs.mcp_how_text")}
                </p>

                <h4 class="docs-subheading">{t("docs.mcp_config_heading")}</h4>
                <pre class="docs-code">
    {"// ~/.claude.json
{
  \"mcpServers\": {
    \"my-server\": {
      \"command\": \"npx\",
      \"args\": [\"-y\", \"@some/mcp-server\"],
      \"env\": { \"API_KEY\": \"...\" }
    }
  }
}"}
                </pre>

                <h4 class="docs-subheading">{t("docs.mcp_management_heading")}</h4>
                <p class="docs-text">
                    {t("docs.mcp_management_text")}
                </p>

                <h4 class="docs-subheading">{t("docs.tips_heading")}</h4>
                <div class="docs-tip">{t("docs.mcp_tip1")}</div>
                <div class="docs-tip">{t("docs.mcp_tip2")}</div>
                <div class="docs-tip">{t("docs.mcp_tip3")}</div>

                <div class="docs-link-box">
                    <a href="https://docs.anthropic.com/en/docs/claude-code/mcp" target="_blank" class="docs-ext-link">
                        {t("docs.mcp_ext_link")}
                    </a>
                    <a href="https://modelcontextprotocol.io" target="_blank" class="docs-ext-link">
                        {t("docs.mcp_spec_ext_link")}
                    </a>
                </div>
            </div>
        }
}

// ─────────────────────────────────────────────
// Section: Plans
// ─────────────────────────────────────────────
#[component]
fn SectionPlans() -> impl IntoView {
    view! {
        <div class="docs-section">
            <h3 class="docs-heading">{t("docs.plans_heading")}</h3>
            <div class="docs-callout docs-callout-accent">
                {t("docs.plans_callout")}
            </div>

            <h4 class="docs-subheading">{t("docs.plans_how_heading")}</h4>
            <p class="docs-text">
                {t("docs.plans_how_text")}
            </p>

            <h4 class="docs-subheading">{t("docs.plans_location_heading")}</h4>
            <div class="docs-scope-table">
                <div class="docs-scope-row">
                    <span class="badge badge-muted">{t("docs.scope_global")}</span>
                    <code>"~/.claude/plans/*.md"</code>
                    <span class="docs-scope-desc">{t("docs.plans_loc_global")}</span>
                </div>
            </div>

            <h4 class="docs-subheading">{t("docs.tips_heading")}</h4>
            <div class="docs-tip">{t("docs.plans_tip1")}</div>
            <div class="docs-tip">{t("docs.plans_tip2")}</div>
        </div>
    }
}

// ─────────────────────────────────────────────
// Section: Global vs. Project Scope
// ─────────────────────────────────────────────
#[component]
fn SectionScopes() -> impl IntoView {
    view! {
        <div class="docs-section">
            <h3 class="docs-heading">{t("docs.scopes_heading")}</h3>
            <div class="docs-callout docs-callout-accent">
                {t("docs.scopes_callout")}
            </div>

            <h4 class="docs-subheading">{t("docs.scopes_overview_heading")}</h4>
            <div class="table-container" style="margin-bottom: 1.5rem;">
                <table>
                    <thead>
                        <tr>
                            <th>{t("docs.scopes_col_type")}</th>
                            <th>{t("docs.scopes_col_global")}</th>
                            <th>{t("docs.scopes_col_project")}</th>
                            <th>{t("docs.scopes_col_priority")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>"CLAUDE.md"</strong></td>
                            <td><code>"~/CLAUDE.md"</code></td>
                            <td><code>"./CLAUDE.md"</code></td>
                            <td>{t("docs.scopes_priority_project_global")}</td>
                        </tr>
                        <tr>
                            <td><strong>{t("docs.rules_heading")}</strong></td>
                            <td><code>"~/.claude/rules/"</code></td>
                            <td><code>".claude/rules/"</code></td>
                            <td>{t("docs.scopes_priority_project_global")}</td>
                        </tr>
                        <tr>
                            <td><strong>{t("docs.skills_heading")}</strong></td>
                            <td><code>"~/.claude/skills/"</code></td>
                            <td><code>".claude/skills/"</code></td>
                            <td>{t("docs.scopes_priority_both")}</td>
                        </tr>
                        <tr>
                            <td><strong>{t("docs.memory_heading")}</strong></td>
                            <td>{t("docs.scopes_memory_global")}</td>
                            <td>"\u{2013}"</td>
                            <td>{t("docs.scopes_priority_project_keyed")}</td>
                        </tr>
                        <tr>
                            <td><strong>{t("docs.settings_heading_short")}</strong></td>
                            <td><code>"~/.claude/settings.json"</code></td>
                            <td><code>".claude/settings.json"</code></td>
                            <td>{t("docs.scopes_priority_local_project_global")}</td>
                        </tr>
                        <tr>
                            <td><strong>{t("docs.mcp_heading")}</strong></td>
                            <td><code>"~/.claude.json"</code></td>
                            <td><code>".claude/settings.json"</code></td>
                            <td>{t("docs.scopes_priority_merged")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 class="docs-subheading">{t("docs.scopes_when_heading")}</h4>
            <div class="docs-two-col">
                <div class="docs-col">
                    <h4 class="docs-subheading docs-subheading-muted" style="font-size: 0.875rem;">{t("docs.scopes_use_global")}</h4>
                    <ul class="docs-list">
                        <li>{t("docs.scopes_global_1")}</li>
                        <li>{t("docs.scopes_global_2")}</li>
                        <li>{t("docs.scopes_global_3")}</li>
                        <li>{t("docs.scopes_global_4")}</li>
                        <li>{t("docs.scopes_global_5")}</li>
                    </ul>
                </div>
                <div class="docs-col">
                    <h4 class="docs-subheading docs-subheading-success" style="font-size: 0.875rem;">{t("docs.scopes_use_project")}</h4>
                    <ul class="docs-list">
                        <li>{t("docs.scopes_project_1")}</li>
                        <li>{t("docs.scopes_project_2")}</li>
                        <li>{t("docs.scopes_project_3")}</li>
                        <li>{t("docs.scopes_project_4")}</li>
                        <li>{t("docs.scopes_project_5")}</li>
                    </ul>
                </div>
            </div>
        </div>
    }
}

// ─────────────────────────────────────────────
// Section: Optimization Guide (linked from Analytics Tips)
// ─────────────────────────────────────────────
#[component]
fn SectionOptimization() -> impl IntoView {
    view! {
        <div class="docs-section">
            <h3 class="docs-heading">{t("docs.opt_heading")}</h3>
            <div class="docs-callout docs-callout-accent">
                {t("docs.opt_callout")}
            </div>

            // 1. Task Tool
            <h4 class="docs-subheading">{t("docs.opt_task_heading")}</h4>
            <p class="docs-text"><strong>{t("docs.opt_why")}</strong>" "{t("docs.opt_task_why")}</p>
            <p class="docs-text"><strong>{t("docs.opt_how")}</strong>" "{t("docs.opt_task_how")}</p>
            <div class="docs-link-box">
                <a href="https://docs.anthropic.com/en/docs/claude-code/best-practices" target="_blank" class="docs-ext-link">
                    {t("docs.opt_task_link")}
                </a>
            </div>

            // 2. Hooks
            <h4 class="docs-subheading">{t("docs.opt_hooks_heading")}</h4>
            <p class="docs-text"><strong>{t("docs.opt_why")}</strong>" "{t("docs.opt_hooks_why")}</p>
            <p class="docs-text"><strong>{t("docs.opt_how")}</strong>" "{t("docs.opt_hooks_how")}</p>
            <div class="docs-link-box">
                <a href="https://docs.anthropic.com/en/docs/claude-code/hooks" target="_blank" class="docs-ext-link">
                    {t("docs.opt_hooks_link")}
                </a>
            </div>

            // 3. Session Length
            <h4 class="docs-subheading">{t("docs.opt_sessions_heading")}</h4>
            <p class="docs-text"><strong>{t("docs.opt_why")}</strong>" "{t("docs.opt_sessions_why")}</p>
            <p class="docs-text"><strong>{t("docs.opt_how")}</strong>" "{t("docs.opt_sessions_how")}</p>
            <div class="docs-link-box">
                <a href="https://docs.anthropic.com/en/docs/claude-code/best-practices" target="_blank" class="docs-ext-link">
                    {t("docs.opt_sessions_link")}
                </a>
            </div>

            // 4. Cost Optimization
            <h4 class="docs-subheading">{t("docs.opt_cost_heading")}</h4>
            <p class="docs-text"><strong>{t("docs.opt_why")}</strong>" "{t("docs.opt_cost_why")}</p>
            <p class="docs-text"><strong>{t("docs.opt_how")}</strong>" "{t("docs.opt_cost_how")}</p>
            <div class="docs-link-box">
                <a href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank" class="docs-ext-link">
                    {t("docs.opt_cost_link")}
                </a>
            </div>

            // 5. Write vs Edit
            <h4 class="docs-subheading">{t("docs.opt_write_heading")}</h4>
            <p class="docs-text"><strong>{t("docs.opt_why")}</strong>" "{t("docs.opt_write_why")}</p>
            <p class="docs-text"><strong>{t("docs.opt_how")}</strong>" "{t("docs.opt_write_how")}</p>

            // 6. Model Selection
            <h4 class="docs-subheading">{t("docs.opt_models_heading")}</h4>
            <p class="docs-text"><strong>{t("docs.opt_why")}</strong>" "{t("docs.opt_models_why")}</p>
            <p class="docs-text"><strong>{t("docs.opt_how")}</strong>" "{t("docs.opt_models_how")}</p>
            <div class="docs-link-box">
                <a href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank" class="docs-ext-link">
                    {t("docs.opt_models_link")}
                </a>
            </div>

            // 7. Git Integration
            <h4 class="docs-subheading">{t("docs.opt_git_heading")}</h4>
            <p class="docs-text"><strong>{t("docs.opt_why")}</strong>" "{t("docs.opt_git_why")}</p>
            <p class="docs-text"><strong>{t("docs.opt_how")}</strong>" "{t("docs.opt_git_how")}</p>
            <div class="docs-link-box">
                <a href="https://docs.anthropic.com/en/docs/claude-code/best-practices" target="_blank" class="docs-ext-link">
                    {t("docs.opt_git_link")}
                </a>
            </div>

            // 8. Code Churn
            <h4 class="docs-subheading">{t("docs.opt_churn_heading")}</h4>
            <p class="docs-text"><strong>{t("docs.opt_why")}</strong>" "{t("docs.opt_churn_why")}</p>
            <p class="docs-text"><strong>{t("docs.opt_how")}</strong>" "{t("docs.opt_churn_how")}</p>
            <div class="docs-link-box">
                <a href="https://docs.anthropic.com/en/docs/claude-code/best-practices" target="_blank" class="docs-ext-link">
                    {t("docs.opt_churn_link")}
                </a>
            </div>
        </div>
    }
}

// ─────────────────────────────────────────────
// Section: Tips & Best Practices
// ─────────────────────────────────────────────
#[component]
fn SectionTips() -> impl IntoView {
    view! {
        <div class="docs-section">
            <h3 class="docs-heading">{t("docs.bestpractices_heading")}</h3>

            <h4 class="docs-subheading">{t("docs.bestpractices_hygiene_heading")}</h4>
            <div class="docs-tip">{t("docs.bestpractices_hygiene_1")}</div>
            <div class="docs-tip">{t("docs.bestpractices_hygiene_2")}</div>
            <div class="docs-tip">{t("docs.bestpractices_hygiene_3")}</div>

            <h4 class="docs-subheading">{t("docs.bestpractices_tokens_heading")}</h4>
            <div class="docs-tip">{t("docs.bestpractices_tokens_1")}</div>
            <div class="docs-tip">{t("docs.bestpractices_tokens_2")}</div>
            <div class="docs-tip">{t("docs.bestpractices_tokens_3")}</div>

            <h4 class="docs-subheading">{t("docs.bestpractices_team_heading")}</h4>
            <div class="docs-tip">{t("docs.bestpractices_team_1")}</div>
            <div class="docs-tip">{t("docs.bestpractices_team_2")}</div>
            <div class="docs-tip">{t("docs.bestpractices_team_3")}</div>

            <h4 class="docs-subheading">{t("docs.bestpractices_debug_heading")}</h4>
            <div class="docs-tip">{t("docs.bestpractices_debug_1")}</div>
            <div class="docs-tip">{t("docs.bestpractices_debug_2")}</div>
            <div class="docs-tip">{t("docs.bestpractices_debug_3")}</div>
        </div>
    }
}

// ─────────────────────────────────────────────
// Section: Official Documentation Links
// ─────────────────────────────────────────────
#[component]
fn SectionLinks() -> impl IntoView {
    view! {
        <div class="docs-section">
            <h3 class="docs-heading">{t("docs.links_heading")}</h3>
            <p class="docs-text" style="margin-bottom: 1.5rem;">
                {t("docs.links_text")}
            </p>

            <div class="docs-link-grid">
                <DocLinkCard
                    title=t("docs.link_overview_title")
                    desc=t("docs.link_overview_desc")
                    url="https://docs.anthropic.com/en/docs/claude-code/overview"
                />
                <DocLinkCard
                    title=t("docs.link_memory_title")
                    desc=t("docs.link_memory_desc")
                    url="https://docs.anthropic.com/en/docs/claude-code/memory"
                />
                <DocLinkCard
                    title=t("docs.link_skills_title")
                    desc=t("docs.link_skills_desc")
                    url="https://docs.anthropic.com/en/docs/claude-code/skills"
                />
                <DocLinkCard
                    title=t("docs.link_settings_title")
                    desc=t("docs.link_settings_desc")
                    url="https://docs.anthropic.com/en/docs/claude-code/settings"
                />
                <DocLinkCard
                    title=t("docs.link_hooks_title")
                    desc=t("docs.link_hooks_desc")
                    url="https://docs.anthropic.com/en/docs/claude-code/hooks"
                />
                <DocLinkCard
                    title=t("docs.link_mcp_title")
                    desc=t("docs.link_mcp_desc")
                    url="https://docs.anthropic.com/en/docs/claude-code/mcp"
                />
                <DocLinkCard
                    title=t("docs.link_bestpractices_title")
                    desc=t("docs.link_bestpractices_desc")
                    url="https://docs.anthropic.com/en/docs/claude-code/best-practices"
                />
                <DocLinkCard
                    title=t("docs.link_mcp_spec_title")
                    desc=t("docs.link_mcp_spec_desc")
                    url="https://modelcontextprotocol.io"
                />
            </div>
        </div>
    }
}

#[component]
fn DocLinkCard(title: Signal<String>, desc: Signal<String>, url: &'static str) -> impl IntoView {
    view! {
        <a href=url target="_blank" class="docs-link-card">
            <div class="docs-link-card-title">{title}</div>
            <div class="docs-link-card-desc">{desc}</div>
            <div class="docs-link-card-url">{url}" \u{2192}"</div>
        </a>
    }
}
