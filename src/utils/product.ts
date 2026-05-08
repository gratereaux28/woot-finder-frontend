import type { ProductItemPhoto, WootProduct, WootProductDetail } from '@shared/woot';

/**
 * Coerces string and numeric API values into a finite number when possible.
 */
const numberFrom = (value?: string | number | null): number | null => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

/**
 * Formats a raw price value as USD and falls back to a generic label when missing.
 */
export const formatPrice = (value?: string | number | null) => {
  const amount = numberFrom(value);
  return amount === null
    ? 'View price'
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

/**
 * Computes a discount badge when both sale and list prices are available.
 */
export const discountLabel = (product: WootProduct) => {
  const sale = numberFrom(product.salePriceMin);
  const list = numberFrom(product.listPriceMin);

  if (!sale || !list || sale >= list) {
    return null;
  }

  return `${Math.round((1 - sale / list) * 100)}% off`;
};

/**
 * Chooses the best short description available for list and detail views.
 */
export const productDescription = (product: WootProduct) => {
  return product.subtitle ?? product.teaser ?? product.fullTitle ?? product.title;
};

/**
 * Human-readable remaining time metadata used in card tooltips.
 */
export type TimeRemaining = {
  shortLabel: string;
  fullLabel: string;
};

/**
 * Converts a product expiration date into short and long status labels.
 */
export const timeRemainingLabel = (endDate?: string | null): TimeRemaining => {
  if (!endDate) {
    return {
      shortLabel: 'Active',
      fullLabel: 'Deal active until sold out',
    };
  }

  const end = new Date(endDate).getTime();

  if (Number.isNaN(end)) {
    return {
      shortLabel: 'Active',
      fullLabel: 'Deal active until sold out',
    };
  }

  const diffMs = end - Date.now();

  if (diffMs <= 0) {
    return {
      shortLabel: 'Expired',
      fullLabel: 'Deal expired',
    };
  }

  const minutes = Math.ceil(diffMs / 60_000);
  const hours = Math.ceil(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  if (minutes < 60) {
    const shortLabel = `${minutes}m left`;
    return {
      shortLabel,
      fullLabel: `Deal expires in ${minutes}m or until sold out`,
    };
  }

  if (hours < 24) {
    const shortLabel = `${hours}h left`;
    return {
      shortLabel,
      fullLabel: `Deal expires in ${hours}h or until sold out`,
    };
  }

  const remainingHours = Math.ceil((diffMs - days * 86_400_000) / 3_600_000);

  if (remainingHours >= 24) {
    const shortLabel = `${days + 1}d left`;
    return {
      shortLabel,
      fullLabel: `Deal expires in ${days + 1}d or until sold out`,
    };
  }

  const shortLabel = `${days}d ${remainingHours}h left`;
  return {
    shortLabel,
    fullLabel: `Deal expires in ${days}d ${remainingHours}h or until sold out`,
  };
};

/**
 * Extracts the most specific category label available from a detailed product payload.
 */
export const productCategoryLabel = (product?: WootProductDetail | null) => {
  const category = product?.categories?.find(item => item.category?.fullName)?.category;
  return category?.fullName ?? category?.name ?? 'Woot deal';
};

/**
 * Returns the first usable item-level image, falling back to the product thumbnail.
 */
export const firstItemPhoto = (product?: WootProductDetail | null) => {
  const photos = product?.items?.flatMap(item => item.photoRows ?? item.photos ?? []) ?? [];
  const photo = photos.find((item): item is ProductItemPhoto => Boolean(item.url ?? item.Url));
  return photo?.url ?? photo?.Url ?? product?.photoUrl ?? null;
};

/**
 * Collects unique image URLs from the product summary and any item-level photos.
 */
export const productPhotos = (product?: WootProductDetail | WootProduct | null) => {
  if (!product) {
    return [];
  }

  const urls = [
    product.photoUrl,
    ...('items' in product
      ? product.items?.flatMap(item => item.photoRows ?? item.photos ?? []).map(photo => photo.url ?? photo.Url) ?? []
      : []),
  ].filter((url): url is string => Boolean(url));

  return [...new Set(urls)];
};
