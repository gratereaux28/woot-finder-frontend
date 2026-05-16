import { requestCatalogApi } from '../_client';
import type { Category } from '../../../shared/catalog';

/**
 * Returns the category tree used by the catalog filters.
 */
export const get = async (): Promise<Category[]> => {
  return requestCatalogApi<Category[]>('/woot/categories');
};
