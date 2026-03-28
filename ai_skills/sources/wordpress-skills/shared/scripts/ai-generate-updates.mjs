/**
 * AI-powered skill update generator
 *
 * Analyzes upstream changes and generates updates to affected skills.
 * Designed to run in GitHub Actions with ANTHROPIC_API_KEY env var.
 *
 * Usage:
 *   node shared/scripts/ai-generate-updates.mjs
 *
 * Environment:
 *   ANTHROPIC_API_KEY - Required
 *   AI_DRY_RUN        - Set to "true" to skip writing files
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = process.cwd();
const REFERENCES_DIR = path.join(REPO_ROOT, "shared", "references");
const SKILLS_DIR = path.join(REPO_ROOT, "skills");
const STATE_FILE = path.join(REPO_ROOT, ".github", "state", "last-sync.json");

// Model selection: Sonnet 4 for balanced cost/performance
const MODEL = "claude-sonnet-4-20250514";

/**
 * Load JSON file safely
 */
function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

/**
 * Write JSON file with directory creation
 */
function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

/**
 * Get current upstream state hash for comparison
 */
function getUpstreamStateHash(indices) {
  const state = {
    wpLatest: indices.wordpress?.latest ?? null,
    gbLatest: indices.gutenberg?.latest?.tag ?? null,
    gbRecentCount: indices.gutenberg?.recent?.length ?? 0,
    mapRowCount: indices.map?.rows?.length ?? 0,
  };
  // Simple hash: JSON stringify and take first 16 chars of base64
  const hash = Buffer.from(JSON.stringify(state)).toString("base64").slice(0, 16);
  return { hash, state };
}

/**
 * Load all current upstream indices
 */
function loadUpstreamIndices() {
  return {
    wordpress: loadJson(path.join(REFERENCES_DIR, "wordpress-core-versions.json")),
    gutenberg: loadJson(path.join(REFERENCES_DIR, "gutenberg-releases.json")),
    map: loadJson(path.join(REFERENCES_DIR, "wp-gutenberg-version-map.json")),
  };
}

/**
 * Load last sync state
 */
function loadLastSyncState() {
  return loadJson(STATE_FILE) ?? { hash: null, state: null, lastSync: null };
}

/**
 * Save current sync state
 */
function saveSyncState(hash, state, changes) {
  writeJson(STATE_FILE, {
    hash,
    state,
    lastSync: new Date().toISOString(),
    lastChanges: changes,
  });
}

/**
 * Detect what changed between last sync and current state
 */
function detectChanges(lastState, currentState) {
  const changes = [];

  if (!lastState.state) {
    changes.push({
      type: "initial-sync",
      description: "First sync - no previous state",
      riskLevel: "low",
    });
    return changes;
  }

  const last = lastState.state;
  const current = currentState.state;

  // WordPress version change
  if (last.wpLatest !== current.wpLatest) {
    changes.push({
      type: "wordpress-release",
      description: `WordPress updated: ${last.wpLatest} → ${current.wpLatest}`,
      oldVersion: last.wpLatest,
      newVersion: current.wpLatest,
      riskLevel: "medium",
      affectedSkills: [
        "wp-block-themes",
        "wp-block-development",
        "wp-plugin-development",
      ],
    });
  }

  // Gutenberg version change
  if (last.gbLatest !== current.gbLatest) {
    changes.push({
      type: "gutenberg-release",
      description: `Gutenberg updated: ${last.gbLatest} → ${current.gbLatest}`,
      oldVersion: last.gbLatest,
      newVersion: current.gbLatest,
      riskLevel: "medium",
      affectedSkills: [
        "wp-interactivity-api",
        "wp-abilities-api",
        "wp-block-development",
      ],
    });
  }

  // Map table updated (new mappings added)
  if (last.mapRowCount !== current.mapRowCount) {
    changes.push({
      type: "version-map-update",
      description: `WP↔Gutenberg mapping updated: ${last.mapRowCount} → ${current.mapRowCount} entries`,
      riskLevel: "low",
      affectedSkills: ["wordpress-router"],
    });
  }

  return changes;
}

/**
 * Load a skill's SKILL.md content
 */
