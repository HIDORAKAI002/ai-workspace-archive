import {useDelayedState} from '@dagster-io/ui-components';

import {useRecentAssetEventsForCatalogView} from './useRecentAssetEvents';
import {useRefreshAtInterval} from '../app/QueryRefresh';
import {AssetEventHistoryEventTypeSelector} from '../graphql/types';

const INTERVAL_MSEC = 30 * 1000;

const DEFAULT_EVENT_TYPE_SELECTORS: AssetEventHistoryEventTypeSelector[] = [
  AssetEventHistoryEventTypeSelector.MATERIALIZATION,
  AssetEventHistoryEventTypeSelector.FAILED_TO_MATERIALIZE,
  AssetEventHistoryEventTypeSelector.OBSERVATION,
];

type Config = {
  asset: {key: {path: string[]}};
  eventTypeSelectors?: AssetEventHistoryEventTypeSelector[];
};

export const useAssetRecentUpdates = ({asset, eventTypeSelectors}: Config) => {
  // Wait 500ms to avoid querying during fast scrolling of the table
  const shouldQuery = useDelayedState(500);
  const {
    events: recentEvents,
    latestInfo,
    loading,
    refetch,
  } = useRecentAssetEventsForCatalogView({
    assetKey: shouldQuery ? asset.key : undefined,
    limit: 5,
    eventTypeSelectors: eventTypeSelectors ?? DEFAULT_EVENT_TYPE_SELECTORS,
  });

  useRefreshAtInterval({
    refresh: refetch,
    intervalMs: INTERVAL_MSEC,
    enabled: shouldQuery,
  });

  return {recentEvents, latestInfo, loading: loading || !shouldQuery};
};
