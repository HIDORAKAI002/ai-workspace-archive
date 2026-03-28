use serde::{Deserialize, Deserializer, Serialize};

// === Audit ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuditEntry {
    pub timestamp: String,
    pub action: String,
    pub resource_type: String,
    pub resource_name: String,
    #[serde(default)]
    pub details: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuditLogResponse {
    pub entries: Vec<AuditEntry>,
    pub total: u64,
}

// === Budget ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BudgetConfig {
    #[serde(default)]
    pub daily_budget_usd: Option<f64>,
    #[serde(default)]
    pub weekly_budget_usd: Option<f64>,
    #[serde(default)]
    pub monthly_budget_usd: Option<f64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BudgetStatus {
    pub config: BudgetConfig,
    pub current_daily_cost: f64,
    pub current_weekly_cost: f64,
    pub current_monthly_cost: f64,
    pub alerts: Vec<String>,
}

// === Webhooks ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WebhookConfig {
    pub id: String,
    pub url: String,
    pub events: Vec<String>,
    pub secret: Option<String>,
    pub active: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WebhookCreateRequest {
    pub url: String,
    pub events: Vec<String>,
    #[serde(default)]
    pub secret: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WebhookUpdateRequest {
    pub url: Option<String>,
    pub events: Option<Vec<String>>,
    pub secret: Option<String>,
    pub active: Option<bool>,
}

// === Sync ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SyncManifest {
    pub instance_id: String,
    pub files: Vec<SyncFileEntry>,
    pub generated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SyncFileEntry {
    pub path: String,
    pub hash: String,
    pub size: u64,
    pub modified: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SyncPushRequest {
    pub target_url: String,
    pub files: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SyncPullRequest {
    pub source_url: String,
    pub files: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SyncResult {
    pub transferred: usize,
    pub skipped: usize,
    pub errors: Vec<String>,
}

// === RBAC ===

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum UserRole {
    Admin,
    Editor,
    Viewer,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserEntry {
    pub username: String,
    pub role: UserRole,
    pub token: String,
}

// === Diff ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DiffResult {
    pub lines: Vec<DiffLine>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DiffLine {
    pub kind: String, // "add", "remove", "context"
    pub content: String,
    pub line_number: Option<usize>,
}

// === Backup Prune ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PruneResult {
    pub deleted_count: usize,
    pub remaining_count: usize,
}

// === Login ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LoginRequest {
    pub token: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LoginResponse {
    pub session_token: String,
    pub expires_at: String,
}

// === Preview ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MarkdownPreviewRequest {
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MarkdownPreviewResponse {
    pub html: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HighlightRequest {
    pub code: String,
    pub language: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HighlightResponse {
    pub html: String,
}

// === Enums ===

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum ConfigScope {
    Global,
    Project,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum ClaudeFileType {
    ClaudeMd,
    Rule,
    Skill,
    Memory,
    Settings,
    Plan,
}

// === Dashboard ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DashboardOverview {
    pub global_skills_count: usize,
    pub global_rules_count: usize,
    pub projects_count: usize,
    pub mcp_servers_count: usize,
    pub plans_count: usize,
    pub recent_projects: Vec<ProjectSummaryLite>,
    pub conflicts: Vec<ConflictInfo>,
    /// Health score is loaded lazily via /api/v1/dashboard/health
    #[serde(skip_serializing_if = "Option::is_none")]
    pub health_score: Option<u8>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum ConflictType {
    NameCollision,
    ContentOverlap,
    Contradiction,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConflictInfo {
    pub name: String,
    pub file_type: ClaudeFileType,
    pub global_path: String,
    pub project_path: String,
    pub conflict_type: ConflictType,
    pub description: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuleConflictsResponse {
    pub conflicts: Vec<ConflictInfo>,
}

// === Projects ===

/// Lightweight project info - instant from ~/.claude.json, no filesystem checks.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectSummaryLite {
    pub path: String,
    pub encoded_path: String,
    pub name: String,
}

/// Filesystem status for a single project - loaded JIT on demand.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectStatus {
    pub has_claude_md: bool,
    pub has_claude_dir: bool,
    pub has_rules: bool,
    pub has_skills: bool,
    pub has_memory: bool,
}

/// Full summary (lite + status combined) - used internally and for project detail.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectSummary {
    pub path: String,
    pub encoded_path: String,
    pub name: String,
    pub has_claude_md: bool,
    pub has_claude_dir: bool,
    pub has_rules: bool,
    pub has_skills: bool,
    pub has_memory: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectDetail {
    pub summary: ProjectSummary,
    pub claude_md: Option<String>,
    pub rules: Vec<RuleFile>,
    pub skills: Vec<SkillFile>,
    pub memory_files: Vec<MemoryFile>,
}

// === Skills ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillFile {
    pub name: String,
    pub path: String,
    pub scope: ConfigScope,
    pub frontmatter: SkillFrontmatter,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SkillFrontmatter {
    pub description: Option<String>,
    pub user_invocable: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillCreateRequest {
    pub name: String,
    pub scope: ConfigScope,
    pub frontmatter: SkillFrontmatter,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillUpdateRequest {
    pub frontmatter: SkillFrontmatter,
    pub content: String,
}

// === Rules ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuleFile {
    pub name: String,
    pub path: String,
    pub scope: ConfigScope,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuleCreateRequest {
    pub name: String,
    pub scope: ConfigScope,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuleUpdateRequest {
    pub content: String,
}

// === Memory ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MemoryFile {
    pub name: String,
    pub path: String,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MemoryUpdateRequest {
    pub content: String,
}

// === Settings ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsOverview {
    pub global_settings: serde_json::Value,
    pub hooks: HooksConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct HooksConfig {
    pub pre_tool_use: Vec<HookEntry>,
    pub post_tool_use: Vec<HookEntry>,
    #[serde(default)]
    pub notification: Vec<HookEntry>,
    #[serde(default)]
    pub stop: Vec<HookEntry>,
    #[serde(default)]
    pub user_prompt_submit: Vec<HookEntry>,
    #[serde(default)]
    pub session_start: Vec<HookEntry>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HookEntry {
    pub matcher: String,
    pub hooks: Vec<HookCommand>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HookCommand {
    #[serde(rename = "type")]
    pub hook_type: String,
    pub command: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub timeout: Option<u64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsUpdateRequest {
    pub settings: serde_json::Value,
}

// === MCP Servers ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpServerInfo {
    pub name: String,
    pub scope: ConfigScope,
    pub project_path: Option<String>,
    pub config: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpServerDetail {
    pub name: String,
    pub command: String,
    pub args: Vec<String>,
    pub env: std::collections::HashMap<String, String>,
    pub raw_config: serde_json::Value,
    pub source: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum McpServerStatus {
    Running,
    Error,
    Timeout,
    Unsupported,
    Unknown,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpHealthResult {
    pub name: String,
    pub status: McpServerStatus,
    pub server_info: Option<String>,
    pub tools: Vec<McpToolInfo>,
    pub duration_ms: u64,
    pub error: Option<String>,
    pub source: String,
    #[serde(default)]
    pub stderr_output: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpToolInfo {
    pub name: String,
    pub description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub input_schema: Option<serde_json::Value>,
}

/// Accepts both wrapper format `{"name":"x","config":{...}}` and
/// flat format `{"name":"x","command":"...","args":[...],"env":{}}`.
#[derive(Debug, Clone, Serialize)]
pub struct McpServerCreateRequest {
    pub name: String,
    pub config: serde_json::Value,
}

impl<'de> Deserialize<'de> for McpServerCreateRequest {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let raw: serde_json::Value = serde_json::Value::deserialize(deserializer)?;
        let obj = raw
            .as_object()
            .ok_or_else(|| serde::de::Error::custom("expected JSON object"))?;

        let name = obj
            .get("name")
            .and_then(|v| v.as_str())
            .ok_or_else(|| serde::de::Error::missing_field("name"))?
            .to_string();

        // If "config" key is present, use wrapper format
        if let Some(config) = obj.get("config") {
            return Ok(McpServerCreateRequest {
                name,
                config: config.clone(),
            });
        }

        // Flat format: collect all fields except "name" into config
        let mut config_map = serde_json::Map::new();
        for (key, value) in obj {
            if key != "name" {
                config_map.insert(key.clone(), value.clone());
            }
        }

        Ok(McpServerCreateRequest {
            name,
            config: serde_json::Value::Object(config_map),
        })
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpServerUpdateRequest {
    pub config: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BrowsableMcpServer {
    pub name: String,
    pub description: String,
    pub category: String,
    pub npm_package: String,
    pub default_config: serde_json::Value,
    pub installed: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpInstallRequest {
    pub name: String,
    pub config: serde_json::Value,
}

// === Plans ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlanFile {
    pub name: String,
    pub path: String,
    pub content: String,
    pub modified: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlanUpdateRequest {
    pub content: String,
}

// === Claude MD ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ClaudeMdContent {
    pub content: String,
    pub path: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ClaudeMdUpdateRequest {
    pub content: String,
}

// === AI ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SuggestionRequest {
    pub file_type: ClaudeFileType,
    pub content: String,
    pub context: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SuggestionResponse {
    pub suggestions: Vec<String>,
    pub improved_content: Option<String>,
    pub validation_issues: Vec<String>,
}

// === Project Advisor ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AdvisorReport {
    pub project_summary: String,
    pub recommendations: Vec<AdvisorRecommendation>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AdvisorRecommendation {
    pub category: AdvisorCategory,
    pub title: String,
    pub description: String,
    pub action: Option<AdvisorAction>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum AdvisorCategory {
    GlobalSkill,
    GlobalRule,
    ClaudeMd,
    Memory,
    Hooks,
    General,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AdvisorAction {
    pub label: String,
    pub action_type: AdvisorActionType,
    pub payload: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum AdvisorActionType {
    CreateClaudeMd,
    UpdateClaudeMd,
    EnableSkill,
    CreateRule,
    InitMemory,
}

// === Project Profile ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectProfile {
    pub has_claude_md: bool,
    pub rules: Vec<RuleFile>,
    pub skills: Vec<SkillFile>,
    pub memory_files: Vec<String>,
    pub mcp_servers: Vec<String>,
    pub hooks_count: usize,
    pub health_score: u8,
    pub conflicts: Vec<ConflictInfo>,
}

// === Effective Config ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EffectiveConfig {
    pub rules: EffectiveConfigSection<RuleFile>,
    pub skills: EffectiveConfigSection<SkillFile>,
    pub mcp_servers: Vec<McpServerDetail>,
    pub hooks: EffectiveHooksSection,
    pub has_claude_md: bool,
    pub memory_files: Vec<String>,
    pub conflicts: Vec<ConflictInfo>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EffectiveConfigSection<T> {
    pub global: Vec<T>,
    pub project: Vec<T>,
    pub effective_count: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EffectiveHooksSection {
    pub global_count: usize,
    pub effective_hooks: Vec<EffectiveHook>,
}

// === Health ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HealthResponse {
    pub status: String,
    pub version: String,
}

/// Lazy-loaded dashboard health score.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DashboardHealthScore {
    pub health_score: u8,
}

// === Claude JSON (for parsing ~/.claude.json) ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ClaudeJsonOverview {
    pub projects: serde_json::Value,
    pub mcp_servers: serde_json::Value,
}

// === Phase 8: Permissions ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectPermissionSummary {
    pub project_id: String,
    pub project_name: String,
    pub path: String,
    pub total_entries: usize,
    pub security_issues: usize,
    pub fragmented_entries: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectPermissions {
    pub project_id: String,
    pub entries: Vec<PermissionEntry>,
    pub security_warnings: Vec<SecurityWarning>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PermissionEntry {
    pub index: usize,
    pub tool: String,
    pub command: String,
    pub is_fragmented: bool,
    pub security_issue: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SecurityWarning {
    pub index: usize,
    pub severity: String,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PermissionDeleteRequest {
    pub indices: Vec<usize>,
}

// === Phase 8: Config Health ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HealthOverview {
    pub projects: Vec<ProjectHealthSummary>,
    pub average_score: u8,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectHealthSummary {
    pub project_id: String,
    pub name: String,
    pub score: u8,
    pub issues: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectHealth {
    pub score: u8,
    pub has_claude_md: bool,
    pub has_memory: bool,
    pub permission_count: usize,
    pub security_issues: Vec<SecurityWarning>,
    pub duplicated_rules: Vec<DuplicatedRule>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DuplicatedRule {
    pub text: String,
    pub found_in_project: String,
    pub also_in_global: String,
}

// === Phase 9: Skill Browser ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BrowsableSkill {
    pub name: String,
    pub description: String,
    pub source: SkillSource,
    pub repo: String,
    pub path: String,
    pub installed: bool,
    pub category: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum SkillSource {
    Official,
    Community,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillDetail {
    pub name: String,
    pub content: String,
    pub frontmatter: SkillFrontmatter,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillInstallRequest {
    pub name: String,
    pub content: String,
}

// === Skill Builder ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillTemplate {
    pub id: String,
    pub name: String,
    pub description: String,
    pub category: String,
    pub trigger_example: String,
    pub frontmatter: SkillFrontmatter,
    pub content_template: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillPreviewRequest {
    pub frontmatter: SkillFrontmatter,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillPreviewResponse {
    pub rendered: String,
    pub trigger: Option<String>,
    pub warnings: Vec<String>,
}

// === Phase 10: Settings Hierarchy ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsHierarchy {
    pub layers: Vec<SettingsLayer>,
    pub effective_hooks: Vec<EffectiveHook>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsLayer {
    pub scope: String,
    pub path: String,
    pub content: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EffectiveHook {
    pub event: String,
    pub matcher: Option<String>,
    pub command: String,
    pub source: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HookTemplate {
    pub name: String,
    pub description: String,
    pub event: String,
    pub matcher: Option<String>,
    pub command: String,
}

// === Phase 11: Analytics ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnalyticsOverview {
    pub total_sessions: u64,
    pub total_messages: u64,
    pub first_session_date: Option<String>,
    pub daily_activity: Vec<DailyActivity>,
    pub hour_distribution: Vec<(u8, u64)>,
    pub model_usage: Vec<ModelUsageEntry>,
    pub tool_ranking: Vec<(String, u64)>,
    pub language_breakdown: Vec<(String, u64)>,
    pub outcome_distribution: Vec<(String, u64)>,
    pub total_git_commits: u64,
    pub total_lines_added: u64,
    pub total_lines_removed: u64,
    #[serde(default)]
    pub estimated_total_cost_usd: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DailyActivity {
    pub date: String,
    pub message_count: u64,
    pub session_count: u64,
    pub tool_call_count: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ModelUsageEntry {
    pub model: String,
    pub input_tokens: u64,
    pub output_tokens: u64,
    pub cache_read_tokens: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectAnalytics {
    pub path: String,
    pub name: String,
    pub session_count: u64,
    pub total_input_tokens: u64,
    pub total_output_tokens: u64,
    pub estimated_cost_usd: f64,
    pub languages: Vec<(String, u64)>,
}

// === Teach Me Tips ===

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum TipCategory {
    Tool,
    Workflow,
    Performance,
    Config,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TeachMeTip {
    pub id: String,
    pub category: TipCategory,
    pub title: String,
    pub body: String,
    pub data_point: String,
    pub action_url: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TeachMeResponse {
    pub tips: Vec<TeachMeTip>,
}

// === Phase 12: Sessions ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionListResponse {
    pub sessions: Vec<SessionSummary>,
    pub total: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionSummary {
    pub session_id: String,
    pub project_name: String,
    pub start_time: String,
    pub duration_minutes: u64,
    pub message_count: u64,
    pub summary: Option<String>,
    pub outcome: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionDetail {
    pub session_id: String,
    pub project_path: String,
    pub start_time: String,
    pub duration_minutes: u64,
    pub user_message_count: u64,
    pub assistant_message_count: u64,
    pub tool_counts: Vec<(String, u64)>,
    pub languages: Vec<(String, u64)>,
    pub git_commits: u64,
    pub lines_added: u64,
    pub lines_removed: u64,
    pub files_modified: u64,
    pub first_prompt: Option<String>,
    pub summary: Option<String>,
    pub input_tokens: u64,
    pub output_tokens: u64,
    pub outcome: Option<String>,
    pub helpfulness: Option<String>,
    pub brief_summary: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HistoryEntry {
    pub display: String,
    pub timestamp: u64,
    pub project: String,
    pub session_id: String,
}

// === Session Transcript ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TranscriptMessage {
    pub role: String, // "user", "assistant", "tool_use", "tool_result"
    pub content: String,
    #[serde(default)]
    pub tool_name: Option<String>,
    pub timestamp: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionTranscript {
    pub session_id: String,
    pub messages: Vec<TranscriptMessage>,
}

// === Phase 13: System Info & GitHub ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemInfo {
    pub account_name: Option<String>,
    pub account_email: Option<String>,
    pub subscription_type: Option<String>,
    pub claude_code_version: Option<String>,
    pub gh_cli_status: Option<String>,
    pub skill_usage: Vec<(String, u64)>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GitHubOverview {
    pub auth_status: String,
    pub username: Option<String>,
    pub linked_repos: Vec<GitHubRepo>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GitHubRepo {
    pub path: String,
    pub name: String,
    pub recent_commits: Vec<GitHubCommit>,
    pub open_prs: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GitHubCommit {
    pub sha: String,
    pub message: String,
    pub date: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StorageInfo {
    pub total_bytes: u64,
    pub directories: Vec<StorageDirectory>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StorageDirectory {
    pub name: String,
    pub bytes: u64,
}

// === Licenses ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LicensesResponse {
    pub own_license: String,
    pub direct_dependencies: Vec<DependencyInfo>,
    pub transitive_dependencies: Vec<DependencyInfo>,
    pub license_summary: Vec<LicenseSummary>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DependencyInfo {
    pub name: String,
    pub version: String,
    pub license: String,
    pub repository: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LicenseSummary {
    pub license: String,
    pub count: usize,
}

// === Backups ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BackupEntry {
    pub name: String,
    pub size_bytes: u64,
    pub created: String,
    pub original_path: String,
}

// === Export/Import ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportBundle {
    pub version: String,
    pub exported_at: String,
    pub skills: Vec<SkillFile>,
    pub rules: Vec<RuleFile>,
    pub settings: serde_json::Value,
    pub mcp_servers: Vec<McpServerDetail>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ImportResult {
    pub skills_imported: usize,
    pub rules_imported: usize,
    pub settings_imported: bool,
    pub mcp_servers_imported: usize,
}

// === Search ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchResult {
    pub resource_type: String,
    pub name: String,
    pub path: String,
    pub snippet: String,
    pub score: f64,
}

// === Config Templates ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConfigTemplate {
    pub name: String,
    pub description: String,
    pub category: String,
    pub rules: Vec<String>,
    pub skills: Vec<String>,
    pub claude_md_snippet: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TemplateApplyResult {
    pub rules_created: usize,
    pub skills_created: usize,
    pub claude_md_updated: bool,
}

// === Permission Optimizer ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PermissionOptimization {
    pub description: String,
    pub current_entries: Vec<String>,
    pub suggested_entry: String,
    pub entries_saved: usize,
}

// === Agents ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentDefinition {
    pub name: String,
    pub description: String,
    pub prompt: String,
    #[serde(default)]
    pub model: Option<String>,
    #[serde(default)]
    pub allowed_tools: Vec<String>,
    #[serde(default)]
    pub disallowed_tools: Vec<String>,
    #[serde(default)]
    pub custom_instructions: Option<String>,
    pub source: String, // "settings.json", "project", "cli"
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentCreateRequest {
    pub name: String,
    pub description: String,
    pub prompt: String,
    #[serde(default)]
    pub model: Option<String>,
    #[serde(default)]
    pub allowed_tools: Vec<String>,
    #[serde(default)]
    pub disallowed_tools: Vec<String>,
    #[serde(default)]
    pub custom_instructions: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgentUpdateRequest {
    pub description: Option<String>,
    pub prompt: Option<String>,
    pub model: Option<String>,
    pub allowed_tools: Option<Vec<String>>,
    pub disallowed_tools: Option<Vec<String>>,
    pub custom_instructions: Option<String>,
}

// === Plugins ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginInfo {
    pub name: String,
    pub path: String,
    pub description: Option<String>,
    pub version: Option<String>,
    pub enabled: bool,
    pub source: String, // "global", "session"
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginInstallRequest {
    pub path: String,
}

// === Launch Profiles ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LaunchProfile {
    pub name: String,
    pub description: String,
    #[serde(default)]
    pub model: Option<String>,
    #[serde(default)]
    pub effort: Option<String>,
    #[serde(default)]
    pub permission_mode: Option<String>,
    #[serde(default)]
    pub allowed_tools: Vec<String>,
    #[serde(default)]
    pub disallowed_tools: Vec<String>,
    #[serde(default)]
    pub system_prompt: Option<String>,
    #[serde(default)]
    pub append_system_prompt: Option<String>,
    #[serde(default)]
    pub max_budget_usd: Option<f64>,
    #[serde(default)]
    pub fallback_model: Option<String>,
    #[serde(default)]
    pub mcp_config: Option<String>,
    #[serde(default)]
    pub debug: Option<String>,
    #[serde(default)]
    pub add_dirs: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LaunchProfileCreateRequest {
    pub name: String,
    pub description: String,
    #[serde(default)]
    pub model: Option<String>,
    #[serde(default)]
    pub effort: Option<String>,
    #[serde(default)]
    pub permission_mode: Option<String>,
    #[serde(default)]
    pub allowed_tools: Vec<String>,
    #[serde(default)]
    pub disallowed_tools: Vec<String>,
    #[serde(default)]
    pub system_prompt: Option<String>,
    #[serde(default)]
    pub append_system_prompt: Option<String>,
    #[serde(default)]
    pub max_budget_usd: Option<f64>,
    #[serde(default)]
    pub fallback_model: Option<String>,
    #[serde(default)]
    pub mcp_config: Option<String>,
    #[serde(default)]
    pub debug: Option<String>,
    #[serde(default)]
    pub add_dirs: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LaunchProfileUpdateRequest {
    pub description: Option<String>,
    pub model: Option<String>,
    pub effort: Option<String>,
    pub permission_mode: Option<String>,
    pub allowed_tools: Option<Vec<String>>,
    pub disallowed_tools: Option<Vec<String>>,
    pub system_prompt: Option<String>,
    pub append_system_prompt: Option<String>,
    pub max_budget_usd: Option<f64>,
    pub fallback_model: Option<String>,
    pub mcp_config: Option<String>,
    pub debug: Option<String>,
    pub add_dirs: Option<Vec<String>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LaunchCommand {
    pub command: String,
}

// === System Prompts ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemPromptFile {
    pub name: String,
    pub path: String,
    pub content: String,
    pub modified: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemPromptCreateRequest {
    pub name: String,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemPromptUpdateRequest {
    pub content: String,
}

// === Tool Access Control ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ToolAccessConfig {
    pub project_id: Option<String>,
    pub project_name: Option<String>,
    pub allowed_tools: Vec<String>,
    pub disallowed_tools: Vec<String>,
    pub available_tools: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ToolAccessUpdateRequest {
    pub allowed_tools: Vec<String>,
    pub disallowed_tools: Vec<String>,
}

// === Worktrees ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorktreeInfo {
    pub path: String,
    pub branch: String,
    pub head_commit: String,
    pub is_main: bool,
    pub is_bare: bool,
    pub project_name: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorktreeCreateRequest {
    pub project_path: String,
    pub name: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorktreeCreateResult {
    pub path: String,
    pub branch: String,
}

// === IDE & Chrome Integration ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdeStatus {
    pub connected_ides: Vec<IdeConnection>,
    pub chrome_enabled: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdeConnection {
    pub name: String,
    pub ide_type: String, // "vscode", "cursor", "jetbrains", etc.
    pub status: String,   // "connected", "available", "unavailable"
}

// === Auth & Update Status ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthStatus {
    pub authenticated: bool,
    pub auth_method: Option<String>, // "oauth", "api_key", "token"
    pub account_name: Option<String>,
    pub account_email: Option<String>,
    pub subscription_type: Option<String>,
    pub expires_at: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateStatus {
    pub current_version: String,
    pub latest_version: Option<String>,
    pub update_available: bool,
    pub auto_updater_healthy: bool,
    pub last_check: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DoctorResult {
    pub checks: Vec<DoctorCheck>,
    pub overall_healthy: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DoctorCheck {
    pub name: String,
    pub status: String, // "ok", "warning", "error"
    pub message: String,
}

// === Debug Profiles ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DebugProfile {
    pub name: String,
    pub filter: String, // e.g. "api,hooks", "!1p,!file"
    pub debug_file: Option<String>,
    pub description: String,
}

// === Combined System Status (for Settings page) ===

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemStatus {
    pub auth: AuthStatus,
    pub update: UpdateStatus,
    pub ide: IdeStatus,
}
