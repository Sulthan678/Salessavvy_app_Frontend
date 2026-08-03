import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

function CartIcon({ count }) {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/cart")}
      className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-indigo-300 hover:shadow-md"
    >
      <ShoppingCart
        size={22}
        className="text-gray-700"
      />

      {count > 0 && (
    <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
        }}
        className="
            absolute
            -right-1
            -top-1
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-xs
            font-bold
            text-white
            ring-2
            ring-white
        "
    >
        {count}
    </motion.span>

      )}
    </motion.button>
  );
}

export default CartIcon;