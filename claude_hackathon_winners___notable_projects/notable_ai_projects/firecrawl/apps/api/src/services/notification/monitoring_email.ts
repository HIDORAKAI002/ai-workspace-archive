import { Resend } from "resend";
import escapeHtml from "escape-html";
import { config } from "../../config";
import { logger as _logger } from "../../lib/logger";
import { supabase_service } from "../supabase";
import type { MonitorCheckRow, MonitorRow } from "../monitoring/types";

const logger = _logger.child({ module: "monitoring-email" });

type MonitoringEmailPage = {
  url: string;
  status: string;
  error?: string | null;
  judgment?: {
    meaningful: boolean;
    confidence: "high" | "medium" | "low";
    reason: string;
    fields: string[];
  } | null;
  diffText?: string | null;
};

const DIFF_MAX_LINES_PER_PAGE = 24;
const DIFF_MAX_CHARS_PER_LINE = 200;

function renderDiffBlock(diffText: string): string {
  const lines = diffText.split("\n");
  const truncated = lines.length > DIFF_MAX_LINES_PER_PAGE;
  const shown = lines.slice(0, DIFF_MAX_LINES_PER_PAGE).map(rawLine => {
    const clipped =
      rawLine.length > DIFF_MAX_CHARS_PER_LINE
        ? rawLine.slice(0, DIFF_MAX_CHARS_PER_LINE) + "…"
        : rawLine;
    const safe = escapeHtml(clipped);
    let color = "#374151";
    let bg = "transparent";
    if (clipped.startsWith("+") && !clipped.startsWith("+++")) {
      color = "#166534";
      bg = "#dcfce7";
    } else if (clipped.startsWith("-") && !clipped.startsWith("---")) {
      color = "#991b1b";
      bg = "#fee2e2";
    } else if (clipped.startsWith("@@")) {
      color = "#6b21a8";
    }
    return `<div style="color:${color};background:${bg};padding:0 6px;">${safe || "&nbsp;"}</div>`;
  });
  return `<pre style="margin:8px 0 0;padding:10px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;line-height:1.5;white-space:pre;overflow-x:auto;">${shown.join("")}${truncated ? `<div style="color:#6b7280;padding:6px 6px 0;">… ${lines.length - DIFF_MAX_LINES_PER_PAGE} more lines</div>` : ""}</pre>`;
}

export type MonitoringEmailPayload = {
  monitorId: string;
  monitorName: string;
  checkId: string;
  dashboardUrl: string;
  summary: {
    changed: number;
    new: number;
    removed: number;
    error: number;
    totalPages: number;
  };
  pages: MonitoringEmailPage[];
  creditsUsed: number | null;
};

async function getTeamEmails(teamId: string): Promise<string[]> {
  const { data, error } = await supabase_service
    .from("user_teams")
    .select(
      "users(email, id, notification_preferences(unsubscribed_all, email_preferences))",
    )
    .eq("team_id", teamId);

  if (error) {
    logger.warn("Failed to load team emails", { error, teamId });
    return [];
  }

  const emails = new Set<string>();
  for (const row of data ?? []) {
    const user = (row as any).users;
    const email = user?.email;
    if (!email) continue;

    const prefs = Array.isArray(user.notification_preferences)
      ? user.notification_preferences[0]
      : user.notification_preferences;
    if (prefs?.unsubscribed_all) continue;
    if (
      Array.isArray(prefs?.email_preferences) &&
      !prefs.email_preferences.includes("system_alerts")
    ) {
      continue;
    }

    emails.add(email);
  }

  return [...emails];
}

export function buildMonitoringCheckDashboardUrl(
  params: { monitorId: string; checkId: string },
  baseUrl: string = config.FIRECRAWL_DASHBOARD_URL,
): string {
  const url = new URL(
    `/app/monitoring/${encodeURIComponent(params.monitorId)}`,
    baseUrl.trim(),
  );
  url.searchParams.set("checkId", params.checkId);
  return url.toString();
}

export function buildHtml(payload: MonitoringEmailPayload): string {
  const sortedPages = [...payload.pages].sort((a, b) => {
    const aMeaningful = a.judgment?.meaningful === true ? 0 : 1;
    const bMeaningful = b.judgment?.meaningful === true ? 0 : 1;
    return aMeaningful - bMeaningful;
  });

  const pageItems = sortedPages
    .slice(0, 20)
    .map(page => {
      const url = escapeHtml(page.url);
      let badge = "";
      let reason = "";
      if (page.judgment) {
        if (page.judgment.meaningful) {
          badge =
            ' <span style="color:#b45309;font-weight:600">[meaningful]</span>';
        } else {
          badge = ' <span style="color:#6b7280">[noise]</span>';
        }
        reason = `<br/><small style="color:#6b7280">${escapeHtml(page.judgment.reason)}</small>`;
      }
      const diffBlock =
        page.diffText && page.diffText.trim().length > 0
          ? renderDiffBlock(page.diffText)
          : "";
      return `<li style="margin:0 0 14px;"><strong>${escapeHtml(page.status)}</strong>${badge}: <a href="${url}">${url}</a>${
        page.error ? ` &mdash; ${escapeHtml(page.error)}` : ""
      }${reason}${diffBlock}</li>`;
    })
    .join("");
  const dashboardUrl = escapeHtml(payload.dashboardUrl);

  const judgedPages = payload.pages.filter(p => p.judgment);
  const meaningfulCount = judgedPages.filter(
    p => p.judgment!.meaningful,
  ).length;
  const noiseCount = judgedPages.length - meaningfulCount;
  const changedLine =
    judgedPages.length > 0
      ? `Changed: ${payload.summary.changed} (${meaningfulCount} meaningful, ${noiseCount} noise)`
      : `Changed: ${payload.summary.changed}`;

  return `Hey there,<br/>
<p>Your Firecrawl monitor <strong>${escapeHtml(payload.monitorName)}</strong> detected activity.</p>
<ul>
  <li>${changedLine}</li>
  <li>New: ${payload.summary.new}</li>
  <li>Removed: ${payload.summary.removed}</li>
  <li>Errors: ${payload.summary.error}</li>
  <li>Total pages checked: ${payload.summary.totalPages}</li>
</ul>
${pageItems ? `<p>Top pages:</p><ul>${pageItems}</ul>` : ""}
<p><a href="${dashboardUrl}">View this check in the dashboard</a></p>
<p>Check ID: <code>${escapeHtml(payload.checkId)}</code></p>
<p>Credits used: ${payload.creditsUsed ?? "unknown"}</p>
<br/>Thanks,<br/>Firecrawl Team<br/>`;
}

