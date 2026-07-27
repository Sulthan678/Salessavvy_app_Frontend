import "./Product.css";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const openProduct = () => {
  navigate(`/product/${product.product_id}`);
};
    // console.log(product.images);
  return (
    
  <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="relative flex h-[480px] flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300">

    {/* Wishlist */}
    <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110">
      <Heart size={20} className="text-gray-500" />
    </button>

    {/* Product Image */}
  <div onClick={openProduct}
    className="flex h-65 cursor-pointer items-center justify-center overflow-hidden rounded-2xl">
        <img
        src={product.images?.[0]}
        alt={product.name}
        className="max-h-full max-w-full object-contain transition-transform duration-300 "
      />
    </div>

    <div className="mt-5 space-y-3">

      {/* Rating */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={11}
            className="fill-yellow-400 text-orange-400"
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">
          4.8
        </span>
    </div>

      {/* Product Name */}
      <h3 onClick={openProduct}
       className="mt-2 text-lg font-semibold leading-6 text-gray-900 line-clamp-2">
        {product.name}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-3">

        <span className="text-2xl font-bold text-indigo-600">
          ₹{product.price}
        </span>

        <span className="text-base text-gray-400 line-through">
          ₹{Math.round(product.price * 1.3)}
        </span>

    </div>

      {/* Button */}
      <button onClick={(e) => { e.stopPropagation();
              onAddToCart(product.product_id);
          }}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-2 font-medium text-white transition-all duration-300 hover:bg-indigo-700"
      >
        <ShoppingCart size={18} />
        Add to Cart
        </button>

    </div>

  </motion.div>
  );
}

export default ProductCard;