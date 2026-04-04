import type { HttpClient } from "../utils/httpClient";
import type { Document, PaginationConfig } from "../types";

/**
 * Shared helper to follow `next` cursors and aggregate documents with limits.
 */
export async function fetchAllPages(
  http: HttpClient,
  nextUrl: string,
  initial: Document[],
  pagination?: PaginationConfig
): Promise<Document[]> {
  const docs = initial.slice();
  let current: string | null = nextUrl;
  let pageCount = 0;
  const maxPages = pagination?.maxPages ?? undefined;
  const maxResults = pagination?.maxResults ?? undefined;
  const maxWaitTime = pagination?.maxWaitTime ?? undefined;
  const started = Date.now();

  while (current) {
    if (maxPages != null && pageCount >= maxPages) break;
    if (maxWaitTime != null && (Date.now() - started) / 1000 > maxWaitTime) break;

    let payload: { success: boolean; next?: string | null; data?: Document[] } | null = null;
    try {
      const res = await http.get<{ success: boolean; next?: string | null; data?: Document[] }>(current);
      payload = res.data;
    } catch {
      break; // axios rejects on non-2xx; stop pagination gracefully
    }
    if (!payload?.success) break;

    for (const d of payload.data || []) {
      if (maxResults != null && docs.length >= maxResults) break;
      docs.push(d as Document);
    }
    if (maxResults != null && docs.length >= maxResults) break;
    current = (payload.next ?? null) as string | null;
    pageCount += 1;
  }
  return docs;
}


