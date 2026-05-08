import { get as getProductDetail } from '@api/woot/product/[id]';
import { Carousel } from '@mantine/carousel';
import {
  Badge,
  Button,
  Center,
  Group,
  Image,
  Loader,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconExternalLink, IconPackage } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import type { WootProduct, WootProductDetail } from '@shared/woot';
import {
  formatPrice,
  productCategoryLabel,
  productDescription,
  productPhotos,
} from '../../utils/product';
import classes from './ProductModal.module.css';

type ProductModalProps = {
  product: WootProduct | null;
  onClose: () => void;
};

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [detail, setDetail] = useState<WootProductDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (!product) {
      setDetail(null);
      return undefined;
    }

    setLoading(true);
    getProductDetail(product.id)
      .then(nextDetail => {
        if (active) {
          setDetail(nextDetail);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [product]);

  const currentProduct = detail ?? product;
  const photos = productPhotos(detail ?? product);

  return (
    <Modal opened={Boolean(product)} onClose={onClose} title={currentProduct?.title} size="lg" centered>
      {loading && !detail ? (
        <Center h={320}>
          <Loader />
        </Center>
      ) : currentProduct ? (
        <Stack gap="md">
          {photos.length > 0 ? (
            <Carousel
              withIndicators
              height={320}
              slideGap="md"
              className={classes.carousel}
              emblaOptions={{ loop: photos.length > 1 }}
            >
              {photos.map(photo => (
                <Carousel.Slide key={photo} className={classes.slide}>
                  <Image
                    src={photo}
                    alt={currentProduct.title}
                    h={320}
                    fit="contain"
                    radius="md"
                    className={classes.image}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          ) : (
            <Center h={260}>
              <IconPackage size={48} stroke={1.5} />
            </Center>
          )}

          <Group justify="space-between" align="flex-start">
            <Stack gap={4}>
              <Badge variant="outline">{productCategoryLabel(detail)}</Badge>
              <Title order={3}>{currentProduct.fullTitle ?? currentProduct.title}</Title>
              <Text c="dimmed" size="sm">
                {currentProduct.condition ?? 'Condition not specified'}
              </Text>
            </Stack>

            <Stack gap={3} align="flex-end">
              <Text fz="xl" fw={800}>
                {formatPrice(currentProduct.salePriceMin)}
              </Text>
              <Text c="dimmed" td="line-through" size="sm">
                {formatPrice(currentProduct.listPriceMin)}
              </Text>
            </Stack>
          </Group>

          <Text>{productDescription(currentProduct)}</Text>

          {detail?.items?.length ? (
            <Stack gap={6}>
              <Text fw={700} size="sm">
                Variants
              </Text>
              {detail.items.slice(0, 4).map(item => (
                <Group key={item.id} justify="space-between">
                  <Text size="sm" lineClamp={1}>
                    {item.title ?? item.asin ?? item.id}
                  </Text>
                  <Text size="sm" fw={700}>
                    {formatPrice(item.salePrice)}
                  </Text>
                </Group>
              ))}
            </Stack>
          ) : null}

          {currentProduct.url ? (
            <Button
              component="a"
              href={currentProduct.url}
              target="_blank"
              rel="noreferrer"
              rightSection={<IconExternalLink size={16} />}
            >
              Open in Woot
            </Button>
          ) : null}
        </Stack>
      ) : null}
    </Modal>
  );
}
