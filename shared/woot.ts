/**
 * Shared domain contracts consumed by both the frontend and the BFF layer.
 */

/**
 * Common pagination metadata returned by list endpoints.
 */
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

/**
 * Product summary used in lists and as the base for product detail payloads.
 */
export type WootProduct = {
  id: string;
  offerId?: string | null;
  asin?: string | null;
  title: string;
  fullTitle?: string | null;
  subtitle?: string | null;
  teaser?: string | null;
  slug?: string | null;
  url?: string | null;
  forumUrl?: string | null;
  photoUrl?: string | null;
  condition?: string | null;
  isSoldOut: boolean;
  isWootOff?: boolean;
  isFeatured: boolean;
  isFulfilledByAmazon?: boolean;
  isAvailableOnMobileAppOnly?: boolean;
  salePriceMin?: string | null;
  salePriceMax?: string | null;
  listPriceMin?: string | null;
  listPriceMax?: string | null;
  percentageRemainingBlurred?: number | null;
  quantityLimit?: number | null;
  purchaseLimit?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  eventId?: string | null;
  firstSeenAt?: string | null;
  lastSeenAt?: string | null;
};

/**
 * Filter contract supported by the product listing endpoint.
 */
export type ProductListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isSoldOut?: boolean;
  isFeatured?: boolean;
};

/**
 * Product list response paired with pagination metadata.
 */
export type PaginatedProducts = {
  meta: PaginationMeta;
  data: WootProduct[];
};

/**
 * Feed descriptor returned by the upstream API.
 */
export type WootFeed = {
  id: string;
  name: string;
  status: boolean;
  marketingName?: string | null;
  lastSyncedAt?: string | null;
};

/**
 * Top-level category with optional nested subcategories.
 */
export type WootCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  subcategories?: WootSubcategory[];
};

/**
 * Subcategory metadata used for secondary navigation and filtering.
 */
export type WootSubcategory = {
  id: string;
  name: string;
  slug: string;
  fullName: string;
  fullSlug: string;
};

/**
 * Photo shape as returned by item-level detail payloads.
 */
export type ProductItemPhoto = {
  url?: string;
  Url?: string;
  caption?: string | null;
  Caption?: string | null;
  width?: number | null;
  Width?: number | null;
  height?: number | null;
  Height?: number | null;
};

/**
 * Variant or SKU level data returned for a detailed product.
 */
export type ProductItem = {
  id: string;
  asin?: string | null;
  title?: string | null;
  salePrice?: string | null;
  listPrice?: string | null;
  photos?: ProductItemPhoto[];
  photoRows?: ProductItemPhoto[];
  attributes?: unknown[];
  attributeRows?: unknown[];
};

/**
 * Extended product payload used by the detail modal.
 */
export type WootProductDetail = WootProduct & {
  categories?: Array<{
    category?: {
      id: string;
      name: string;
      slug: string;
      subCategory?: string | null;
      subCategorySlug?: string | null;
      fullName?: string | null;
      fullSlug?: string | null;
      description?: string | null;
    };
  }>;
  feeds?: Array<{
    feed?: WootFeed;
  }>;
  items?: ProductItem[];
  details?: unknown;
};
