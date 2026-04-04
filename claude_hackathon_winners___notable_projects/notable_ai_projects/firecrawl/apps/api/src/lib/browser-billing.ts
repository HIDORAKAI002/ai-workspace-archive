export const BROWSER_CREDITS_PER_HOUR = 120;
export const INTERACT_CREDITS_PER_HOUR = 420;

export function calculateBrowserSessionCredits(
  durationMs: number,
  creditsPerHour = BROWSER_CREDITS_PER_HOUR,
): number {
  const hours = durationMs / 3_600_000;
  return Math.max(2, Math.ceil(hours * creditsPerHour));
}
