import type { ProductItemPhoto, WootProduct, WootProductDetail } from '@shared/woot';

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

export const formatPrice = (value?: string | number | null) => {
  const amount = numberFrom(value);
  return amount === null
    ? 'View price'
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export const discountLabel = (product: WootProduct) => {
  const sale = numberFrom(product.salePriceMin);
  const list = numberFrom(product.listPriceMin);

  if (!sale || !list || sale >= list) {
    return null;
  }

  return `${Math.round((1 - sale / list) * 100)}% off`;
};

export const productDescription = (product: WootProduct) => {
  return product.subtitle ?? product.teaser ?? product.fullTitle ?? product.title;
};

export type TimeRemaining = {
  shortLabel: string;
  fullLabel: string;
};

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

export const productCategoryLabel = (product?: WootProductDetail | null) => {
  const category = product?.categories?.find(item => item.category?.fullName)?.category;
  return category?.fullName ?? category?.name ?? 'Woot deal';
};

export const firstItemPhoto = (product?: WootProductDetail | null) => {
  const photos = product?.items?.flatMap(item => item.photoRows ?? item.photos ?? []) ?? [];
  const photo = photos.find((item): item is ProductItemPhoto => Boolean(item.url ?? item.Url));
  return photo?.url ?? photo?.Url ?? product?.photoUrl ?? null;
};

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
