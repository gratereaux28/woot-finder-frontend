import { requestWoot } from '../../_client';
import type { WootProductDetail } from '../../../../shared/woot';

/**
 * Returns the complete detail payload for a single product.
 */
export const get = async (id: string): Promise<WootProductDetail> => {
  return requestWoot<WootProductDetail>(`/woot/products/${id}`);
};