function loadSkillContent(skillName) {
  const skillPath = path.join(SKILLS_DIR, skillName, "SKILL.md");
  try {
    return fs.readFileSync(skillPath, "utf8");
  } catch {
    return null;
  }
}

/**
 * Load all reference docs for a skill
 */
function loadSkillReferences(skillName) {
  const refsDir = path.join(SKILLS_DIR, skillName, "references");
  const refs = {};
  try {
    const files = fs.readdirSync(refsDir);
    for (const file of files) {
      if (file.endsWith(".md")) {
        refs[file] = fs.readFileSync(path.join(refsDir, file), "utf8");
      }
    }
  } catch {
    // No references dir
  }
  return refs;
}

/**
 * Build the prompt for AI analysis
 */
function buildAnalysisPrompt(changes, indices) {
  const changesSummary = changes
    .map((c) => `- ${c.type}: ${c.description} (risk: ${c.riskLevel})`)
    .join("\n");

  return `You are analyzing upstream changes to WordPress/Gutenberg to determine if skills need updates.

## Detected Changes
${changesSummary}

## Current Upstream State
- WordPress latest: ${indices.wordpress?.latest ?? "unknown"}
- Gutenberg latest: ${indices.gutenberg?.latest?.tag ?? "unknown"}
- Gutenberg release URL: ${indices.gutenberg?.latest?.url ?? "unknown"}

## Task
Analyze these changes and determine:
1. Which skills are likely affected and why
2. What specific updates might be needed (procedures, references, examples)
3. Risk assessment for each potential update

Respond in JSON format:
{
  "analysis": "Brief overall analysis",
  "skillUpdates": [
    {
      "skill": "skill-name",
      "reason": "Why this skill is affected",
      "suggestedChanges": ["List of specific changes to make"],
      "riskLevel": "low|medium|high",
      "priority": 1-5
    }
  ],
  "skipUpdate": true/false,
  "skipReason": "If skipping, explain why no updates are needed"
}`;
}

/**
 * Build prompt for generating skill updates
 */
function buildUpdatePrompt(skillName, skillContent, references, changes, indices) {
  const relevantChanges = changes.filter(
    (c) => c.affectedSkills?.includes(skillName)
  );

  const refsSummary = Object.entries(references)
    .map(([name, content]) => `### ${name}\n${content.slice(0, 2000)}...`)
    .join("\n\n");

  return `You are updating a WordPress development skill based on upstream changes.

## Skill: ${skillName}

## Current SKILL.md
${skillContent}

## Current References (truncated)
${refsSummary || "(no references)"}

## Relevant Changes
${relevantChanges.map((c) => `- ${c.description}`).join("\n")}

## Upstream Context
- WordPress latest: ${indices.wordpress?.latest ?? "unknown"}
- Gutenberg latest: ${indices.gutenberg?.latest?.tag ?? "unknown"}

## Instructions
1. Review the current skill content
2. Identify what needs to change based on the upstream updates
3. Generate updated content that:
   - Preserves the existing structure and tone
   - Updates version references if needed
   - Adds notes about new features/changes if relevant
   - Does NOT remove existing content unless it's deprecated

Respond in JSON format:
{
  "skillUpdated": true/false,
  "changes": [
    {
      "file": "SKILL.md or references/filename.md",
      "description": "What changed",
      "newContent": "Full new file content (only if changed)"
    }
  ],
  "summary": "Brief summary of changes for PR description",
  "noChangeReason": "If no changes needed, explain why"
}`;
}

/**
 * Call Claude API
 */
async function callClaude(client, prompt, systemPrompt = null) {
  const messages = [{ role: "user", content: prompt }];

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8192,
    system: systemPrompt ?? "You are a technical writer maintaining WordPress development skills documentation. Always respond with valid JSON.",
    messages,
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) ||
                    text.match(/```\s*([\s\S]*?)\s*```/) ||
                    [null, text];

  try {
    return JSON.parse(jsonMatch[1] || text);
  } catch (e) {
    console.error("Failed to parse Claude response as JSON:", text.slice(0, 500));
    throw new Error(`Invalid JSON response from Claude: ${e.message}`);
  }
}

