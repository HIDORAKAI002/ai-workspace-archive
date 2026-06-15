import { isDesktop } from '@lobechat/const';
import { Flexbox, TooltipGroup } from '@lobehub/ui';
import React, { memo, Suspense, useCallback } from 'react';

import DragUploadZone, { type DroppedFolder, useUploadFiles } from '@/components/DragUploadZone';
import Loading from '@/components/Loading/BrandTextLoading';
import { insertLocalFolderMentions } from '@/features/ChatInput/InputEditor/insertLocalFolderMentions';
import { useAgentStore } from '@/store/agent';
import { agentByIdSelectors, chatConfigByIdSelectors } from '@/store/agent/selectors';
import { useChatStore } from '@/store/chat';

import ConversationArea from './ConversationArea';

const wrapperStyle: React.CSSProperties = {
  flex: 1,
  height: '100%',
  minWidth: 300,
  width: '100%',
};

const ChatConversation = memo(() => {
  // ChatConversation sits above the ConversationProvider, so read the routed
  // agent from the chat store (set by AgentIdSync, not the hijack-prone agent
  // store) and feed it to the scoped `*ById` selectors.
  const agentId = useChatStore((s) => s.activeAgentId) || '';
  const model = useAgentStore(agentByIdSelectors.getAgentModelById(agentId));
  const provider = useAgentStore(agentByIdSelectors.getAgentModelProviderById(agentId));
  const isHeterogeneous = useAgentStore(agentByIdSelectors.isAgentHeterogeneousById(agentId));
  const isLocalSystemEnabled = useAgentStore(
    chatConfigByIdSelectors.isLocalSystemEnabledById(agentId),
  );

  const { handleUploadFiles } = useUploadFiles({ model, provider });

  const enableLocalFolderMention = isDesktop && (isHeterogeneous || isLocalSystemEnabled);

  const handleLocalFolders = useCallback((folders: DroppedFolder[]) => {
    const editor = useChatStore.getState().mainInputEditor?.instance;
    if (!editor) return;
    insertLocalFolderMentions(editor, folders);
  }, []);

  return (
    <Suspense fallback={<Loading debugId="Agent > ChatConversation" />}>
      <DragUploadZone
        enableLocalFolderMention={enableLocalFolderMention}
        style={wrapperStyle}
        onLocalFolders={enableLocalFolderMention ? handleLocalFolders : undefined}
        onUploadFiles={handleUploadFiles}
      >
        <Flexbox flex={1} height={'100%'} style={{ minWidth: 0 }}>
          <TooltipGroup>
            <ConversationArea />
          </TooltipGroup>
        </Flexbox>
      </DragUploadZone>
    </Suspense>
  );
});

ChatConversation.displayName = 'ChatConversation';

export default ChatConversation;
