import { Icon } from '@lobehub/ui';
import { cssVar } from 'antd-style';
import { memo } from 'react';

import { RingLoadingIcon, STATUS_META, type StatusKind } from '@/components/StatusIcon';

type TopicRunStatus = 'canceled' | 'completed' | 'failed' | 'pending' | 'running' | 'timeout';

// A subtask topic's run status → canonical status kind. `pending` (not yet
// started) reads as `backlog`; `running` is handled separately by the live
// spinner below.
const RUN_STATUS_KIND: Record<Exclude<TopicRunStatus, 'running'>, StatusKind> = {
  canceled: 'canceled',
  completed: 'completed',
  failed: 'failed',
  pending: 'backlog',
  timeout: 'timeout',
};

interface TopicStatusIconProps {
  size?: number;
  status?: string | null;
}

const TopicStatusIcon = memo<TopicStatusIconProps>(({ size = 16, status }) => {
  // Live variant of the canonical `running` CircleDot: the animated ring.
  if (status === 'running') {
    const ringColor = `color-mix(in srgb, ${cssVar.colorWarning} 35%, transparent)`;
    return (
      <RingLoadingIcon ringColor={ringColor} size={size} style={{ color: cssVar.colorWarning }} />
    );
  }
  const kind = RUN_STATUS_KIND[(status ?? 'pending') as keyof typeof RUN_STATUS_KIND] ?? 'backlog';
  const meta = STATUS_META[kind];
  return <Icon color={meta.color} icon={meta.icon} size={size} />;
});

export default TopicStatusIcon;
