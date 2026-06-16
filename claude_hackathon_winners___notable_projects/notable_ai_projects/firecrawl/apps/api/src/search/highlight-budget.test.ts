import { selectHighlightIndices } from "./highlight-budget";

describe("selectHighlightIndices", () => {
  it("returns [] when there are no scored spans", () => {
    expect(selectHighlightIndices([10, 10], [])).toEqual([]);
  });

  it("ignores out-of-range / invalid span indices", () => {
    const out = selectHighlightIndices(
      [10, 10],
      [
        { index: 5, score: 0.9 },
        { index: -1, score: 0.8 },
      ],
    );
    expect(out).toEqual([]);
  });

  it("expands a selected line with its ±1 neighbors", () => {
    const out = selectHighlightIndices(
      [10, 10, 10, 10, 10],
      [{ index: 2, score: 0.9 }],
    );
    expect(out).toEqual([1, 2, 3]);
  });

  it("does not add neighbors that exceed the neighbor budget", () => {
    // Neighbors are 100 chars each; neighbor budget = floor(100 * 0.35) = 35.
    const out = selectHighlightIndices(
      [100, 100, 10, 100, 100],
      [{ index: 2, score: 0.9 }],
      { maxChars: 100, neighborBudgetFraction: 0.35 },
    );
    expect(out).toEqual([2]);
  });

  it("gives neighbor budget to the higher-scoring line first", () => {
    // Budget allows exactly one 50-char neighbor. index 4 (0.9) should claim it
    // (its neighbor 3), leaving index 0 (0.4) without one.
    const out = selectHighlightIndices(
      [50, 50, 50, 50, 50],
      [
        { index: 0, score: 0.4 },
        { index: 4, score: 0.9 },
      ],
      { maxChars: 1000, neighborBudgetFraction: 0.05 },
    );
    expect(out).toEqual([0, 3, 4]);
  });

  it("merges adjacent selections (incl. a bridging neighbor) into one block", () => {
    const out = selectHighlightIndices(
      [10, 10, 10, 10],
      [
        { index: 0, score: 0.3 },
        { index: 2, score: 0.9 },
      ],
    );
    expect(out).toEqual([0, 1, 2, 3]);
  });

  it("emits the highest-scoring block first and drops blocks that exceed budget", () => {
    // Two non-adjacent blocks of 100 chars; budget fits only one.
    const out = selectHighlightIndices(
      [100, 100, 100, 100, 100, 100, 100],
      [
        { index: 0, score: 0.5 },
        { index: 6, score: 0.9 },
      ],
      { maxChars: 150, neighborBudgetFraction: 0 },
    );
    expect(out).toEqual([6]);
  });

  it("returns chosen blocks in page order, not score order", () => {
    const out = selectHighlightIndices(
      [100, 100, 100, 100, 100, 100, 100],
      [
        { index: 0, score: 0.5 },
        { index: 6, score: 0.9 },
      ],
      { maxChars: 500, neighborBudgetFraction: 0 },
    );
    expect(out).toEqual([0, 6]);
  });

  it("always keeps the top block even if it alone exceeds the budget", () => {
    const out = selectHighlightIndices([1000], [{ index: 0, score: 0.5 }], {
      maxChars: 800,
    });
    expect(out).toEqual([0]);
  });
});
