/**
 * SCM file decoration provider.
 *
 * Adds badges to files in the Explorer and SCM views:
 *  - IMPACTED (orange) — file is in the blast radius of staged/unstaged changes
 *  - TESTED (green) — changed functions in this file have test coverage
 *  - UNTESTED (red) — changed functions lack test coverage
 */

import * as vscode from 'vscode';
import { SqliteReader } from '../backend/sqlite';

export class ScmDecorationProvider
  implements vscode.FileDecorationProvider
{
  private readonly _onDidChange = new vscode.EventEmitter<vscode.Uri | vscode.Uri[] | undefined>();
  readonly onDidChangeFileDecorations = this._onDidChange.event;

  /** Files directly changed (staged + unstaged). */
  private changedFiles = new Set<string>();
  /** Files in the blast radius but not directly changed. */
  private impactedFiles = new Set<string>();
  /** Changed files whose functions all have TESTED_BY edges. */
  private testedFiles = new Set<string>();
  /** Changed files with at least one function lacking TESTED_BY edges. */
  private untestedFiles = new Set<string>();

  /**
   * Recompute decorations from git state and the graph database.
   */
  async update(
    reader: SqliteReader,
    workspaceRoot: string,
  ): Promise<void> {
    const { execFile } = await import('node:child_process');
    const { promisify } = await import('node:util');
    const execFileAsync = promisify(execFile);
    const path = await import('node:path');

    // 1. Collect changed files
    let unstaged: string[] = [];
    let staged: string[] = [];
    try {
      const r1 = await execFileAsync('git', ['diff', '--name-only', 'HEAD'], {
        cwd: workspaceRoot,
        timeout: 10_000,
      });
      unstaged = r1.stdout.trim().split('\n').filter(Boolean);
    } catch { /* ignore */ }
    try {
      const r2 = await execFileAsync('git', ['diff', '--cached', '--name-only'], {
        cwd: workspaceRoot,
        timeout: 10_000,
      });
      staged = r2.stdout.trim().split('\n').filter(Boolean);
    } catch { /* ignore */ }

    const changedRelative = [...new Set([...unstaged, ...staged])];
    const changedAbsolute = changedRelative.map((f) => path.join(workspaceRoot, f));

    // 2. Compute impact radius
    const config = vscode.workspace.getConfiguration('codeReviewGraph');
    const depth = config.get<number>('blastRadiusDepth', 2);
    const impact = reader.getImpactRadius(changedAbsolute, depth);

    // 3. Classify files
    this.changedFiles = new Set(changedAbsolute);
    this.impactedFiles = new Set(
      impact.impactedNodes
        .map((n) => n.filePath)
        .filter((f) => !this.changedFiles.has(f)),
    );

    // 4. Test coverage classification
    this.testedFiles = new Set<string>();
    this.untestedFiles = new Set<string>();

    for (const filePath of this.changedFiles) {
      const nodes = reader.getNodesByFile(filePath);
      const functions = nodes.filter(
        (n) => n.kind === 'Function' && !n.isTest,
      );
      if (functions.length === 0) {
        continue;
      }

      let allTested = true;
      for (const fn of functions) {
        const edges = reader.getEdgesByTarget(fn.qualifiedName);
        const hasTest = edges.some((e) => e.kind === 'TESTED_BY');
        if (!hasTest) {
          // Also check outgoing TESTED_BY (reverse direction)
          const outEdges = reader.getEdgesBySource(fn.qualifiedName);
          const hasOutTest = outEdges.some((e) => e.kind === 'TESTED_BY');
          if (!hasOutTest) {
            allTested = false;
            break;
          }
        }
      }

      if (allTested) {
        this.testedFiles.add(filePath);
      } else {
        this.untestedFiles.add(filePath);
      }
    }

    // 5. Fire change event
    this._onDidChange.fire(undefined);
  }

  /** Clear all decorations. */
  clear(): void {
    this.changedFiles.clear();
    this.impactedFiles.clear();
    this.testedFiles.clear();
    this.untestedFiles.clear();
    this._onDidChange.fire(undefined);
  }

  provideFileDecoration(
    uri: vscode.Uri,
  ): vscode.FileDecoration | undefined {
    const filePath = uri.fsPath;

    if (this.untestedFiles.has(filePath)) {
      return {
        badge: '!',
        color: new vscode.ThemeColor('editorError.foreground'),
        tooltip: 'Code Graph: Changed functions lack test coverage',
        propagate: false,
      };
    }

    if (this.testedFiles.has(filePath)) {
      return {
        badge: '\u2713',
        color: new vscode.ThemeColor('testing.iconPassed'),
        tooltip: 'Code Graph: All changed functions have test coverage',
        propagate: false,
      };
    }

    if (this.impactedFiles.has(filePath)) {
      return {
        badge: '\u25CF',
        color: new vscode.ThemeColor('editorWarning.foreground'),
        tooltip: 'Code Graph: In blast radius of current changes',
        propagate: false,
      };
    }

    return undefined;
  }

  dispose(): void {
    this._onDidChange.dispose();
  }
}
