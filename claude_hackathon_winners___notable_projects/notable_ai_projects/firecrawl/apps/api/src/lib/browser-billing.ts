export const BROWSER_CREDITS_PER_HOUR = 120;
export const INTERACT_CREDITS_PER_HOUR = 420;

export function calculateBrowserSessionCredits(
  durationMs: number,
  creditsPerHour = BROWSER_CREDITS_PER_HOUR,
): number {
  const hours = durationMs / 3_600_000;
  const minCredits = Math.ceil(creditsPerHour / 60);
  return Math.max(minCredits, Math.ceil(hours * creditsPerHour));
}
