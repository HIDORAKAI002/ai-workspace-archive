jest.mock("../supabase", () => ({
  supabase_service: {},
}));

import {
  buildHtml,
  buildMonitoringCheckDashboardUrl,
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
});
