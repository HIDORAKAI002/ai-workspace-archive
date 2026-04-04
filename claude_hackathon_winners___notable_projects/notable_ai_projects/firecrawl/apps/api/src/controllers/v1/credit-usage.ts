import { Response } from "express";
import { ErrorResponse, RequestWithAuth } from "./types";
import { getTeamBalance } from "../../services/autumn/usage";

interface CreditUsageResponse {
  success: true;
  data: {
    remaining_credits: number;
    plan_credits: number;
    billing_period_start: string | null;
    billing_period_end: string | null;
  };
}

export async function creditUsageController(
  req: RequestWithAuth,
  res: Response<CreditUsageResponse | ErrorResponse>,
): Promise<void> {
  const balance = await getTeamBalance(req.auth.team_id);

  if (!balance) {
    res.status(404).json({
      success: false,
      error: "Could not find credit usage information",
    });
    return;
  }

  res.json({
    success: true,
    data: {
      remaining_credits: balance.remaining,
      plan_credits: balance.planCredits,
      billing_period_start: balance.periodStart,
      billing_period_end: balance.periodEnd,
    },
  });
}
