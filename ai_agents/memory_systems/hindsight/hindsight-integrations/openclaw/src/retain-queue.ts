/**
 * JSONL-backed retain queue for buffering failed HTTP retains.
 *
 * When the external Hindsight API is unreachable, retain requests are stored
 * as JSON lines in a local file and flushed once connectivity is restored.
 * Only used in external API mode — local daemon mode handles its own persistence.
 *
 * Zero dependencies — uses only Node built-ins.
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync, renameSync, unlinkSync } from 'fs';
import { randomBytes } from 'crypto';
import type { RetainRequest } from './types.js';

export interface QueuedRetain {
  id: string;
  bankId: string;
  content: string;
  documentId: string;
  metadata: Record<string, unknown>;
  createdAt: string; // ISO 8601
}

export interface RetainQueueOptions {
  /** Path to the JSONL queue file */
  filePath: string;
  /** Max age in ms for queued items. -1 = keep forever (default) */
  maxAgeMs?: number;
}

export class RetainQueue {
  private filePath: string;
  private maxAgeMs: number;
  private cachedSize: number;

  constructor(opts: RetainQueueOptions) {
    this.filePath = opts.filePath;
    this.maxAgeMs = opts.maxAgeMs ?? -1;
    // Initialize cached size from file
    this.cachedSize = this.readAll().length;
  }

  /** Store a failed retain for later delivery — exact same payload as the HTTP request */
  enqueue(bankId: string, request: RetainRequest, metadata?: Record<string, unknown>): void {
    const item: QueuedRetain = {
      id: `${Date.now()}-${randomBytes(4).toString('hex')}`,
      bankId,
      content: request.content,
      documentId: request.document_id || 'conversation',
      metadata: metadata || request.metadata || {},
      createdAt: new Date().toISOString(),
    };
    appendFileSync(this.filePath, JSON.stringify(item) + '\n', 'utf8');
    this.cachedSize++;
  }

  /** Read all pending items from file */
  private readAll(): QueuedRetain[] {
    if (!existsSync(this.filePath)) return [];
    const content = readFileSync(this.filePath, 'utf8').trim();
    if (!content) return [];
    const items: QueuedRetain[] = [];
    for (const line of content.split('\n')) {
      try {
        items.push(JSON.parse(line) as QueuedRetain);
      } catch {
        // skip malformed lines
      }
    }
    return items;
  }

  /** Atomically rewrite the file with the given items */
  private writeAll(items: QueuedRetain[]): void {
    if (items.length === 0) {
      try { unlinkSync(this.filePath); } catch { /* already gone */ }
      this.cachedSize = 0;
      return;
    }
    const tmpPath = this.filePath + '.tmp';
    writeFileSync(tmpPath, items.map(i => JSON.stringify(i)).join('\n') + '\n', 'utf8');
    renameSync(tmpPath, this.filePath);
    this.cachedSize = items.length;
  }

  /** Get oldest pending items (FIFO) */
  peek(limit = 50): QueuedRetain[] {
    return this.readAll().slice(0, limit);
  }

  /** Remove a single item by id */
  remove(id: string): void {
    const items = this.readAll().filter(i => i.id !== id);
    this.writeAll(items);
  }

  /** Remove multiple items by id in a single file rewrite */
  removeMany(ids: string[]): void {
    const idSet = new Set(ids);
    const items = this.readAll().filter(i => !idSet.has(i.id));
    this.writeAll(items);
  }

  /** Number of items waiting (cached, O(1)) */
  size(): number {
    return this.cachedSize;
  }

  /** Remove items older than maxAgeMs (no-op when maxAgeMs is -1) */
  cleanup(): number {
    if (this.maxAgeMs < 0) return 0;
    const cutoff = Date.now() - this.maxAgeMs;
    const items = this.readAll();
    const kept = items.filter(i => new Date(i.createdAt).getTime() >= cutoff);
    const removed = items.length - kept.length;
    if (removed > 0) this.writeAll(kept);
    return removed;
  }

  /** No-op for JSONL (no connection to close), kept for API compatibility */
  close(): void {}
}
