---
name: jupyter-notebook
description: ユーザーが実験、探索、またはチュートリアル用の Jupyter ノートブック（`.ipynb`）を作成、スキャフォールド、または編集するよう依頼したときに使用します。バンドルされたテンプレートを優先し、ヘルパースクリプト
  `new_notebook.py` を実行してクリーンな開始ノートブックを生成してください。
---
# Jupyter Notebookのスキル

クリーンで再現可能な Jupyter ノートブックを、主に次の2つのモード向けに作成します:

- 実験および探索的解析
- チュートリアルおよび教育向けのウォークスルー

同梱のテンプレートとヘルパースクリプトを使うことで、一貫した構造を保ち、JSONのミスを減らすことを推奨します。

## When to use
- 新しい `.ipynb` ノートブックをゼロから作成するとき。
- ラフなノートやスクリプトを構造化されたノートブックに変換するとき。
- 既存のノートブックをより再現可能で読みやすくリファクタリングするとき。
- 他の人が読むまたは再実行する実験やチュートリアルを作成するとき。

## Decision tree
- リクエストが探索的、分析的、または仮説駆動型であれば、`experiment` を選びます。
- リクエストが指導的、段階的、または特定の対象者向けであれば、`tutorial` を選びます。
- 既存のノートブックを編集する場合はリファクタとして扱い、意図を保持して構造を改善します。

## Skill path (set once)

```bash
export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
export JUPYTER_NOTEBOOK_CLI="$CODEX_HOME/skills/jupyter-notebook/scripts/new_notebook.py"
```

User-scoped skills install under `$CODEX_HOME/skills` (default: `~/.codex/skills`).

## Workflow
1. Lock the intent.
Identify the notebook kind: `experiment` or `tutorial`.
Capture the objective, audience, and what "done" looks like.

2. Scaffold from the template.
Use the helper script to avoid hand-authoring raw notebook JSON.

```bash
uv run --python 3.12 python "$JUPYTER_NOTEBOOK_CLI" \
  --kind experiment \
  --title "Compare prompt variants" \
  --out output/jupyter-notebook/compare-prompt-variants.ipynb
```

```bash
uv run --python 3.12 python "$JUPYTER_NOTEBOOK_CLI" \
  --kind tutorial \
  --title "Intro to embeddings" \
  --out output/jupyter-notebook/intro-to-embeddings.ipynb
```

3. Fill the notebook with small, runnable steps.
Keep each code cell focused on one step.
Add short markdown cells that explain the purpose and expected result.
Avoid large, noisy outputs when a short summary works.

4. Apply the right pattern.
For experiments, follow `references/experiment-patterns.md`.
For tutorials, follow `references/tutorial-patterns.md`.

5. Edit safely when working with existing notebooks.
Preserve the notebook structure; avoid reordering cells unless it improves the top-to-bottom story.
Prefer targeted edits over full rewrites.
If you must edit raw JSON, review `references/notebook-structure.md` first.

6. Validate the result.
Run the notebook top-to-bottom when the environment allows.
If execution is not possible, say so explicitly and call out how to validate locally.
Use the final pass checklist in `references/quality-checklist.md`.

## Templates and helper script
- Templates live in `assets/experiment-template.ipynb` and `assets/tutorial-template.ipynb`.
- The helper script loads a template, updates the title cell, and writes a notebook.

Script path:
- `$JUPYTER_NOTEBOOK_CLI`（インストール時のデフォルト: `$CODEX_HOME/skills/jupyter-notebook/scripts/new_notebook.py`）

## Temp and output conventions
- Use `tmp/jupyter-notebook/` for intermediate files; delete when done.
- Write final artifacts under `output/jupyter-notebook/` when working in this repo.
- Use stable, descriptive filenames (for example, `ablation-temperature.ipynb`).

## Dependencies (install only when needed)
Prefer `uv` for dependency management.

Optional Python packages for local notebook execution:

```bash
uv pip install jupyterlab ipykernel
```

The bundled scaffold script uses only the Python standard library and does not require extra dependencies.

## Environment
No required environment variables.

## Reference map
- `references/experiment-patterns.md`: 実験の構成と経験則。
- `references/tutorial-patterns.md`: チュートリアルの構成と教育的な流れ。
- `references/notebook-structure.md`: ノートブックJSONの構造と安全な編集ルール。
- `references/quality-checklist.md`: 最終検証チェックリスト。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
免責事項：
本書はAI翻訳サービス「Co-op Translator」(https://github.com/Azure/co-op-translator)を使用して翻訳されました。正確さには努めていますが、自動翻訳には誤りや不正確な箇所が含まれる可能性があります。原文（原言語の文書）を正本としてご参照ください。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈の相違についても、当社は責任を負いません。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->