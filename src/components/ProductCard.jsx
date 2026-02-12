function ProductCard({ name, category, price, image, description }) {
  return (
    <article className="productCard">
      <img src={image} alt={name} className="productImage" />
      <div className="productInfo">
        <span className="productCategory">{category}</span>
        <h3 className="productName">{name}</h3>
        <p className="productDescription">{description}</p>
        <div className="productFooter">
          <span className="productPrice">${price.toFixed(2)}</span>
          <button className="btnLike">❤️ Me gusta</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
