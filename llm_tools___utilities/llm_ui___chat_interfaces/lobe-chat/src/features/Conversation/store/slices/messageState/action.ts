import { produce } from 'immer';
import { type StateCreator } from 'zustand';

import { isSelectableRole } from '../../../MessageForward/selectableRoles';
import { type State } from '../../initialState';

export interface MessageEditingAction {
  /**
   * Enter multi-select mode. When `initialId` is provided that message starts
   * selected and anchors the "select to here" range action.
   */
  enterSelectionMode: (initialId?: string) => void;
  /**
   * Leave multi-select mode and drop every selected id.
   */
  exitSelectionMode: () => void;
  /**
   * Select every selectable message from the top of the conversation down to
   * the anchor (the message selection started from), inclusive. Mirrors
   * WeChat's "选择到这里".
   */
  selectToHere: () => void;
  /**
   * Toggle message editing state
   */
  toggleMessageEditing: (id: string, editing: boolean) => void;
  /**
   * Toggle whether a message is checked in multi-select mode.
   */
  toggleMessageSelected: (id: string, selected?: boolean) => void;
}

/**
 * Helper function to toggle an item in a boolean list
 */
const toggleBooleanList = (ids: string[], id: string, value: boolean) => {
  return produce(ids, (draft) => {
    if (value) {
      if (!draft.includes(id)) draft.push(id);
    } else {
      const index = draft.indexOf(id);
      if (index >= 0) draft.splice(index, 1);
    }
  });
};

export const messageEditingSlice: StateCreator<
  State,
  [['zustand/devtools', never]],
  [],
  MessageEditingAction
> = (set, get) => ({
  enterSelectionMode: (initialId) => {
    set(
      {
        selectedMessageIds: initialId ? [initialId] : [],
        selectionAnchorId: initialId,
        selectionMode: true,
      },
      false,
      'enterSelectionMode',
    );
  },
  exitSelectionMode: () => {
    set(
      { selectedMessageIds: [], selectionAnchorId: undefined, selectionMode: false },
      false,
      'exitSelectionMode',
    );
  },
  selectToHere: () => {
    const { displayMessages, selectionAnchorId } = get();
    const anchorIndex = selectionAnchorId
      ? displayMessages.findIndex((m) => m.id === selectionAnchorId)
      : displayMessages.length - 1;
    if (anchorIndex < 0) return;

    const ids = displayMessages
      .slice(0, anchorIndex + 1)
      .filter((m) => isSelectableRole(m.role))
      .map((m) => m.id);

    set({ selectedMessageIds: ids }, false, 'selectToHere');
  },
  toggleMessageEditing: (id, editing) => {
    set(
      { messageEditingIds: toggleBooleanList(get().messageEditingIds, id, editing) },
      false,
      'toggleMessageEditing',
    );
  },
  toggleMessageSelected: (id, selected) => {
    const current = get().selectedMessageIds;
    const next = selected ?? !current.includes(id);
    set(
      { selectedMessageIds: toggleBooleanList(current, id, next) },
      false,
      'toggleMessageSelected',
    );
  },
});
