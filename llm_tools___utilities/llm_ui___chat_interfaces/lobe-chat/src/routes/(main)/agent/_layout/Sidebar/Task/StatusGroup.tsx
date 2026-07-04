'use client';

import { AccordionItem, Center, Flexbox, Icon, Text } from '@lobehub/ui';
import { cssVar } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { STATUS_META as STATUS_ICON, type StatusKind } from '@/components/StatusIcon';
import type { TaskGroupItem } from '@/store/task/slices/list/initialState';

import TaskItem from './TaskItem';

// Task sidebar group keys → canonical status kind + i18n title. `needsInput`
// (paused + failed tasks awaiting a human) is the `needsAttention` kind.
const GROUP_META: Record<string, { kind: StatusKind; titleKey: string }> = {
  backlog: { kind: 'backlog', titleKey: 'taskList.kanban.backlog' },
  needsInput: { kind: 'needsAttention', titleKey: 'taskList.kanban.needsInput' },
  running: { kind: 'running', titleKey: 'taskList.kanban.running' },
};

interface StatusGroupProps {
  group: TaskGroupItem;
}

const StatusGroup = memo<StatusGroupProps>(({ group }) => {
  const { t } = useTranslation('chat');
  const { taskId } = useParams<{ taskId?: string }>();
  const groupMeta = GROUP_META[group.key];
  if (!groupMeta) return null;
  const meta = STATUS_ICON[groupMeta.kind];

  return (
    <AccordionItem
      itemKey={group.key}
      paddingBlock={4}
      paddingInline={4}
      title={
        <Flexbox horizontal align="center" gap={8} height={24} style={{ overflow: 'hidden' }}>
          <Center flex={'none'} height={24} width={24}>
            <Icon color={meta.color} icon={meta.icon} size={{ size: 14, strokeWidth: 1.75 }} />
          </Center>
          <Text ellipsis fontSize={13} style={{ color: cssVar.colorTextSecondary, flex: 1 }}>
            {t(groupMeta.titleKey as 'taskList.kanban.backlog')}
          </Text>
          <Text fontSize={11} type="secondary">
            {group.tasks.length}
          </Text>
        </Flexbox>
      }
    >
      <Flexbox gap={1} paddingBlock={1}>
        {group.tasks.map((task) => (
          <TaskItem
            active={taskId === task.identifier || taskId === task.id}
            key={task.id}
            task={task}
          />
        ))}
      </Flexbox>
    </AccordionItem>
  );
});

export default StatusGroup;
