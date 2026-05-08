import { requestWoot } from './_client';
import type { WootFeed } from '../../../shared/woot';

/**
 * Returns the list of feeds exposed by the upstream Woot API.
 */
export const get = async (): Promise<WootFeed[]> => {
  return requestWoot<WootFeed[]>('/woot/feeds');
};
