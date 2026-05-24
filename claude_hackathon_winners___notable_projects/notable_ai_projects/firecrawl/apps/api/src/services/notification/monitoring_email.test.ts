jest.mock("../supabase", () => ({
  supabase_service: {},
}));

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn() },
  })),
}));

import {
  buildHtml,
  buildMonitoringCheckDashboardUrl,
  sendMonitoringEmailSummary,
  type MonitoringEmailPayload,
} from "./monitoring_email";

describe("monitoring email", () => {
  it("builds a dashboard link for a monitor check", () => {
    expect(
      buildMonitoringCheckDashboardUrl(
        {
          monitorId: "019e07fb-fb25-74cb-9a6c-f36c685c6e5b",
          checkId: "019e0903-bf7c-779f-a8a5-736ba82d3974",
        },
        "https://firecrawl-o2cg7p09w-side-guide.vercel.app/",
      ),
    ).toBe(
      "https://firecrawl-o2cg7p09w-side-guide.vercel.app/app/monitoring/019e07fb-fb25-74cb-9a6c-f36c685c6e5b?checkId=019e0903-bf7c-779f-a8a5-736ba82d3974",
    );
  });

  it("includes the dashboard check link in the email html", () => {
    const dashboardUrl = buildMonitoringCheckDashboardUrl(
      {
        monitorId: "monitor-1",
        checkId: "check-1",
      },
      "https://www.firecrawl.dev",
    );
    const payload: MonitoringEmailPayload = {
      monitorId: "monitor-1",
      monitorName: "Docs monitor",
      checkId: "check-1",
      dashboardUrl,
      summary: {
        changed: 1,
        new: 0,
        removed: 0,
        error: 0,
        totalPages: 1,
      },
      pages: [
        {
          url: "https://example.com/docs",
          status: "changed",
        },
      ],
      creditsUsed: 1,
    };

    expect(buildHtml(payload)).toContain(
      `<a href="${dashboardUrl}">View this check in the dashboard</a>`,
    );
  });

  describe("sendMonitoringEmailSummary — judgment gating", () => {
    function buildArgs(opts: {
      goal?: string | null;
      emailEnabled?: boolean;
      pages: Array<{
        status: string;
        meaningful?: boolean | null;
      }>;
    }) {
      return {
        monitor: {
          id: "monitor-1",
          team_id: "team-1",
          name: "Test",
          goal: opts.goal ?? null,
          judge_enabled: Boolean(opts.goal),
          notification: opts.emailEnabled
            ? { email: { enabled: true, recipients: ["a@b.com"] } }
            : null,
        } as any,
        check: {
          id: "check-1",
          changed_count: opts.pages.filter(p => p.status === "changed").length,
          new_count: opts.pages.filter(p => p.status === "new").length,
          removed_count: opts.pages.filter(p => p.status === "removed").length,
          error_count: opts.pages.filter(p => p.status === "error").length,
        } as any,
        pages: opts.pages.map((p, i) => ({
          url: `https://example.com/${i}`,
          status: p.status,
          judgment:
            p.meaningful === null || p.meaningful === undefined
              ? null
              : {
                  meaningful: p.meaningful,
                  confidence: "high" as const,
                  reason: "test",
                  fields: [],
                },
        })),
      };
    }

    it("suppresses email when goal set and all changed pages are noise", async () => {
      const result = await sendMonitoringEmailSummary(
        buildArgs({
          goal: "track price changes",
          emailEnabled: true,
          pages: [
            { status: "changed", meaningful: false },
            { status: "changed", meaningful: false },
          ],
        }),
      );
      expect(result.attempted).toBe(false);
    });

    it("fires email when goal set and at least one changed page is meaningful", async () => {
      const result = await sendMonitoringEmailSummary(
        buildArgs({
          goal: "track price changes",
          emailEnabled: true,
          pages: [
            { status: "changed", meaningful: false },
            { status: "changed", meaningful: true },
          ],
        }),
      );
      expect(result.attempted).toBe(true);
    });

    it("fires email when goal set and changed page has no judgment (judge errored)", async () => {
      const result = await sendMonitoringEmailSummary(
        buildArgs({
          goal: "track price changes",
          emailEnabled: true,
          pages: [{ status: "changed", meaningful: null }],
        }),
      );
      expect(result.attempted).toBe(true);
    });

    it("fires email when goal set but page status is new/removed (always meaningful)", async () => {
      const result = await sendMonitoringEmailSummary(
        buildArgs({
          goal: "track anything",
          emailEnabled: true,
          pages: [{ status: "changed", meaningful: false }, { status: "new" }],
        }),
      );
      expect(result.attempted).toBe(true);
    });

    it("backwards compat: no goal → fires email on any change (no gating)", async () => {
      const result = await sendMonitoringEmailSummary(
        buildArgs({
          goal: null,
          emailEnabled: true,
          pages: [{ status: "changed", meaningful: false }],
        }),
      );
      expect(result.attempted).toBe(true);
    });

    it("fails open when changed-page list is truncated (would otherwise suppress)", async () => {
      const args = buildArgs({
        goal: "track price changes",
        emailEnabled: true,
        pages: [
          { status: "changed", meaningful: false },
          { status: "changed", meaningful: false },
        ],
      });
      (args.check as any).changed_count = 50;
      const result = await sendMonitoringEmailSummary(args);
      expect(result.attempted).toBe(true);
    });
  });
});
