import styles from '../styles/CategoryProducts.module.css';

function CategoryProducts({ category, onBack }) {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <button type="button" className={styles.btnBack} onClick={onBack}>
          Volver
        </button>
        <h1 className={styles.title}>{category ?? 'Categoría'}</h1>
      </header>

      <p className={styles.subtitle}>Listado de productos por categoría (pendiente).</p>
    </section>
  );
}

export default CategoryProducts;
