import type { ScoredSpan } from "./highlight-model";

// Turn the model's scored spans into the final set of line indices to emit,
// within a character budget. Two policies, applied in order:
//
//  1. Neighbor policy: each selected line may pull in its ±1 adjacent lines for
//     context, but neighbors collectively get at most NEIGHBOR_BUDGET_FRACTION
//     of the budget — so context never crowds out actual answer lines.
//  2. Group budget: merge adjacent selected lines into contiguous blocks, rank
//     blocks by their best span score, and emit the best blocks (in page order)
//     until the budget is reached. Budgeting by block rather than raw line keeps
//     a coherent passage together instead of letting many tiny unrelated lines
//     each eat into the budget.

// Total character budget for the assembled snippet (approximate — measured on
// raw line text, not the markdown assembleAnswer adds back).
const MAX_HIGHLIGHT_CHARS = 800;
// Neighbor (context) lines may use at most this fraction of the budget.
const NEIGHBOR_BUDGET_FRACTION = 0.35;

interface Block {
  indices: number[];
  chars: number;
  score: number; // best core-span score in the block
}

/**
 * Choose which line indices to emit. `lineLengths[i]` is the character length of
 * line i (sentences[i].text.length); `scored` are the model's selected spans.
 * Returns indices in ascending (page) order, ready for assembleAnswer.
 */
export function selectHighlightIndices(
  lineLengths: number[],
  scored: ScoredSpan[],
  opts: { maxChars?: number; neighborBudgetFraction?: number } = {},
): number[] {
  const maxChars = opts.maxChars ?? MAX_HIGHLIGHT_CHARS;
  const neighborFraction =
    opts.neighborBudgetFraction ?? NEIGHBOR_BUDGET_FRACTION;
  const n = lineLengths.length;

  // Core selected lines (valid, in range). Keep the best score per index.
  const coreScore = new Map<number, number>();
  for (const s of scored) {
    if (!Number.isInteger(s.index) || s.index < 0 || s.index >= n) continue;
    const prev = coreScore.get(s.index);
    if (prev === undefined || s.score > prev) coreScore.set(s.index, s.score);
  }
  if (coreScore.size === 0) return [];

  // Process core lines best-score first so higher-value lines claim neighbor
  // budget before lower-value ones.
  const coreByScore = [...coreScore.entries()].sort((a, b) => b[1] - a[1]);

  // Neighbor expansion (±1 line), capped at a fraction of the total budget.
  const neighborBudget = Math.floor(maxChars * neighborFraction);
  const selected = new Set<number>(coreScore.keys());
  let neighborChars = 0;
  for (const [idx] of coreByScore) {
    for (const nb of [idx - 1, idx + 1]) {
      if (nb < 0 || nb >= n) continue;
      if (selected.has(nb)) continue;
      if (neighborChars + lineLengths[nb] > neighborBudget) continue;
      selected.add(nb);
      neighborChars += lineLengths[nb];
    }
  }

  // Merge adjacent selected indices into contiguous blocks.
  const sorted = [...selected].sort((a, b) => a - b);
  const blocks: Block[] = [];
  for (const idx of sorted) {
    const last = blocks[blocks.length - 1];
    const score = coreScore.get(idx) ?? -Infinity;
    if (last && idx === last.indices[last.indices.length - 1] + 1) {
      last.indices.push(idx);
      last.chars += lineLengths[idx];
      last.score = Math.max(last.score, score);
    } else {
      blocks.push({ indices: [idx], chars: lineLengths[idx], score });
    }
  }

  // Rank blocks by best score and emit until the budget is reached. Always keep
  // the top block so we return something even if it alone exceeds the budget.
  blocks.sort((a, b) => b.score - a.score);
  const chosen: Block[] = [];
  let total = 0;
  for (const b of blocks) {
    if (chosen.length > 0 && total + b.chars > maxChars) continue;
    chosen.push(b);
    total += b.chars;
  }

  return chosen.flatMap(b => b.indices).sort((a, b) => a - b);
}
