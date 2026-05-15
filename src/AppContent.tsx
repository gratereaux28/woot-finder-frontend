/**
 * Root UI composition for the Woot Finder application.
 */
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import './App.css';

import { useEffect, useState } from 'react';
import type { WootProduct } from '@shared/woot';
import faviconUrl from './assets/favicon.ico';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal/ProductModal';
import { WootAppShell } from './components/WootAppShell/WootAppShell';
import { FloatingScrollTop } from './components/FloatingScrollTop';
import { useWootCatalog } from './hooks/useWootCatalog';

/**
 * Connects catalog state with the shell, grid, modal and utility widgets.
 */
function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState<WootProduct | null>(null);
  const catalog = useWootCatalog();

  useEffect(() => {
    document.title = 'WootFinder';

    const currentIcon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const iconElement = currentIcon ?? document.createElement('link');

    iconElement.rel = 'icon';
    iconElement.type = 'image/svg+xml';
    iconElement.href = faviconUrl;

    if (!currentIcon) {
      document.head.appendChild(iconElement);
    }
  }, []);

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
          <ProductGrid
            products={catalog.products.data}
            loading={catalog.loadingProducts}
            loadingMore={catalog.loadingMore}
            hasNextPage={catalog.products.meta.hasNextPage}
            onLoadMore={catalog.loadNextPage}
            onSelect={setSelectedProduct}
          />
      </WootAppShell>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <FloatingScrollTop />
    </>
  );
}

export default AppContent;