/**
 * Main execution
 */
async function main() {
  const dryRun = process.env.AI_DRY_RUN === "true";

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ERROR: ANTHROPIC_API_KEY environment variable is required");
    process.exit(1);
  }

  const client = new Anthropic();

  console.log("=== AI Skill Update Generator ===\n");

  // 1. Load current state
  console.log("Loading upstream indices...");
  const indices = loadUpstreamIndices();
  const currentState = getUpstreamStateHash(indices);
  const lastState = loadLastSyncState();

  console.log(`Current state hash: ${currentState.hash}`);
  console.log(`Last sync hash: ${lastState.hash ?? "(none)"}\n`);

  // 2. Detect changes
  console.log("Detecting changes...");
  const changes = detectChanges(lastState, currentState);

  if (changes.length === 0) {
    console.log("No changes detected. Exiting.");
    process.exit(0);
  }

  console.log(`Found ${changes.length} change(s):`);
  for (const c of changes) {
    console.log(`  - ${c.type}: ${c.description}`);
  }
  console.log();

  // 3. AI analysis of impact
  console.log("Analyzing impact with AI...");
  const analysisPrompt = buildAnalysisPrompt(changes, indices);
  const analysis = await callClaude(client, analysisPrompt);

  console.log(`Analysis: ${analysis.analysis}\n`);

  if (analysis.skipUpdate) {
    console.log(`Skipping updates: ${analysis.skipReason}`);
    saveSyncState(currentState.hash, currentState.state, changes);
    process.exit(0);
  }

  // 4. Generate updates for affected skills
  const updates = [];
  const skillsToUpdate = analysis.skillUpdates
    .filter((s) => s.priority >= 3 || s.riskLevel !== "low")
    .sort((a, b) => b.priority - a.priority);

  console.log(`Skills to update: ${skillsToUpdate.map((s) => s.skill).join(", ")}\n`);

  for (const skillUpdate of skillsToUpdate) {
    const { skill } = skillUpdate;
    console.log(`Processing ${skill}...`);

    const skillContent = loadSkillContent(skill);
    if (!skillContent) {
      console.log(`  Skill ${skill} not found, skipping.`);
      continue;
    }

    const references = loadSkillReferences(skill);
    const updatePrompt = buildUpdatePrompt(
      skill,
      skillContent,
      references,
      changes,
      indices
    );

    const updateResult = await callClaude(client, updatePrompt);

    if (updateResult.skillUpdated && updateResult.changes?.length > 0) {
      updates.push({
        skill,
        ...updateResult,
      });
      console.log(`  ${updateResult.changes.length} file(s) to update`);
    } else {
      console.log(`  No changes needed: ${updateResult.noChangeReason}`);
    }
  }

  // 5. Write updates
  if (updates.length === 0) {
    console.log("\nNo skill updates generated.");
    saveSyncState(currentState.hash, currentState.state, changes);
    process.exit(0);
  }

  console.log(`\n=== Writing ${updates.length} skill update(s) ===\n`);

  for (const update of updates) {
    for (const change of update.changes) {
      const filePath = path.join(SKILLS_DIR, update.skill, change.file);
      console.log(`Writing: ${filePath}`);
      console.log(`  ${change.description}`);

      if (!dryRun && change.newContent) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, change.newContent, "utf8");
      }
    }
  }

  // 6. Save state
  saveSyncState(currentState.hash, currentState.state, changes);

  // 7. Output summary for GitHub Actions
  const summary = updates
    .map((u) => `- **${u.skill}**: ${u.summary}`)
    .join("\n");

  console.log("\n=== Summary ===");
  console.log(summary);

  // Write summary to file for GitHub Actions to pick up
  const summaryFile = path.join(REPO_ROOT, ".github", "state", "update-summary.md");
  writeJson(summaryFile.replace(".md", ".json"), {
    timestamp: new Date().toISOString(),
    changes,
    analysis: analysis.analysis,
    updates: updates.map((u) => ({
      skill: u.skill,
      summary: u.summary,
      files: u.changes.map((c) => c.file),
    })),
  });

  if (dryRun) {
    console.log("\n(Dry run - no files were written)");
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
