export interface ChatMessage {
  role: "system" | "user";
  content: string;
}

// System prompt for inner askLlm calls (the cheap model the extractor calls
// at runtime).
export const ASK_LLM_SYSTEM = [
  "You are a text-processing function in a data pipeline.",
  "Return only the requested value: no preamble, no markdown.",
  "You may summarize, classify, translate, or reformat the supplied text,",
  "but stay grounded in it: never invent facts or do outside lookups",
  'If the text lacks what you need, return null (or "" / [] per the schema).',
].join(" ");

// Phase 1: pick short verbatim snippets from the markdown that sit next to the
// data the extractor will need. Each snippet is later located in the raw HTML so
// we can hand the codegen model a tight window instead of the whole page.
const ANCHOR_PICKER_SYSTEM = `You are a planning step in a web-extraction pipeline. Given a page's markdown, a target JSON Schema, and a task, pick short text snippets from the markdown that sit next to the data the extractor will need to read.

Rules:
- Each snippet must appear VERBATIM in the markdown.
- Prefer short (5-80 char) distinctive phrases: a label ("Balance:"), a value next to a label, a heading, a unique table cell.
- Pick one snippet near each field the schema asks for. For a list/array schema, pick 2-4 snippets that hit DIFFERENT items.
- Avoid generic phrases ("Home", "Menu", "Read more") and very long quotes.
- Skip fields whose data clearly is not on the page.

Return only JSON of the form {"snippets": ["...", "..."]} - no markdown fences, no commentary.`;

// Phase 2: write the reusable extractor. Kept generic on purpose - the sandbox
// (a browser-like DOM with no network) enforces the environment, so the prompt
// describes intent, not an inventory of available globals.
const EXTRACTOR_SYSTEM = `You write ONE reusable JavaScript function that extracts structured data from a web page.

    async function extract(doc, askLlm) { ... }

- \`doc\` is a standard DOM Document: querySelector / querySelectorAll, document.evaluate (XPath), textContent, getAttribute, etc.
- \`askLlm(prompt)\` returns a string; \`askLlm(prompt, jsonSchema)\` returns a value of that shape. It can fail and return null, so guard its result.

This function is generated once from ONE sample page, cached, then re-run on OTHER pages of the same shape. Therefore:

- Read every value from the DOM at runtime. NEVER return a literal you saw in the sample page - the values differ on other pages. Literals are only allowed in selectors, attribute names, regexes, and the returned object's keys.
- Always return the schema's shape, even on 404 / login / empty pages: use null or [] for anything absent. NEVER throw. A fabricated value is worse than an empty one.
- When a value is present, coerce it to the schema's type (e.g. strip non-numerics for numbers). Keep dates as the page displays them unless the task asks for a specific format.

Selectors:
- Anchor on stable, meaningful things: labels, semantic attributes (itemprop, role, data-*), heading text. Avoid fragile position (:nth-child, sibling chains).
- Prefer descendant combinators over child combinators (\`>\`); an unseen wrapper element breaks \`>\`. A selector that matches 0 elements is usually too strict, not proof the data is absent.
- Read URLs from href/src, not from link text.
- Only standard CSS selectors work. To match by visible text, select structurally then filter in JS, e.g. \`[...doc.querySelectorAll('tr')].find(r => r.textContent.includes('Total'))\`.

askLlm:
- If the data is already structured (a JSON body, a <script type="application/ld+json">, an inline state blob), JSON.parse it and read the field directly. Never ask askLlm to parse JSON you could parse deterministically.
- Use it for what selectors and parsing cannot do - summarize, classify, translate, disambiguate by meaning. It transforms the text you pass it (no outside lookups like currency conversion; returns null when the text lacks the answer), so pass the DOM text it needs - for a summary, the article body, not a bare title or label. If a field has a fixed value set, include it in the prompt.
- When you call askLlm once per item over a list, issue the calls concurrently with Promise.all rather than awaiting one at a time.

Return only the function source, beginning with \`async function extract\`.`;

export function buildAnchorPickerMessages(args: {
  userPrompt: string;
  schemaJson: string;
  markdownPreview: string;
}): ChatMessage[] {
  return [
    { role: "system", content: ANCHOR_PICKER_SYSTEM },
    {
      role: "user",
      content: `### Page markdown\n\n${args.markdownPreview}\n\n### Target JSON Schema\n\n${args.schemaJson}\n\n### Task\n\n${args.userPrompt}\n\n### Output\n\nReturn {"snippets": [...]} with short verbatim fragments from the markdown above.`,
    },
  ];
}

export function buildExtractorMessages(args: {
  userPrompt: string;
  schemaJson: string;
  markdownPreview: string;
  anchorHtml: string;
  rejectionFeedback?: string;
}): ChatMessage[] {
  // Bulky reference first, the task last - long-context models answer better
  // when the question follows the documents it refers to.
  const markdown = args.markdownPreview.trim()
    ? `### Page markdown (one sample page - the values shown are NOT your output)\n\n${args.markdownPreview}\n\n`
    : "";

  const retry = args.rejectionFeedback?.trim()
    ? `\n\n### Your previous attempt was rejected\n\n${args.rejectionFeedback}\n\nRewrite the function to fix this. Every value must still come from a runtime DOM read or askLlm, and the result must match the schema exactly.`
    : "";

  return [
    { role: "system", content: EXTRACTOR_SYSTEM },
    {
      role: "user",
      content: `${markdown}### HTML snippets around the target fields\n\n${args.anchorHtml}\n\n### Target JSON Schema\n\n${args.schemaJson}\n\n### Task\n\n${args.userPrompt}${retry}`,
    },
  ];
}
