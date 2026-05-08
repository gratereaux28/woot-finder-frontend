import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import './App.css';

import { MantineProvider, Stack } from '@mantine/core';
import { useState } from 'react';

import type { WootProduct } from '@shared/woot';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal/ProductModal';
import { WootAppShell } from './components/WootAppShell/WootAppShell';
import { FloatingScrollTop } from './components/FloatingScrollTop';
import { useWootCatalog } from './hooks/useWootCatalog';

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState<WootProduct | null>(null);
  const catalog = useWootCatalog();

  const activeTitle =
    catalog.activeCategory ??
    (catalog.search.trim() ? `Search: ${catalog.search.trim()}` : 'All');

  return (
    <>
      <WootAppShell
        categories={catalog.categories}
        search={catalog.search}
        showSoldOut={catalog.showSoldOut}
        activeCategory={catalog.activeCategory}
        totalProducts={catalog.products.meta.total}
        onSearchChange={catalog.setSearch}
        onCategoryChange={catalog.setActiveCategory}
        onShowSoldOutChange={catalog.setShowSoldOut}
      >
        <Stack gap="lg">
          <ProductGrid
            products={catalog.products.data}
            loading={catalog.loadingProducts}
            loadingMore={catalog.loadingMore}
            hasNextPage={catalog.products.meta.hasNextPage}
            onLoadMore={catalog.loadNextPage}
            onSelect={setSelectedProduct}
          />
        </Stack>
      </WootAppShell>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <FloatingScrollTop />
    </>
  );
}

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AppContent />
    </MantineProvider>
  );
}
