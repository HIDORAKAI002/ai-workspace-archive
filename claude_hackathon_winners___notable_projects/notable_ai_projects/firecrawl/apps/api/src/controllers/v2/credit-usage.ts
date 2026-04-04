import { Response } from "express";
import { ErrorResponse, RequestWithAuth } from "./types";
import { getTeamBalance } from "../../services/autumn/usage";

interface CreditUsageResponse {
  success: true;
  data: {
    remainingCredits: number;
    planCredits: number;
    billingPeriodStart: string | null;
    billingPeriodEnd: string | null;
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
      remainingCredits: balance.remaining,
      planCredits: balance.planCredits,
      billingPeriodStart: balance.periodStart,
      billingPeriodEnd: balance.periodEnd,
    },
  });
}
