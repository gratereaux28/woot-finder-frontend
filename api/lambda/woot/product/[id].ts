import { requestWoot } from '../_client';
import type { WootProductDetail } from '../../../../shared/woot';

export const get = async (id: string): Promise<WootProductDetail> => {
  return requestWoot<WootProductDetail>(`/woot/products/${id}`);
};
