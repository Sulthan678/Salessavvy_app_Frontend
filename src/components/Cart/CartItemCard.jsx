import { motion } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  Star,
} from "lucide-react";

function CartItemCard({
  item,
  onRemove,
  onQuantityChange,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="mb-6 flex gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
    >
      {/* Image */}
      <div className="flex h-40 w-40 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-50">
        <img
          src={item.image_url}
          alt={item.name}
          className="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">

        <div>

          <div className="mb-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}

            <span className="ml-2 text-sm text-gray-500">
              4.8
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            {item.name}
          </h2>

          <p className="mt-2 line-clamp-2 text-gray-500">
            {item.description}
          </p>

          <h3 className="mt-4 text-2xl font-bold text-indigo-600">
            ₹{item.price_per_unit}
          </h3>

        </div>

        {/* Bottom */}
        <div className="mt-6 flex items-center justify-between">

          {/* Quantity */}

          <div className="flex items-center gap-3 rounded-full border border-gray-200 px-2 py-2">

            <button
              onClick={() =>
                onQuantityChange(
                  item.product_id,
                  item.quantity - 1
                )
              }
              className="rounded-full p-2 transition hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>

            <span className="w-8 text-center font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                onQuantityChange(
                  item.product_id,
                  item.quantity + 1
                )
              }
              className="rounded-full p-2 transition hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>

          </div>

          {/* Remove */}

          <button
            onClick={() =>
              onRemove(item.product_id)
            }
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={18} />

            Remove
          </button>

        </div>

      </div>

      {/* Total */}

      <div className="flex min-w-[120px] items-center justify-end">

        <span className="text-2xl font-bold text-gray-900">
          ₹{item.price_per_unit * item.quantity}
        </span>

      </div>

    </motion.div>
  );
}

export default CartItemCard;