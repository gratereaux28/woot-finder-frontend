import { requestWoot } from './_client';
import type { WootCategory } from '../../../shared/woot';

export const get = async (): Promise<WootCategory[]> => {
  return requestWoot<WootCategory[]>('/woot/categories');
};
