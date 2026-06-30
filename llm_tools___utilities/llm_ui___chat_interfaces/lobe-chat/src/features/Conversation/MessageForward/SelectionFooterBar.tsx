'use client';

import { Center, Flexbox, Icon, Text } from '@lobehub/ui';
import { confirmModal } from '@lobehub/ui/base-ui';
import { App } from 'antd';
import { createStaticStyles, cssVar, cx } from 'antd-style';
import { Forward, type LucideIcon, Trash2, X } from 'lucide-react';
import { type FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { messageStateSelectors, useConversationStore } from '../store';
import ForwardModal from './ForwardModal';

const styles = createStaticStyles(({ css }) => ({
  action: css`
    cursor: pointer;
    user-select: none;

    &:hover [data-icon-box] {
      background: ${cssVar.colorFillSecondary};
    }
  `,
  actionDisabled: css`
    cursor: not-allowed;
    opacity: 0.35;

    &:hover [data-icon-box] {
      background: ${cssVar.colorFillTertiary};
    }
  `,
  bar: css`
    min-block-size: 92px;
    padding-block: 12px;
    padding-inline: 16px;
    border-block-start: 1px solid ${cssVar.colorBorderSecondary};

    background: ${cssVar.colorBgContainer};
  `,
  count: css`
    position: absolute;
    inset-block-start: 12px;
    inset-inline-start: 16px;
  `,
  iconBox: css`
    inline-size: 46px;
    block-size: 46px;
    border-radius: ${cssVar.borderRadiusLG};

    background: ${cssVar.colorFillTertiary};

    transition: background-color 0.1s ${cssVar.motionEaseInOut};
  `,
  iconBoxDanger: css`
    color: ${cssVar.colorError};
  `,
}));

interface ActionColumnProps {
  danger?: boolean;
  disabled?: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const ActionColumn: FC<ActionColumnProps> = ({ icon, label, onClick, disabled, danger }) => (
  <Flexbox
    align={'center'}
    className={cx(styles.action, disabled && styles.actionDisabled)}
    gap={6}
    onClick={disabled ? undefined : onClick}
  >
    <Center data-icon-box className={cx(styles.iconBox, danger && styles.iconBoxDanger)}>
      <Icon icon={icon} size={20} />
    </Center>
    <Text
      style={{ color: danger ? cssVar.colorError : undefined, fontSize: 12 }}
      type={'secondary'}
    >
      {label}
    </Text>
  </Flexbox>
);

/**
 * Bottom action bar that replaces the chat input while multi-selecting. Styled
 * like WeChat's forward toolbar: a row of labelled icon buttons at a height
 * close to the composer it stands in for.
 */
const SelectionFooterBar = memo(() => {
  const { t } = useTranslation('chat');
  const { message } = App.useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const selectedCount = useConversationStore(messageStateSelectors.selectedMessageCount);
  const selectedMessageIds = useConversationStore((s) => s.selectedMessageIds);
  const exitSelectionMode = useConversationStore((s) => s.exitSelectionMode);
  const deleteMessages = useConversationStore((s) => s.deleteMessages);

  const disabled = selectedCount === 0;

  const handleDelete = () => {
    confirmModal({
      cancelText: t('cancel', { ns: 'common' }),
      content: t('messageForward.deleteConfirm.desc', { count: selectedCount }),
      okButtonProps: { danger: true },
      okText: t('delete', { ns: 'common' }),
      onOk: async () => {
        await deleteMessages([...selectedMessageIds]);
        exitSelectionMode();
        message.success(t('messageForward.deleteConfirm.success', { count: selectedCount }));
      },
      title: t('messageForward.deleteConfirm.title'),
    });
  };

  return (
    <>
      <Flexbox
        align={'center'}
        className={styles.bar}
        justify={'center'}
        style={{ position: 'relative' }}
      >
        <Text className={styles.count} type={'secondary'}>
          {t('messageForward.bar.selected', { count: selectedCount })}
        </Text>
        <Flexbox horizontal align={'center'} gap={44} justify={'center'}>
          <ActionColumn
            disabled={disabled}
            icon={Forward}
            label={t('messageForward.bar.forward')}
            onClick={() => setModalOpen(true)}
          />
          <ActionColumn
            danger
            disabled={disabled}
            icon={Trash2}
            label={t('messageForward.bar.delete')}
            onClick={handleDelete}
          />
          <ActionColumn
            icon={X}
            label={t('messageForward.bar.cancel')}
            onClick={exitSelectionMode}
          />
        </Flexbox>
      </Flexbox>
      <ForwardModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
});

SelectionFooterBar.displayName = 'MessageForwardSelectionFooterBar';

export default SelectionFooterBar;
