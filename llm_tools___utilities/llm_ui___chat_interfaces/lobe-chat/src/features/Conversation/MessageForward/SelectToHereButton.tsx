'use client';

import { Icon } from '@lobehub/ui';
import { Button } from '@lobehub/ui/base-ui';
import { createStaticStyles, cssVar } from 'antd-style';
import { ArrowDownToLine } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { messageStateSelectors, useConversationStore } from '../store';

const styles = createStaticStyles(({ css }) => ({
  wrap: css`
    pointer-events: none;

    position: absolute;
    z-index: 50;
    inset-block-start: 12px;
    inset-inline-start: 16px;

    > * {
      pointer-events: auto;
      background: ${cssVar.colorBgElevated};
      box-shadow: ${cssVar.boxShadowSecondary};
    }
  `,
}));

/**
 * Pinned-to-top "select to here" affordance shown while multi-selecting: selects
 * every message from the top of the conversation down to the anchor. Mirrors
 * WeChat's "选择到这里". Renders nothing outside selection mode.
 */
const SelectToHereButton = memo(() => {
  const { t } = useTranslation('chat');
  const isSelectionMode = useConversationStore(messageStateSelectors.isSelectionMode);
  const selectToHere = useConversationStore((s) => s.selectToHere);

  if (!isSelectionMode) return null;

  return (
    <div className={styles.wrap}>
      <Button
        icon={<Icon icon={ArrowDownToLine} />}
        shape={'round'}
        size={'small'}
        onClick={selectToHere}
      >
        {t('messageForward.bar.selectToHere')}
      </Button>
    </div>
  );
});

SelectToHereButton.displayName = 'MessageForwardSelectToHereButton';

export default SelectToHereButton;
