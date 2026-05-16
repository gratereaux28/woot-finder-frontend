import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  Image,
  Text,
  Tooltip,
} from '@mantine/core';
import {
  IconBrandAmazon,
  IconCalendar,
  IconDiscount2,
  IconExternalLink,
  IconPackage,
  IconRosetteDiscountCheck,
  IconTruckDelivery,
} from '@tabler/icons-react';

import type { Product } from '@shared/catalog';
import {
  amazonProductUrl,
  discountLabel,
  formatPrice,
  productDescription,
  timeRemainingLabel,
} from '../../utils/product';
import classes from './ProductCard.module.css';

/**
 * Builds the compact metadata row shown in the product card footer.
 */
const featureData = (product: Product) => [
  {
    shortLabel: product.isFeatured ? 'Featured' : 'Woot deal',
    fullLabel: undefined,
    icon: IconRosetteDiscountCheck,
  },
  {
    shortLabel: product.isFulfilledByAmazon ? 'Amazon fulfilled' : 'Woot fulfilled',
    fullLabel: undefined,
    icon: IconTruckDelivery,
  },
  {
    shortLabel: product.purchaseLimit ? `${product.purchaseLimit} max` : 'No limit',
    fullLabel: undefined,
    icon: IconPackage,
  },
  {
    ...timeRemainingLabel(product.endDate),
    icon: IconCalendar,
  },
];

/**
 * Summary card rendered in the catalog grid.
 */
type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

/**
 * Renders product highlights, pricing and navigation actions for a single deal.
 */
export function ProductCard({ product, onSelect }: ProductCardProps) {
  const features = featureData(product).map(feature => {
    const content = (
      <Center key={feature.shortLabel} className={classes.feature}>
        <feature.icon size={16} className={classes.icon} stroke={1.5} />
        <Text size="xs" lineClamp={1}>
          {feature.shortLabel}
        </Text>
      </Center>
    );

    return feature.fullLabel ? (
      <Tooltip key={feature.fullLabel} label={feature.fullLabel} withArrow>
        {content}
      </Tooltip>
    ) : (
      content
    );
  });

  const discount = discountLabel(product);
  const amazonUrl = amazonProductUrl(product);

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(product);
        }
      }}
    >
      <Card.Section className={classes.imageSection}>
        {product.photoUrl ? (
          <Image src={product.photoUrl} alt={product.title} className={classes.image} fit="contain" />
        ) : (
          <Center className={classes.emptyImage}>
            <IconPackage size={44} stroke={1.5} />
          </Center>
        )}
      </Card.Section>

      <Group justify="space-between" mt="md" align="flex-start" wrap="nowrap">
        <div className={classes.titleBlock}>
          <Text fw={500} lineClamp={2}>
            {product.title}
          </Text>
          <Text fz="xs" c="dimmed" lineClamp={2}>
            {productDescription(product)}
          </Text>
        </div>
        <div className={classes.badgeStack}>
          {discount ? (
            <Badge variant="outline" className={classes.discountBadge}>
              {discount}
            </Badge>
          ) : null}
          {product.isAvailableOnMobileAppOnly ? (
            <Badge color="green" variant="light" className={classes.discountBadge}>
              App only
            </Badge>
          ) : null}
          {product.isSoldOut ? (
            <Badge color="red" variant="light" className={classes.discountBadge}>
              Sold Out
            </Badge>
          ) : null}
        </div>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group gap={8} mb={-8} className={classes.features}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap="sm" wrap="nowrap" className={classes.actions}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              {formatPrice(product.salePriceMin)}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3} td="line-through">
              {formatPrice(product.listPriceMin)}
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }} rightSection={<IconDiscount2 size={16} />}>
            Details
          </Button>
          {product.url ? (
            <Button
              component="a"
              href={product.url}
              target="_blank"
              rel="noreferrer"
              radius="xl"
              variant="light"
              className={classes.marketplaceButton}
              rightSection={<IconExternalLink size={16} />}
              onClick={event => event.stopPropagation()}
            >
              Woot
            </Button>
          ) : null}
          {amazonUrl ? (
            <Button
              component="a"
              href={amazonUrl}
              target="_blank"
              rel="noreferrer"
              radius="xl"
              variant="light"
              color="orange"
              className={classes.externalButton}
              rightSection={<IconBrandAmazon size={16} />}
              onClick={event => event.stopPropagation()}
            >
              Amazon
            </Button>
          ) : null}
        </Group>
      </Card.Section>
    </Card>
  );
}
