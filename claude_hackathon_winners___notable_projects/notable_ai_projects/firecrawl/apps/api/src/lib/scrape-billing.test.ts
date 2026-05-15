import { calculateCreditsToBeBilled } from "./scrape-billing";

describe("calculateCreditsToBeBilled", () => {
  it("bills X/Twitter scrapes at 30 credits", async () => {
    const credits = await calculateCreditsToBeBilled(
      {
        formats: [{ type: "markdown" }],
      } as any,
      {
        teamId: "team-id",
      },
      {
        metadata: {
          statusCode: 200,
          proxyUsed: "basic",
          postprocessorsUsed: ["x-twitter"],
        },
      } as any,
      {
        totalCost: 0,
      } as any,
      {} as any,
    );

    expect(credits).toBe(30);
  });
});
