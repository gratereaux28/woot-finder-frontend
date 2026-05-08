import { requestWoot } from './_client';
import type { WootFeed } from '../../../shared/woot';

export const get = async (): Promise<WootFeed[]> => {
  return requestWoot<WootFeed[]>('/woot/feeds');
};
