import { AccordionItem, Center, Flexbox, Icon, Text } from '@lobehub/ui';
import { cssVar } from 'antd-style';
import { CheckCircle2, Star } from 'lucide-react';
import { memo } from 'react';

import { STATUS_META, type StatusMeta } from '@/components/StatusIcon';

import TopicItem from '../../List/Item';
import { type GroupItemComponentProps } from '../GroupedAccordion';

// Topic status-group id → icon + color, drawn from the shared canonical status
// map so headers stay in lockstep with task glyphs and per-topic rows. The
// `pending` bucket (awaiting input / failed / unread completion) is the
// `needsAttention` kind (blue hand). Two entries stay local: `favorite` is a
// marker, not a status; `completed` still renders its legacy grey check until
// the deferred completed/failed convergence lands.
const LOCAL: Record<string, StatusMeta> = {
  completed: { color: cssVar.colorTextDescription, icon: CheckCircle2 },
  favorite: { color: cssVar.colorTextTertiary, icon: Star },
};

const STATUS_ICON: Record<string, StatusMeta> = {
  active: STATUS_META.active,
  archived: STATUS_META.archived,
  paused: STATUS_META.paused,
  pending: STATUS_META.needsAttention,
  running: STATUS_META.running,
  ...LOCAL,
};

const GroupItem = memo<GroupItemComponentProps>(({ group, activeTopicId, activeThreadId }) => {
  const { id, title, children } = group;
  const statusIcon = STATUS_ICON[id];

  return (
    <AccordionItem
      itemKey={id}
      paddingBlock={4}
      paddingInline={'8px 4px'}
      title={
        <Flexbox horizontal align="center" gap={6} height={24} style={{ overflow: 'hidden' }}>
          {statusIcon && (
            <Center flex={'none'} height={16} width={16}>
              <Icon color={statusIcon.color} icon={statusIcon.icon} size={{ size: 13 }} />
            </Center>
          )}
          <Text ellipsis fontSize={12} style={{ flex: 1 }} type={'secondary'} weight={500}>
            {title}
          </Text>
        </Flexbox>
      }
    >
      <Flexbox gap={1} paddingBlock={1}>
        {children.map((topic) => (
          <TopicItem
            showWorkingDirectory
            active={activeTopicId === topic.id}
            fav={topic.favorite}
            id={topic.id}
            key={topic.id}
            metadata={topic.metadata}
            status={topic.status}
            threadId={activeThreadId}
            title={topic.title}
          />
        ))}
      </Flexbox>
    </AccordionItem>
  );
});

export default GroupItem;
