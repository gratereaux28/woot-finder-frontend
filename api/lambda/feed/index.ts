import { requestCatalogApi } from '../_client';
import type { Feed } from '../../../shared/catalog';

/**
 * Returns the list of feeds exposed by the upstream Woot API.
 */
export const get = async (): Promise<Feed[]> => {
  return requestCatalogApi<Feed[]>('/woot/feeds');
};
