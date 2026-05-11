import { requestWoot } from '../_client';
import type { PaginatedProducts, ProductListQuery } from '../../../shared/woot';

type RequestOption = {
  query?: ProductListQuery;
};

/**
 * Returns a paginated product list using the same filter contract consumed by the frontend.
 */
export const get = async ({ query }: RequestOption = {}): Promise<PaginatedProducts> => {
  return requestWoot<PaginatedProducts>('/woot/products', {
    page: query?.page ?? 1,
    limit: query?.limit ?? 24,
    search: query?.search,
    category: query?.category,
    isSoldOut: query?.isSoldOut,
    isFeatured: query?.isFeatured,
  });
};
