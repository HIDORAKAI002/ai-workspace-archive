import type { TaskStatus } from '@lobechat/types';
import { ActionIcon } from '@lobehub/ui';
import { memo } from 'react';

import { getTaskStatusMeta } from '@/components/StatusIcon';
import { taskListSelectors } from '@/store/task/selectors';

interface TaskStatusIconProps {
  size?: number;
  status: TaskStatus;
}

const TaskStatusIcon = memo<TaskStatusIconProps>(({ size = 16, status }) => {
  const displayStatus = taskListSelectors.getDisplayStatus(status);
  const meta = getTaskStatusMeta(status);

  return (
    <ActionIcon
      color={meta.color}
      icon={meta.icon}
      title={displayStatus}
      size={{
        blockSize: size,
        size,
        borderRadius: '50%',
      }}
    />
  );
});

export default TaskStatusIcon;
