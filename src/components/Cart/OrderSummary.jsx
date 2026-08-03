import {
  CreditCard,
  ShieldCheck,
  Truck,
  BadgePercent,
  Wallet,
} from "lucide-react";

function OrderSummary({
  subtotal,
  totalProducts,
  onCheckout,
}) {
  const shipping = subtotal >= 1000 ? 0 : 200;
  const discount = subtotal >= 5000 ? 250 : 0;

  const total = subtotal + shipping - discount;

  return (
    <div className="sticky top-28 h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Heading */}

      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Order Summary
      </h2>

      {/* Price Details */}

      <div className="space-y-4">

        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span className="flex items-center gap-2">
            <Truck size={17} />
            Shipping
          </span>

          {shipping === 0 ? (
            <span className="font-semibold text-green-600">
              FREE
            </span>
          ) : (
            <span className="font-semibold text-gray-900">
              ₹{shipping}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span className="flex items-center gap-2">
            <BadgePercent size={17} />
            Discount
          </span>

          <span className="font-semibold text-green-600">
            -₹{discount}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Total Products</span>

          <span className="font-semibold text-gray-900">
            {totalProducts}
          </span>
        </div>

      </div>

      <hr className="my-6" />

      {/* Grand Total */}

      <div className="flex items-center justify-between">

        <span className="text-xl font-semibold">
           ₹{total.toFixed(2)}
        </span>

        <span className="text-3xl font-bold text-indigo-600">
           ₹{total.toFixed(2)}
        </span>

      </div>

      {/* Secure Checkout */}

      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-green-50 p-4">

        <ShieldCheck
          className="text-green-600"
          size={22}
        />

        <div>

          <p className="font-medium text-green-700">
            Secure Checkout
          </p>

          <p className="text-sm text-green-600">
            Protected by Razorpay SSL Encryption
          </p>

        </div>

      </div>

      {/* Payment Methods */}

      {/* <div className="mt-6">

        <h3 className="mb-3 font-semibold text-gray-800">
          Accepted Payments
        </h3> */}

        {/* <div className="grid grid-cols-3 gap-3">

          <div className="rounded-xl border p-3 text-center text-sm font-medium">
            💳 Visa
          </div>

          <div className="rounded-xl border p-3 text-center text-sm font-medium">
            💳 Mastercard
          </div>

          <div className="rounded-xl border p-3 text-center text-sm font-medium">
            🇮🇳 RuPay
          </div>

          <div className="rounded-xl border p-3 text-center text-sm font-medium">
            📱 UPI
          </div>

          <div className="rounded-xl border p-3 text-center text-sm font-medium">
            <Wallet
              size={16}
              className="mx-auto mb-1"
            />
            Wallet
          </div>

          <div className="rounded-xl border p-3 text-center text-sm font-medium">
            Razorpay
          </div>

        </div> */}

      {/* </div> */}

      {/* Checkout Button */}

      <button
        onClick={onCheckout}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
      >
        <CreditCard size={20} />
        Proceed to Checkout
      </button>

      <p className="mt-4 text-center text-xs text-gray-500">
        Taxes calculated at checkout. Demo payment methods are shown for
        presentation; payments are processed through Razorpay.
      </p>

    </div>
  );
}

export default OrderSummary;