export async function sendMonitoringEmailSummary(params: {
  monitor: MonitorRow;
  check: MonitorCheckRow;
  pages: MonitoringEmailPage[];
}): Promise<{
  attempted: boolean;
  success: boolean;
  recipients: string[];
  error?: string;
}> {
  const configEmail = params.monitor.notification?.email;
  if (!configEmail?.enabled) {
    logger.info(
      "Skipping monitoring email summary; email notifications disabled",
      {
        monitorId: params.monitor.id,
        checkId: params.check.id,
      },
    );
    return { attempted: false, success: true, recipients: [] };
  }

  if (
    params.check.changed_count +
      params.check.new_count +
      params.check.removed_count +
      params.check.error_count <=
    0
  ) {
    logger.info("Skipping monitoring email summary; no changes detected", {
      monitorId: params.monitor.id,
      checkId: params.check.id,
      changed: params.check.changed_count,
      new: params.check.new_count,
      removed: params.check.removed_count,
      errors: params.check.error_count,
    });
    return { attempted: false, success: true, recipients: [] };
  }

  // Caller may pass a paginated subset; only trust the judgment-based
  // suppression when changedPages covers the full changed_count. A missed
  // meaningful alert is worse than an extra noisy email.
  if (params.monitor.judge_enabled && params.monitor.goal) {
    const changedPages = params.pages.filter(p => p.status === "changed");
    const nonChangedActivity = params.pages.some(
      p => p.status === "new" || p.status === "removed" || p.status === "error",
    );
    const changedListComplete =
      changedPages.length >= params.check.changed_count;
    if (changedPages.length > 0 && !nonChangedActivity && changedListComplete) {
      const anyMeaningful = changedPages.some(
        p => p.judgment?.meaningful === true || !p.judgment,
      );
      if (!anyMeaningful) {
        logger.info(
          "Skipping monitoring email summary; all changed pages judged noise",
          {
            monitorId: params.monitor.id,
            checkId: params.check.id,
            changedCount: changedPages.length,
          },
        );
        return { attempted: false, success: true, recipients: [] };
      }
    } else if (
      changedPages.length > 0 &&
      !nonChangedActivity &&
      !changedListComplete
    ) {
      logger.info(
        "Skipping judge-based email gating; changed-page list is truncated",
        {
          monitorId: params.monitor.id,
          checkId: params.check.id,
          changedSeen: changedPages.length,
          changedTotal: params.check.changed_count,
        },
      );
    }
  }

  const explicitRecipients = configEmail.recipients ?? [];
  const teamRecipients =
    explicitRecipients.length > 0
      ? []
      : await getTeamEmails(params.monitor.team_id);
  const recipients = [...new Set([...explicitRecipients, ...teamRecipients])];
  if (recipients.length === 0) {
    logger.info("Skipping monitoring email summary; no recipients configured", {
      monitorId: params.monitor.id,
      checkId: params.check.id,
    });
    return { attempted: false, success: true, recipients };
  }

  const resendApiKey = config.RESEND_API_KEY?.trim();
  if (!resendApiKey) {
    logger.warn(
      "Skipping monitoring email summary; RESEND_API_KEY is not set",
      {
        monitorId: params.monitor.id,
        checkId: params.check.id,
        recipients,
      },
    );
    return { attempted: false, success: true, recipients };
  }

  const payload: MonitoringEmailPayload = {
    monitorId: params.monitor.id,
    monitorName: params.monitor.name,
    checkId: params.check.id,
    dashboardUrl: buildMonitoringCheckDashboardUrl({
      monitorId: params.monitor.id,
      checkId: params.check.id,
    }),
    summary: {
      changed: params.check.changed_count,
      new: params.check.new_count,
      removed: params.check.removed_count,
      error: params.check.error_count,
      totalPages: params.check.total_pages,
    },
    pages: params.pages,
    creditsUsed: params.check.actual_credits,
  };

  const resend = new Resend(resendApiKey);
  try {
    const { error } = await resend.emails.send({
      from: "Firecrawl <notifications@notifications.firecrawl.dev>",
      to: recipients,
      reply_to: "help@firecrawl.com",
      subject: `Monitor changes detected: ${params.monitor.name}`,
      html: buildHtml(payload),
    });

    if (error) {
      logger.warn("Monitoring email summary send failed", {
        monitorId: params.monitor.id,
        checkId: params.check.id,
        recipients,
        error,
      });
      return {
        attempted: true,
        success: false,
        recipients,
        error: typeof error === "string" ? error : JSON.stringify(error),
      };
    }

    logger.info("Monitoring email summary sent", {
      monitorId: params.monitor.id,
      checkId: params.check.id,
      recipients,
    });

    return { attempted: true, success: true, recipients };
  } catch (error) {
    logger.warn("Failed to send monitoring email summary", { error });
    return {
      attempted: true,
      success: false,
      recipients,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
