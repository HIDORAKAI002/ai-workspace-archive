import type { TaskStatus } from '@lobechat/types';
import { type DropdownItem, DropdownMenu, Icon, type MenuInfo, Tooltip } from '@lobehub/ui';
import { createStaticStyles, cssVar } from 'antd-style';
import type { LucideIcon } from 'lucide-react';
import { Loader2Icon } from 'lucide-react';
import type { ReactNode } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getTaskStatusMeta } from '@/components/StatusIcon';
import { usePermission } from '@/hooks/usePermission';
import { useTaskStore } from '@/store/task';

import { renderMenuExtra } from './menuExtra';

interface StatusMeta {
  color: string;
  icon: LucideIcon;
  label: string;
  labelKey: string;
}

// Labels stay local; icon + color come from the shared canonical status map so
// the tag can never drift from the sidebar / kanban glyphs.
const STATUS_LABELS: Record<TaskStatus, { label: string; labelKey: string }> = {
  backlog: { label: 'Backlog', labelKey: 'status.backlog' },
  canceled: { label: 'Canceled', labelKey: 'status.canceled' },
  completed: { label: 'Completed', labelKey: 'status.completed' },
  failed: { label: 'Failed', labelKey: 'status.failed' },
  paused: { label: 'Pending review', labelKey: 'status.paused' },
  running: { label: 'Running', labelKey: 'status.running' },
  scheduled: { label: 'Scheduled', labelKey: 'status.scheduled' },
};

export const STATUS_META: Record<TaskStatus, StatusMeta> = Object.fromEntries(
  (Object.keys(STATUS_LABELS) as TaskStatus[]).map((status) => [
    status,
    { ...getTaskStatusMeta(status), ...STATUS_LABELS[status] },
  ]),
) as Record<TaskStatus, StatusMeta>;

export const USER_SELECTABLE_STATUSES: TaskStatus[] = [
  'backlog',
  'paused',
  'completed',
  'canceled',
];

const styles = createStaticStyles(({ css, cssVar }) => ({
  trigger: css`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    transition: filter ${cssVar.motionDurationMid};

    &:hover {
      filter: brightness(0.85);
    }
  `,
  triggerDisabled: css`
    cursor: not-allowed;
    display: inline-flex;
    opacity: 0.5;

    &:hover {
      filter: none;
    }
  `,
}));

interface TaskStatusTagProps {
  children?: ReactNode;
  disableDropdown?: boolean;
  onChange?: (status: TaskStatus) => void;
  size?: number;
  status?: TaskStatus;
  taskIdentifier?: string;
}

const TaskStatusTag = memo<TaskStatusTagProps>(
  ({ children, disableDropdown, onChange, size = 16, status, taskIdentifier }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation('chat');
    const { allowed: canEditTask, reason } = usePermission('create_content');
    const updateTaskStatus = useTaskStore((s) => s.updateTaskStatus);

    const displayStatus = status ?? 'backlog';
    const meta = STATUS_META[displayStatus];

    const handleStatusChange = useCallback(
      async (nextStatus: TaskStatus) => {
        if (!canEditTask) return;
        if (nextStatus === displayStatus) return;
        if (onChange) {
          onChange(nextStatus);
          return;
        }
        if (!taskIdentifier) return;
        setLoading(true);

        try {
          await updateTaskStatus(taskIdentifier, nextStatus);
        } finally {
          setLoading(false);
        }
      },
      [canEditTask, displayStatus, onChange, taskIdentifier, updateTaskStatus],
    );

    const handleStatusChangeRef = useRef(handleStatusChange);
    handleStatusChangeRef.current = handleStatusChange;

    useEffect(() => {
      if (!open) return;
      const onKeyDown = (event: KeyboardEvent) => {
        const num = Number.parseInt(event.key, 10);
        if (Number.isNaN(num)) return;
        const idx = num - 1;
        if (idx < 0 || idx >= USER_SELECTABLE_STATUSES.length) return;
        event.preventDefault();
        event.stopPropagation();
        void handleStatusChangeRef.current(USER_SELECTABLE_STATUSES[idx]);
        setOpen(false);
      };
      document.addEventListener('keydown', onKeyDown, true);
      return () => document.removeEventListener('keydown', onKeyDown, true);
    }, [open]);

    const menuItems = useMemo<DropdownItem[]>(
      () =>
        USER_SELECTABLE_STATUSES.map((key, index) => {
          const statusMeta = STATUS_META[key];
          const isCurrent = key === displayStatus;
          return {
            extra: renderMenuExtra(String(index + 1), isCurrent),
            icon: <Icon color={statusMeta.color} icon={statusMeta.icon} size={16} />,
            key,
            label: t(`taskDetail.${statusMeta.labelKey}`, { defaultValue: statusMeta.label }),
            onClick: ({ domEvent }: MenuInfo) => {
              domEvent.stopPropagation();
              void handleStatusChange(key);
            },
          };
        }),
      [displayStatus, handleStatusChange, t],
    );

    const triggerNode =
      children ||
      (loading ? (
        <Icon spin color={cssVar.colorTextDescription} icon={Loader2Icon} size={size} />
      ) : (
        <Tooltip title={t(`taskDetail.${meta.labelKey}`, { defaultValue: meta.label })}>
          <span className={styles.trigger} onClick={(e) => e.stopPropagation()}>
            <Icon color={meta.color} icon={meta.icon} size={size} />
          </span>
        </Tooltip>
      ));

    if (disableDropdown) return <>{triggerNode}</>;

    if (!canEditTask)
      return (
        <Tooltip title={reason}>
          <span className={styles.triggerDisabled} onClick={(e) => e.stopPropagation()}>
            {triggerNode}
          </span>
        </Tooltip>
      );

    return (
      <DropdownMenu items={menuItems} open={open} onOpenChange={setOpen}>
        {triggerNode}
      </DropdownMenu>
    );
  },
);

export default TaskStatusTag;
