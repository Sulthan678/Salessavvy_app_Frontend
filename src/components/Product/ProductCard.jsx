import "./Product.css";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


    function ProductCard({ product, onAddToCart, showAddToCart = true, onClick }) {
    
    return (
    <motion.div
        onClick={() => onClick?.()}
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xl">

        {/* Product Image */}
      <div className="flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition duration-500 "
        />
      </div>

    <div className="mt-5 space-y-3">

        {/* Rating */}
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={12}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}

          <span className="ml-2 text-sm font-medium text-gray-500">
            4.8
          </span>
        </div>

        {/* Product Name */}
          <h3 className="text-lg font-semibold leading-7 text-gray-900 transition-colors duration-300 group-hover:text-indigo-600 line-clamp-2">
              {product.name}
          </h3>

          {/* Price */}
        <div className="flex items-end gap-3">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{product.price}
          </span>

          <span className="pb-1 text-sm text-gray-400 line-through">
            ₹{Math.round(product.price * 1.3)}
          </span>
        </div>

          {/* Button */}
          {showAddToCart && (
           <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.product_id);
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg active:scale-95">
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          )}
    </div>

  </motion.div>
  );
}

export default ProductCard;