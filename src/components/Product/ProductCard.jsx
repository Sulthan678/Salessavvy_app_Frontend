import "./Product.css";
function ProductCard({ product, onAddToCart }) {
  console.log(product.images);
  return (
    <div className="product-card">

      <img
          src={product.images?.[0]}
          alt={product.name}
          className="product-image"
      />

      <h3>{product.name}</h3>

      <p>₹ {product.price}</p>

      <button onClick={() => onAddToCart(product.product_id)}>
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;