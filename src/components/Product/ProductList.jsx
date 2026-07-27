// import "./Product.css";
import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {

  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}

    </div>
  );
}

export default ProductList;