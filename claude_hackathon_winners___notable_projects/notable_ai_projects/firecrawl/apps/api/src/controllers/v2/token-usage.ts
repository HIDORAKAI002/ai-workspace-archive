import { Response } from "express";
import { ErrorResponse, RequestWithAuth } from "./types";
import { getTeamBalance } from "../../services/autumn/usage";

const TOKENS_PER_CREDIT = 15;

interface TokenUsageResponse {
  success: true;
  data: {
    remainingTokens: number;
    planTokens: number;
    billingPeriodStart: string | null;
    billingPeriodEnd: string | null;
  };
}

export async function tokenUsageController(
  req: RequestWithAuth,
  res: Response<TokenUsageResponse | ErrorResponse>,
): Promise<void> {
  const balance = await getTeamBalance(req.auth.team_id);

  if (!balance) {
    res.status(404).json({
      success: false,
      error: "Could not find token usage information",
    });
    return;
  }

  res.json({
    success: true,
    data: {
      remainingTokens: balance.remaining * TOKENS_PER_CREDIT,
      planTokens: balance.planCredits * TOKENS_PER_CREDIT,
      billingPeriodStart: balance.periodStart,
      billingPeriodEnd: balance.periodEnd,
    },
  });
}
