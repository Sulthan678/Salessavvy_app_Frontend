import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  CreditCard,
  Hash,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { motion } from "framer-motion";

import { useLocation, useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function OrderDetailsPage() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const order = state?.order;

  // If user refreshes the page or directly visits the URL
  if (!order) {
    return (
      <div>

        <Header />

        <main
          style={{
            textAlign: "center",
            padding: "40px"
          }}
        >

          <h2>
            Order details not found.
          </h2>

          <button
            onClick={() => navigate("/orders")}
          >
            Back to Orders
          </button>

        </main>

        <Footer />

      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-50">

    <Header />

    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Page Heading */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-900">
          Order Details
        </h1>

        <p className="mt-2 text-gray-500">
          Review your order information and delivery status.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
        >

          <div className="flex gap-8">

            {/* Product */}

            <div className="flex h-60 w-60 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-50">

              <img
                src={order.image_url}
                alt={order.name}
                className="max-h-full max-w-full object-contain"
              />

            </div>

            {/* Details */}

            <div className="flex-1">

              <h2 className="text-3xl font-bold text-gray-900">
                {order.name}
              </h2>

              <p className="mt-3 text-gray-500">
                {order.description}
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                <div>

                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="flex items-center gap-2 font-semibold">

                    <Hash size={16} />

                    {order.order_id}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Quantity
                  </p>

                  <p className="font-semibold">
                    {order.quantity}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Unit Price
                  </p>

                  <p className="font-semibold">
                    ₹{Number(order.price_per_unit).toFixed(2)}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="text-2xl font-bold text-indigo-600">
                    ₹{Number(order.total_price).toFixed(2)}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Ordered On
                  </p>

                  <p className="flex items-center gap-2 font-semibold">

                    <Calendar size={16} />

                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Status
                  </p>

                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">

                    Delivered

                  </span>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >

          {/* Tracking */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <h3 className="mb-6 text-xl font-semibold">
              Order Tracking
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <CheckCircle2
                  className="text-green-600"
                />

                <span>Order Placed</span>

              </div>

              <div className="flex items-center gap-4">

                <Truck
                  className="text-green-600"
                />

                <span>Shipped</span>

              </div>

              <div className="flex items-center gap-4">

                <Package
                  className="text-green-600"
                />

                <span>Delivered</span>

              </div>

            </div>

          </div>

          {/* Payment */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-xl font-semibold">
              Payment
            </h3>

            <div className="flex items-center gap-3">

              <CreditCard
                className="text-indigo-600"
              />

              <div>

                <p className="font-medium">
                  Razorpay
                </p>

                <p className="text-sm text-gray-500">
                  Payment Successful
                </p>

              </div>

            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-green-50 p-4">

              <ShieldCheck
                className="text-green-600"
              />

              <div>

                <p className="font-medium text-green-700">
                  Secure Payment
                </p>

                <p className="text-sm text-green-600">
                  Verified via Razorpay
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-4">

        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-6 py-3 font-medium transition hover:bg-gray-100"
        >

          <ArrowLeft size={18} />

          Back to Orders

        </button>

        <button
          onClick={() =>
            navigate("/customerhome")
          }
          className="rounded-2xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          Continue Shopping
        </button>

      </div>

    </main>

    <Footer />

  </div>
);
}

export default OrderDetailsPage;