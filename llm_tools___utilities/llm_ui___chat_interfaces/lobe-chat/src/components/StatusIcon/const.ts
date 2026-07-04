import type { TaskStatus } from '@lobechat/types';
import { cssVar } from 'antd-style';
import {
  Archive,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleSlash,
  CircleX,
  Clock,
  Hand,
  type LucideIcon,
  PauseCircle,
} from 'lucide-react';

/**
 * Canonical status vocabulary shared by BOTH topic and task surfaces. Each
 * concrete status enum (ChatTopicStatus, TaskStatus, topic status-buckets, …)
 * maps onto one of these kinds so the whole app speaks one visual language.
 */
export type StatusKind =
  | 'running'
  | 'scheduled'
  | 'needsAttention'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'backlog'
  | 'active'
  | 'canceled'
  | 'archived'
  | 'timeout';

export interface StatusMeta {
  color: string;
  icon: LucideIcon;
}

/**
 * THE single source of truth for status → icon + color across topic & task.
 *
 * Built on the `Circle-*` family so every status reads as one coherent set.
 * `running` is the STATIC glyph used by group headers / summaries / badges; a
 * row that is *actively executing right now* renders the animated
 * {@link RingLoadingIcon} instead — the live variant of this same `CircleDot`.
 *
 * `needsAttention` is the "a human is needed" state (topic `pending` /
 * `waitingForHuman`, task `paused` / `needsInput`); `paused` is a genuinely
 * suspended item. They are different concepts and must not be merged.
 *
 * NOTE: `completed` and `failed` are the canonical target (green check / red
 * cross). Task surfaces already match; a few TOPIC surfaces still render their
 * legacy grey `CheckCircle2` / `TriangleAlert` locally and are intentionally
 * NOT yet wired here — that convergence is deferred to a follow-up.
 */
export const STATUS_META: Record<StatusKind, StatusMeta> = {
  active: { color: cssVar.colorTextTertiary, icon: CircleDot },
  archived: { color: cssVar.colorTextDescription, icon: Archive },
  backlog: { color: cssVar.colorTextQuaternary, icon: CircleDashed },
  canceled: { color: cssVar.colorTextSecondary, icon: CircleSlash },
  completed: { color: cssVar.colorSuccess, icon: CircleCheck },
  failed: { color: cssVar.colorError, icon: CircleX },
  needsAttention: { color: cssVar.colorInfo, icon: Hand },
  paused: { color: cssVar.colorTextDescription, icon: PauseCircle },
  running: { color: cssVar.colorWarning, icon: CircleDot },
  scheduled: { color: cssVar.colorWarning, icon: Clock },
  timeout: { color: cssVar.colorWarning, icon: CircleAlert },
};

const TASK_STATUS_KIND: Record<TaskStatus, StatusKind> = {
  backlog: 'backlog',
  canceled: 'canceled',
  completed: 'completed',
  failed: 'failed',
  paused: 'needsAttention',
  running: 'running',
  scheduled: 'scheduled',
};

/** Map a `TaskStatus` onto the canonical status kind. */
export const getTaskStatusKind = (status: TaskStatus): StatusKind =>
  TASK_STATUS_KIND[status] ?? 'backlog';

/** Convenience: canonical meta for a task status. */
export const getTaskStatusMeta = (status: TaskStatus): StatusMeta =>
  STATUS_META[getTaskStatusKind(status)];
