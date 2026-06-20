import {
  extractFilterFromXwhere,
  isLinksOrLTAR,
  NcApiVersion,
} from 'nocodb-sdk';
import type { FilterType } from 'nocodb-sdk';
import type { NcContext } from '~/interface/config';
import type { LinkToAnotherRecordColumn, Model } from '~/models';
import { Column } from '~/models';
import { hasTableVisibilityAccess } from '~/helpers/tableHelpers';

/**
 * Walks a parsed filter tree and reports whether any leaf references a column
 * outside the allowed (exposed) set.
 */
function filtersReferenceHiddenColumn(
  filters: FilterType[] | undefined,
  exposedColumnIds: Set<string>,
): boolean {
  for (const filter of filters || []) {
    if (filter.is_group) {
      if (
        filtersReferenceHiddenColumn(
          filter.children as FilterType[],
          exposedColumnIds,
        )
      ) {
        return true;
      }
    } else if (
      filter.fk_column_id &&
      !exposedColumnIds.has(filter.fk_column_id)
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Keeps only the sort terms that target an exposed (or unknown/harmless) column.
 *
 * Mirrors the parsing in `extractSortsObject` (the downstream compiler) so the two
 * never disagree about which column a term resolves to:
 *  - V3 sort is a JSON array of `{ field, direction }` — either a JSON string or an
 *    already-parsed array. The old `String(sort).split(',')` turned that into garbage
 *    tokens that matched no alias and survived, leaving an ordering oracle on hidden
 *    columns. Here we parse it the same way `extractSortsObject` does and resolve each
 *    `field` via the alias map.
 *  - V2 sort is a comma-separated string (or array) of field names, each optionally
 *    prefixed with a sort operator (`-`, `~-`, `~+`, `+`).
 *
 * A term whose field doesn't resolve to a known column is left in place — it resolves
 * to nothing downstream and is harmless; a known-but-hidden reference is the oracle to
 * drop. Returns `undefined` when nothing survives, preserving the input shape otherwise.
 */
function sanitizeSortValue(
  sort: string | string[] | { field?: string; direction?: string }[],
  aliasColObjMap: { [columnAlias: string]: Column },
  exposedColumnIds: Set<string>,
  apiVersion?: NcApiVersion,
): string | string[] | { field?: string; direction?: string }[] | undefined {
  const isExposedOrUnknown = (colId?: string) =>
    !colId || exposedColumnIds.has(colId);

  // V3 — JSON array of `{ field, direction }`, as a JSON string or parsed array.
  if (apiVersion === NcApiVersion.V3) {
    const wasString = typeof sort === 'string';
    let parsed: any = sort;
    if (wasString) {
      try {
        parsed = JSON.parse(sort as string);
      } catch {
        parsed = sort;
      }
    }
    if (!Array.isArray(parsed)) parsed = [parsed];

    const kept = (parsed as { field?: string; direction?: string }[]).filter(
      (s) => isExposedOrUnknown(aliasColObjMap[s?.field]?.id),
    );
    if (!kept.length) return undefined;
    return wasString ? JSON.stringify(kept) : kept;
  }

  // V2 — comma-separated string or array of strings, each optionally prefixed
  // with a sort operator (`-`, `~-`, `~+`, `+`).
  const wasArray = Array.isArray(sort);
  const terms = (wasArray ? (sort as string[]) : String(sort).split(','))
    .map((t) => String(t).trim())
    .filter(Boolean)
    .filter((term) =>
      isExposedOrUnknown(aliasColObjMap[term.replace(/^~?[+-]/, '')]?.id),
    );
  if (!terms.length) return undefined;
  return wasArray ? terms : terms.join(',');
}

/**
 * Restricts the caller-supplied `where`/`sort` on a nested-link list to the
 * columns the link actually exposes.
 *
 * Cross-base and visibility-limited related tables expose only their primary key,
 * primary value and (optional) custom display-value column over a link — the nested
 * fetchers restrict the SELECT to those via `pkAndPvOnly`. The caller-supplied
 * `where`/`sort`, however, are otherwise compiled against the related table's full
 * column set, turning any hidden column into a one-bit oracle
 * (`where=(Secret,like,X%)` → the related row matches or it doesn't; `sort` reorders
 * by the hidden value). Stripping references to non-exposed columns keeps the
 * predicate confined to what the link already shows, mirroring the public
 * shared-view sanitizer.
 *
 * Must be invoked at every nested-link entry point that forwards request query to a
 * fetcher — because the EE optimized path builds its own query from `param.query`
 * and never funnels through the shared `BaseModelSqlv2.mmList`/`hmList`, sanitizing
 * the query at the entry point covers both the optimized and unoptimized fetchers.
 * The covered surfaces:
 *  - the v2/v3 `/links/` endpoint and its copy/paste/delete-all diff;
 *  - the v1 `/mm/`,`/hm/`,`/bt/`,`/oo/` linked-list endpoints;
 *  - the legacy `/data/:viewId/:rowId/mm|hm/:colId` route;
 *  - the excluded-list / link-picker endpoints (`mm/hm/bt/ooExcludedList`) — the
 *    same `pkAndPvOnly` restriction applies over the *unlinked* rows;
 *  - the public shared-view `/mm/`,`/hm/` endpoints (`publicMmList`/`publicHmList`).
 *
 * Mutates `query` in place — both the data fetch and the count read from it.
 */
export async function restrictNestedLinkQuery(
  context: NcContext,
  colOptions: LinkToAnotherRecordColumn,
  relatedModel: Model,
  query: Record<string, any>,
): Promise<void> {
  if (!query) return;

  const restricted =
    colOptions.isCrossBaseLink() ||
    !(await hasTableVisibilityAccess(context, relatedModel.id, context.user));

  if (!restricted) return;

  // Nothing to sanitize — skip the (cross-base) column lookup entirely.
  if (!query.where && !query.sort) return;

  // The related table may live in another base — resolve its columns in its own
  // context and into a local list (don't mutate the shared model's column cache,
  // which the downstream fetcher/count rely on).
  const { refContext } = colOptions.getRelContext(context);
  const columns = await Column.list(refContext, {
    fk_model_id: relatedModel.id,
  });
  const displayValueColId = colOptions.fk_display_value_column_id;
  const exposedColumnIds = new Set(
    columns
      .filter((c) => c.pk || c.pv || c.id === displayValueColId)
      .map((c) => c.id),
  );

  const aliasColObjMap = await relatedModel.getAliasColObjMap(
    refContext,
    columns,
  );

  // Drop the whole `where` if it references any hidden (non-exposed) column.
  // Unknown column references are left as-is — they resolve to nothing downstream
  // and are harmless, whereas a known-but-hidden reference is the oracle to kill.
  if (query.where) {
    const { filters } = extractFilterFromXwhere(
      context,
      query.where,
      aliasColObjMap,
    );
    if (filtersReferenceHiddenColumn(filters, exposedColumnIds)) {
      query.where = undefined;
    }
  }

  // Keep only sort terms that target an exposed (or unknown/harmless) column.
  if (query.sort) {
    query.sort = sanitizeSortValue(
      query.sort,
      aliasColObjMap,
      exposedColumnIds,
      context.api_version,
    );
  }
}

/**
 * Convenience wrapper around {@link restrictNestedLinkQuery} for entry points that
 * hold a resolved link {@link Column} rather than its colOptions/related model.
 * No-op for non-LTAR columns.
 */
export async function restrictNestedLinkQueryForColumn(
  context: NcContext,
  column: Column,
  query: Record<string, any>,
): Promise<void> {
  if (!query || !column || !isLinksOrLTAR(column)) return;

  const colOptions = await column.getColOptions<LinkToAnotherRecordColumn>(
    context,
  );
  if (!colOptions) return;

  const relatedModel = await colOptions.getRelatedTable(context);
  await restrictNestedLinkQuery(context, colOptions, relatedModel, query);
}
