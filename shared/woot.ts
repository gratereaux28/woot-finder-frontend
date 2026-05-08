export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type WootProduct = {
  id: string;
  offerId?: string | null;
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

export type ProductListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isSoldOut?: boolean;
  isFeatured?: boolean;
};

export type PaginatedProducts = {
  meta: PaginationMeta;
  data: WootProduct[];
};

export type WootFeed = {
  id: string;
  name: string;
  status: boolean;
  marketingName?: string | null;
  lastSyncedAt?: string | null;
};

export type WootCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  subcategories?: WootSubcategory[];
};

export type WootSubcategory = {
  id: string;
  name: string;
  slug: string;
  fullName: string;
  fullSlug: string;
};

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
