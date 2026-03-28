# Testing

Reference standards for test review. Only enforce rules that match the target project's conventions.

---

## Responsibility

- Tests asserting implementation (private methods, internal logic) instead of behavior, outputs, or user interactions. [Important]
- Tests asserting current implementation instead of functional requirements (AI bias). [Important]
- New whole functions (in diff) without corresponding tests. [Important]
- Tests that only verify rendering or mocks without covering actual business logic. [Important]
- Unit tests not isolating the function — mock outgoing/external calls (APIs, other modules, heavy dependencies). [Important]
- Multiple behaviors or edge cases in a single test case — one `it` or `test` per variation. [Suggestion]

## Shadow mocks

- Mocking the core logic or the system under test (SUT) itself. [Important]

## Snapshot tests

- Snapshot tests as the only validation for business behavior or complex conditional branches. [Important]
- Snapshots for logic (calculations, business conditions) instead of presentational components only. [Suggestion]

## Test structure

- Test files not in `__tests__/` directory next to the code they cover. [Suggestion]
- Test file naming not matching project convention (e.g. `component.js` → `component.test.js`). [Suggestion]
- Files containing logic without unit tests (not just DOM manipulation). [Important]

## Test file order

- Imports order: SUT first, then dependencies. [Minor]
- Mocks not at top level (`jest.mock('...')` / `vi.mock('...')`). [Suggestion]
- No setup helper for SUT (`setup()` for functions, `getInstance()` for classes, `render()` for UI). [Suggestion]
- Missing `beforeEach` / `afterEach` for setup and cleanup. [Suggestion]
- More than one outer `describe` per module or inconsistent nesting per function/method. [Minor]

## Conventions

- `it` / `test` not describing expected behavior. [Suggestion]
- Variants not using `with ...` or `if ...` in test name. [Minor]
- Negatives not tested with `.not` (mutation testing escape). [Suggestion]
- Test not following setup → execution → expectations order. [Suggestion]
- CSS/SVG imports not mocked via project file-mock. [Minor]
- HTML templates in tests inconsistent with project convention (JSX vs string). [Suggestion]

### Critical verification checkpoints

- Does the test assert expected behavior from spec/requirements, or only what the code currently does?
- What am I mocking — is it an external boundary (API, I/O) or the logic I claim to be testing?
- Is the SUT isolated with mocks only on boundaries?
- Would a snapshot here hide logic that should have explicit assertions?
