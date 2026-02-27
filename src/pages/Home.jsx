import { useMemo, useState } from 'react';

import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import { products } from '../data/products';
import homeStyles from '../styles/Home.module.css';
import productListStyles from '../styles/ProductList.module.css';

const STORAGE_KEY = 'products';
const DEFAULT_RATING = 3;

const seedById = new Map(products.map((product) => [product.id, product]));

const normalizeProduct = (product) => {
  const seedProduct = seedById.get(product?.id);
  const parsedRating = Number(product?.rating ?? seedProduct?.rating ?? DEFAULT_RATING);
  const rating = Number.isFinite(parsedRating)
    ? Math.min(5, Math.max(1, parsedRating))
    : DEFAULT_RATING;

  return {
    ...seedProduct,
    ...product,
    rating,
  };
};

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [productsState] = useState(() => {
    if (typeof window === 'undefined') {
      return products;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return products;
    }

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.map(normalizeProduct) : products;
    } catch {
      return products;
    }
  });

  const categories = useMemo(() => {
    const categoryMap = new Map();

    for (const product of productsState) {
      const category = product.category ?? 'Sin categoría';
      const list = categoryMap.get(category) ?? [];
      list.push(product);
      categoryMap.set(category, list);
    }

    const sorted = Array.from(categoryMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, list]) => {
        const orderedProducts = [...list].sort((p1, p2) => {
          const r1 = Number(p1.rating);
          const r2 = Number(p2.rating);
          const d = (Number.isFinite(r2) ? r2 : 0) - (Number.isFinite(r1) ? r1 : 0);
          if (d !== 0) return d;
          return String(p1.name ?? '').localeCompare(String(p2.name ?? ''));
        });

        return { category, products: orderedProducts };
      });

    return sorted;
  }, [productsState]);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className={homeStyles.container}>
      <header className={homeStyles.header}>
        <h1 className={homeStyles.title}>Inicio</h1>
        <p className={homeStyles.subtitle}>Explora productos por categoría, ordenados por calificación</p>
      </header>

      {categories.map(({ category, products: categoryProducts }) => (
        <section key={category} className={homeStyles.categorySection}>
          <div className={homeStyles.categoryHeader}>
            <h2 className={homeStyles.categoryTitle}>{category}</h2>
            <span className={homeStyles.categoryCount}>{categoryProducts.length} productos</span>
          </div>

          <div className={productListStyles.grid}>
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                category={product.category}
                rating={product.rating}
                price={product.price}
                stock={product.stock}
                image={product.image}
                description={product.description}
                onDetails={() => handleOpenDetails(product)}
              />
            ))}
          </div>
        </section>
      ))}

      <ProductDetailsModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseDetails}
      />
    </div>
  );
}

export default Home;
