use leptos::*;

use crate::i18n::t;

const MAX_HISTORY: usize = 50;

/// Client-side undo/redo stack for text editors.
#[derive(Clone)]
pub struct EditorHistory {
    undo_stack: RwSignal<Vec<String>>,
    redo_stack: RwSignal<Vec<String>>,
}

impl EditorHistory {
    pub fn new() -> Self {
        Self {
            undo_stack: create_rw_signal(Vec::new()),
            redo_stack: create_rw_signal(Vec::new()),
        }
    }

    /// Push a snapshot onto the undo stack (call on blur or significant change).
    pub fn push_snapshot(&self, content: &str) {
        self.undo_stack.update(|stack| {
            // Don't push duplicate
            if stack.last().map(|s| s.as_str()) == Some(content) {
                return;
            }
            stack.push(content.to_string());
            if stack.len() > MAX_HISTORY {
                stack.remove(0);
            }
        });
        // Clear redo stack on new change
        self.redo_stack.set(Vec::new());
    }

    /// Undo: pop from undo stack, push current to redo stack.
    pub fn undo(&self, current: &str) -> Option<String> {
        let mut result = None;
        self.undo_stack.update(|stack| {
            if let Some(previous) = stack.pop() {
                self.redo_stack.update(|redo| {
                    redo.push(current.to_string());
                });
                result = Some(previous);
            }
        });
        result
    }

    /// Redo: pop from redo stack, push current to undo stack.
    pub fn redo(&self, current: &str) -> Option<String> {
        let mut result = None;
        self.redo_stack.update(|stack| {
            if let Some(next) = stack.pop() {
                self.undo_stack.update(|undo| {
                    undo.push(current.to_string());
                });
                result = Some(next);
            }
        });
        result
    }

    pub fn can_undo(&self) -> bool {
        !self.undo_stack.get_untracked().is_empty()
    }

    pub fn can_redo(&self) -> bool {
        !self.redo_stack.get_untracked().is_empty()
    }
}

/// Toolbar buttons for undo/redo.
#[component]
pub fn UndoRedoButtons(history: EditorHistory, content: RwSignal<String>) -> impl IntoView {
    let history_undo = history.clone();
    let history_redo = history.clone();
    let history_can_undo = history.clone();
    let history_can_redo = history;

    let handle_undo = move |_| {
        let current = content.get_untracked();
        if let Some(previous) = history_undo.undo(&current) {
            content.set(previous);
        }
    };

    let handle_redo = move |_| {
        let current = content.get_untracked();
        if let Some(next) = history_redo.redo(&current) {
            content.set(next);
        }
    };

    view! {
        <button
            class="btn btn-sm btn-ghost"
            title=t("component.editor.undo_tooltip").get_untracked()
            on:click=handle_undo
            disabled=move || !history_can_undo.can_undo()
        >
            "↩"
        </button>
        <button
            class="btn btn-sm btn-ghost"
            title=t("component.editor.redo_tooltip").get_untracked()
            on:click=handle_redo
            disabled=move || !history_can_redo.can_redo()
        >
            "↪"
        </button>
    }
}
