import { motion } from "framer-motion";
import { ChevronRight, Package, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case "SUCCESS":
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Delivered
          </span>
        );

      case "SHIPPED":
        return (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Shipped
          </span>
        );

      case "PROCESSING":
        return (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            Processing
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {order.status}
          </span>
        );
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() =>
        navigate(`/orders/${order.order_id}`, {
          state: { order },
        })
      }
      className="group cursor-pointer rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xl"
    >
      <div className="flex gap-6">

        {/* Product Image */}

        <div className="flex h-36 w-36 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-50">

          <img
            src={order.image_url}
            alt={order.name}
            className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
          />

        </div>

        {/* Product Info */}

        <div className="flex flex-1 flex-col justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2">

              <Package size={16} className="text-indigo-600" />

              <span className="text-sm text-gray-500">
                Order #{order.order_id}
              </span>

            </div>

            <h2 className="text-2xl font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
              {order.name}
            </h2>

            <div className="mt-2 flex items-center gap-1">

              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

              <span className="ml-2 text-sm text-gray-500">
                4.8
              </span>

            </div>

            <p className="mt-3 line-clamp-2 text-gray-500">
              {order.description}
            </p>

          </div>

          {/* Bottom */}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

            <div className="flex flex-wrap items-center gap-6">

              <div>
                <p className="text-sm text-gray-500">
                  Ordered On
                </p>

                <p className="font-medium">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Quantity
                </p>

                <p className="font-medium">
                  {order.quantity}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total
                </p>

                <p className="text-xl font-bold text-indigo-600">
                  ₹{Number(order.total_price).toFixed(2)}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              {getStatusBadge(order.status)}

              <div className="flex items-center gap-1 font-medium text-indigo-600">

                View Details

                <ChevronRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default OrderCard;