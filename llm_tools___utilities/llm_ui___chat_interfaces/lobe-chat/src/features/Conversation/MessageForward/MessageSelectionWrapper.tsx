'use client';

import { Flexbox } from '@lobehub/ui';
import { createStaticStyles, cssVar, cx } from 'antd-style';
import { memo, type ReactNode, useCallback } from 'react';

import { messageStateSelectors, useConversationStore } from '../store';
import { isSelectableRole } from './selectableRoles';
import SelectCircle from './SelectCircle';

const styles = createStaticStyles(({ css }) => ({
  // Nudge the circle down so it lines up with the message's first line instead
  // of floating at the very top of the row.
  checkbox: css`
    flex: none;
    padding-block-start: 6px;
  `,
  content: css`
    /* Content is non-interactive while selecting — the whole row is the toggle. */
    pointer-events: none;
    flex: 1;
    min-width: 0;

    /* The hover action bar is suppressed in selection mode, so collapse its 28px
       placeholder too — otherwise every selected row carries a big empty
       highlighted strip beneath the bubble. */
    [data-user-action-bar-portal],
    [data-assitant-action-bar-portal],
    [data-assistant-group-action-bar-portal] {
      display: none;
    }
  `,
  // Assistant turns (esp. tool-call workflows) are long; fold them to a preview
  // height while selecting so the list stays scannable. Fades out at the bottom.
  contentCollapsed: css`
    overflow: hidden;
    max-height: 84px;

    mask-image: linear-gradient(to bottom, #000 56%, transparent 100%);
  `,
  disabled: css`
    cursor: not-allowed;
    opacity: 0.4;
  `,
  // Full-width single-row band, WeChat-style. Kept light: selection uses the
  // weakest fill (the filled circle is the real indicator); hover is one notch
  // up purely for transient feedback.
  row: css`
    cursor: pointer;
    inline-size: 100%;
    padding-inline: 12px;
    transition: background-color 0.1s ${cssVar.motionEaseInOut};

    &:hover {
      background-color: ${cssVar.colorFillTertiary};
    }
  `,
  rowSelected: css`
    background-color: ${cssVar.colorFillQuaternary};

    &:hover {
      background-color: ${cssVar.colorFillQuaternary};
    }
  `,
}));

interface MessageSelectionWrapperProps {
  children: ReactNode;
  id: string;
  role?: string;
}

/**
 * In multi-select mode, wraps a message with a leading round checkbox and turns
 * the whole full-width row into a single toggle target. Outside selection mode
 * it renders the message untouched.
 */
const MessageSelectionWrapper = memo<MessageSelectionWrapperProps>(({ children, id, role }) => {
  const isSelectionMode = useConversationStore(messageStateSelectors.isSelectionMode);
  const isSelected = useConversationStore(messageStateSelectors.isMessageSelected(id));
  const toggleMessageSelected = useConversationStore((s) => s.toggleMessageSelected);

  const selectable = isSelectableRole(role);
  const isAssistant = role === 'assistant' || role === 'assistantGroup';

  const handleToggle = useCallback(() => {
    if (!selectable) return;
    toggleMessageSelected(id);
  }, [selectable, toggleMessageSelected, id]);

  if (!isSelectionMode) return <>{children}</>;

  if (!selectable) {
    return <div className={styles.disabled}>{children}</div>;
  }

  return (
    <Flexbox
      horizontal
      align={'flex-start'}
      className={cx(styles.row, isSelected && styles.rowSelected)}
      gap={8}
      onClick={handleToggle}
    >
      <div className={styles.checkbox}>
        <SelectCircle checked={isSelected} />
      </div>
      <div className={cx(styles.content, isAssistant && styles.contentCollapsed)}>{children}</div>
    </Flexbox>
  );
});

MessageSelectionWrapper.displayName = 'MessageSelectionWrapper';

export default MessageSelectionWrapper;
