import { requestWoot } from '../_client';
import type { WootCategory } from '../../../shared/woot';

/**
 * Returns the category tree used by the catalog filters.
 */
export const get = async (): Promise<WootCategory[]> => {
  return requestWoot<WootCategory[]>('/woot/categories');
};
