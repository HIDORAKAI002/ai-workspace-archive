use claude_admin_shared::SystemInfo;
use leptos::*;

use crate::api;
use crate::i18n::t;

#[component]
pub fn HelpPage() -> impl IntoView {
    let system_info = create_resource(
        || (),
        |_| async move { api::get::<SystemInfo>("/system/info").await },
    );

    view! {
        <div class="page-header">
            <h2>{t("help.title")}</h2>
            <p>{t("help.subtitle")}</p>
        </div>

        // What is ClaudeAdmin?
        <div class="card" style="margin-bottom: 1.5rem; border-left: 3px solid var(--accent);">
            <h3 style="margin-bottom: 0.75rem;">{t("help.what_is_title")}</h3>
            <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.9375rem;">
                {t("help.what_is_desc")}
            </p>
        </div>

        // Account & System Info
        <Suspense fallback=move || view! { <div class="loading">{t("help.loading")}</div> }>
            {move || system_info.get().map(|result| match result {
                Ok(info) => view! {
                    <h3 style="margin-bottom: 1rem;">{t("help.system_status")}</h3>
                    <div class="card-grid" style="margin-bottom: 2rem;">
                        <div class="card">
                            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">{t("help.account")}</div>
                            <div style="font-weight: 600;">{info.account_name.unwrap_or_else(|| "Not set".to_string())}</div>
                            <div style="font-size: 0.8125rem; color: var(--text-secondary);">{info.account_email.unwrap_or_default()}</div>
                        </div>
                        <div class="card">
                            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">{t("help.subscription")}</div>
                            <div style="font-weight: 600;">{info.subscription_type.unwrap_or_else(|| "Unknown".to_string())}</div>
                        </div>
                        <div class="card">
                            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">{t("help.claude_version")}</div>
                            <div style="font-weight: 600;">{info.claude_code_version.unwrap_or_else(|| "Not found".to_string())}</div>
                        </div>
                        <div class="card">
                            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">{t("help.gh_cli")}</div>
                            <div style="font-weight: 600; font-size: 0.8125rem; word-break: break-all;">
                                {info.gh_cli_status.unwrap_or_else(|| "Not installed".to_string()).chars().take(60).collect::<String>()}
                            </div>
                        </div>
                    </div>

                    // Skill Usage
                    {if !info.skill_usage.is_empty() {
                        view! {
                            <h3 style="margin-bottom: 1rem;">{t("help.skill_usage")}</h3>
                            <div class="table-container" style="margin-bottom: 2rem;">
                                <table>
                                    <thead><tr><th>{t("help.col_skill")}</th><th>{t("help.col_count")}</th></tr></thead>
                                    <tbody>
                                        {info.skill_usage.into_iter().map(|(name, count)| view! {
                                            <tr>
                                                <td>{name}</td>
                                                <td><span class="badge badge-muted">{count}</span></td>
                                            </tr>
                                        }).collect_view()}
                                    </tbody>
                                </table>
                            </div>
                        }.into_view()
                    } else {
                        view! {}.into_view()
                    }}
                }.into_view(),
                Err(e) => view! {
                    <div class="empty-state"><p>{t("common.error_prefix")} {e}</p></div>
                }.into_view(),
            })}
        </Suspense>

        // Claude Code Concepts
        <h3 style="margin-bottom: 1rem;">{t("help.concepts_title")}</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
            <div class="card">
                <h4 style="color: var(--accent); margin-bottom: 0.5rem;">"Skills"</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
                    {t("help.concept_skills")}
                </p>
            </div>
            <div class="card">
                <h4 style="color: var(--accent); margin-bottom: 0.5rem;">"Rules"</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
                    {t("help.concept_rules")}
                </p>
            </div>
            <div class="card">
                <h4 style="color: var(--accent); margin-bottom: 0.5rem;">"Memory"</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
                    {t("help.concept_memory")}
                </p>
            </div>
            <div class="card">
                <h4 style="color: var(--accent); margin-bottom: 0.5rem;">"Hooks"</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
                    {t("help.concept_hooks")}
                </p>
            </div>
            <div class="card">
                <h4 style="color: var(--accent); margin-bottom: 0.5rem;">"MCP Servers"</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
                    {t("help.concept_mcp")}
                </p>
            </div>
            <div class="card">
                <h4 style="color: var(--accent); margin-bottom: 0.5rem;">"CLAUDE.md"</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
                    {t("help.concept_claudemd")}
                </p>
            </div>
        </div>

        // Disclaimer
        <div style="padding: 0.75rem 1rem; border-radius: 0.375rem; background: rgba(100, 116, 139, 0.08); border: 1px solid var(--border); color: var(--text-muted); font-size: 0.8125rem; line-height: 1.6;">
            {t("help.disclaimer")}
        </div>
    }
}
