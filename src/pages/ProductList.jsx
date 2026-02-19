import { useState } from 'react';

import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { products } from '../data/products';
import styles from '../styles/ProductList.module.css';

function ProductList() {
  const [productsState] = useState(products);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Productos Informáticos</h1>
        <p className={styles.subtitle}>
          Encuentra los mejores productos de tecnología para tu setup
        </p>
      </header>

      <ProductForm onSubmit={() => {}} />

      <div className={styles.grid}>
        {productsState.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            stock={product.stock}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
