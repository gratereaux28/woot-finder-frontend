import { requestCatalogApi } from '../../_client';
import type { ProductDetail } from '../../../../shared/catalog';

/**
 * Returns the complete detail payload for a single product.
 */
export const get = async (id: string): Promise<ProductDetail> => {
  return requestCatalogApi<ProductDetail>(`/woot/products/${id}`);
};
