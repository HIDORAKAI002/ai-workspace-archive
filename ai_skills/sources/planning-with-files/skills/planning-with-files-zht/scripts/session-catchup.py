#!/usr/bin/env python3
"""
planning-with-files 會話恢復腳本

分析上一個會話，找出最後一次規劃檔案更新後未同步的上下文。
設計用於 SessionStart 時執行。

用法：python3 session-catchup.py [專案路徑]
"""

import json
import sys
import os
from pathlib import Path
from typing import List, Dict, Optional, Tuple

PLANNING_FILES = ['task_plan.md', 'progress.md', 'findings.md']


def get_project_dir(project_path: str) -> Tuple[Optional[Path], Optional[str]]:
    """解析目前執行環境的會話儲存路徑。"""
    sanitized = project_path.replace('/', '-')
    if not sanitized.startswith('-'):
        sanitized = '-' + sanitized
    sanitized = sanitized.replace('_', '-')

    claude_path = Path.home() / '.claude' / 'projects' / sanitized

    # Codex 將會話存放在 ~/.codex/sessions，格式不同。
    # 從 Codex 技能資料夾執行時，避免靜默掃描 Claude 路徑。
    script_path = Path(__file__).as_posix().lower()
    is_codex_variant = '/.codex/' in script_path
    codex_sessions_dir = Path.home() / '.codex' / 'sessions'
    if is_codex_variant and codex_sessions_dir.exists() and not claude_path.exists():
        return None, (
            "[planning-with-files] 會話恢復已跳過：Codex 將會話存放在 "
            "~/.codex/sessions，原生 Codex 解析尚未實作。"
        )

    return claude_path, None


def get_sessions_sorted(project_dir: Path) -> List[Path]:
    """取得所有會話檔案，按修改時間排序（最新優先）。"""
    sessions = list(project_dir.glob('*.jsonl'))
    main_sessions = [s for s in sessions if not s.name.startswith('agent-')]
    return sorted(main_sessions, key=lambda p: p.stat().st_mtime, reverse=True)


def parse_session_messages(session_file: Path) -> List[Dict]:
    """解析會話檔案中的所有訊息，保持順序。"""
    messages = []
    with open(session_file, 'r') as f:
        for line_num, line in enumerate(f):
            try:
                data = json.loads(line)
                data['_line_num'] = line_num
                messages.append(data)
            except json.JSONDecodeError:
                pass
    return messages


def find_last_planning_update(messages: List[Dict]) -> Tuple[int, Optional[str]]:
    """
    找出最後一次寫入/編輯規劃檔案的時間點。
    回傳 (行號, 檔案名稱) 或 (-1, None)（如果未找到）。
    """
    last_update_line = -1
    last_update_file = None

    for msg in messages:
        msg_type = msg.get('type')

        if msg_type == 'assistant':
            content = msg.get('message', {}).get('content', [])
            if isinstance(content, list):
                for item in content:
                    if item.get('type') == 'tool_use':
                        tool_name = item.get('name', '')
                        tool_input = item.get('input', {})

                        if tool_name in ('Write', 'Edit'):
                            file_path = tool_input.get('file_path', '')
                            for pf in PLANNING_FILES:
                                if file_path.endswith(pf):
                                    last_update_line = msg['_line_num']
                                    last_update_file = pf

    return last_update_line, last_update_file


def extract_messages_after(messages: List[Dict], after_line: int) -> List[Dict]:
    """擷取特定行號之後的對話訊息。"""
    result = []
    for msg in messages:
        if msg['_line_num'] <= after_line:
            continue

        msg_type = msg.get('type')
        is_meta = msg.get('isMeta', False)

        if msg_type == 'user' and not is_meta:
            content = msg.get('message', {}).get('content', '')
            if isinstance(content, list):
                for item in content:
                    if isinstance(item, dict) and item.get('type') == 'text':
                        content = item.get('text', '')
                        break
                else:
                    content = ''

            if content and isinstance(content, str):
                if content.startswith(('<local-command', '<command-', '<task-notification')):
                    continue
                if len(content) > 20:
                    result.append({'role': 'user', 'content': content, 'line': msg['_line_num']})

        elif msg_type == 'assistant':
            msg_content = msg.get('message', {}).get('content', '')
            text_content = ''
            tool_uses = []

            if isinstance(msg_content, str):
                text_content = msg_content
            elif isinstance(msg_content, list):
                for item in msg_content:
                    if item.get('type') == 'text':
                        text_content = item.get('text', '')
                    elif item.get('type') == 'tool_use':
                        tool_name = item.get('name', '')
                        tool_input = item.get('input', {})
                        if tool_name == 'Edit':
                            tool_uses.append(f"Edit: {tool_input.get('file_path', 'unknown')}")
                        elif tool_name == 'Write':
                            tool_uses.append(f"Write: {tool_input.get('file_path', 'unknown')}")
                        elif tool_name == 'Bash':
                            cmd = tool_input.get('command', '')[:80]
                            tool_uses.append(f"Bash: {cmd}")
                        else:
                            tool_uses.append(f"{tool_name}")

            if text_content or tool_uses:
                result.append({
                    'role': 'assistant',
                    'content': text_content[:600] if text_content else '',
                    'tools': tool_uses,
                    'line': msg['_line_num']
                })

    return result


def main():
    project_path = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()

    # 檢查規劃檔案是否存在（表示有進行中的任務）
    has_planning_files = any(
        Path(project_path, f).exists() for f in PLANNING_FILES
    )
    if not has_planning_files:
        # 此專案中沒有規劃檔案；跳過恢復以避免干擾。
        return

    project_dir, skip_reason = get_project_dir(project_path)
    if skip_reason:
        print(skip_reason)
        return

    if not project_dir.exists():
        # 沒有先前的會話，無需恢復
        return

    sessions = get_sessions_sorted(project_dir)
    if len(sessions) < 1:
        return

    # 找到一個有實質內容的先前會話
    target_session = None
    for session in sessions:
        if session.stat().st_size > 5000:
            target_session = session
            break

    if not target_session:
        return

    messages = parse_session_messages(target_session)
    last_update_line, last_update_file = find_last_planning_update(messages)

    # 目標會話中沒有規劃更新；跳過恢復輸出。
    if last_update_line < 0:
        return

    # 僅在有未同步內容時輸出
    messages_after = extract_messages_after(messages, last_update_line)

    if not messages_after:
        return

    # 輸出恢復報告
    print("\n[planning-with-files] 偵測到會話恢復需求")
    print(f"先前會話：{target_session.stem}")

    print(f"最後規劃更新：{last_update_file}（訊息 #{last_update_line}）")
    print(f"未同步訊息：{len(messages_after)} 則")

    print("\n--- 未同步的上下文 ---")
    for msg in messages_after[-15:]:  # 最後 15 則訊息
        if msg['role'] == 'user':
            print(f"使用者：{msg['content'][:300]}")
        else:
            if msg.get('content'):
                print(f"CLAUDE：{msg['content'][:300]}")
            if msg.get('tools'):
                print(f"  工具：{', '.join(msg['tools'][:4])}")

    print("\n--- 建議操作 ---")
    print("1. 執行：git diff --stat")
    print("2. 讀取：task_plan.md、progress.md、findings.md")
    print("3. 根據上述上下文更新規劃檔案")
    print("4. 繼續任務")


if __name__ == '__main__':
    main()
