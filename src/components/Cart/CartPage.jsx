import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import CartItemCard from "./CartItemCard";
import OrderSummary from "./OrderSummary";

import "./Cart.css";

function CartPage() {

  /* =========================
     STATES
  ========================= */

  const [cartItems, setCartItems] = useState([]);

  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  /* =========================
     NAVIGATE
  ========================= */

  const navigate = useNavigate();



  /* =========================
     FETCH CART ITEMS
  ========================= */

  const fetchCartItems = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:9090/api/cart/items",
        {
          credentials: "include"
        }
      );



      if (!response.ok) {

        throw new Error("Failed to fetch cart items");

      }



      const data = await response.json();

      console.log("CART DATA:", data);



      setCartItems(
        data?.cart?.products || []
      );



      setUsername(
        data?.username || ""
      );



    } catch (error) {

      console.error(error);

      setError("Failed to load cart items");

    } finally {

      setLoading(false);

    }
  };



  /* =========================
     REMOVE ITEM
  ========================= */

  const handleRemoveItem = async (productId) => {

    try {

      const response = await fetch(

        "http://localhost:9090/api/cart/delete",

        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify({
            username,
            productId
          })
        }
      );



      if (!response.ok) {

        throw new Error("Failed to remove item");

      }



      // UPDATE UI

      setCartItems((prevItems) =>

        prevItems.filter(

          (item) =>
            item.product_id !== productId
        )
      );



    } catch (error) {

      console.error(error);

    }
  };



  /* =========================
     UPDATE QUANTITY
  ========================= */

  const handleQuantityChange = async (

    productId,
    newQuantity

  ) => {

    try {

      // REMOVE ITEM IF QUANTITY <= 0

      if (newQuantity <= 0) {

        handleRemoveItem(productId);

        return;
      }



      // MAX LIMIT

      if (newQuantity > 10) {

        alert("Maximum quantity reached");

        return;
      }



      const response = await fetch(

        "http://localhost:9090/api/cart/update",

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify({

            username,

            productId,

            quantity: newQuantity

          })
        }
      );



      if (!response.ok) {

        throw new Error("Failed to update quantity");

      }



      // UPDATE UI

      setCartItems((prevItems) =>

        prevItems.map((item) =>

          item.product_id === productId

            ? {

                ...item,

                quantity: newQuantity,

                total_price:
                  item.price_per_unit * newQuantity
              }

            : item
        )
      );



    } catch (error) {

      console.error(error);

    }
  };



  /* =========================
     CHECKOUT
  ========================= */

  const handleCheckout = async () => {

    try {

      const requestBody = {

        totalAmount: subtotal,

        cartItems: cartItems.map((item) => ({

          productId: item.product_id,

          quantity: item.quantity,

          price: item.price_per_unit

        }))
      };



      /* =========================
         CREATE ORDER
      ========================= */

      const response = await fetch(

        "http://localhost:9090/api/payment/create",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify(requestBody)
        }
      );



      if (!response.ok) {

        throw new Error(
          await response.text()
        );
      }



      const razorpayOrderId =
        await response.text();



      /* =========================
         RAZORPAY OPTIONS
      ========================= */

      const options = {

        key: "rzp_test_LqWBBDbgwot5lh",

        amount: subtotal * 100,

        currency: "INR",

        name: "SalesSavvy",

        description: "Order Payment",

        order_id: razorpayOrderId,



        /* =====================
           PAYMENT SUCCESS
        ===================== */

        handler: async function (response) {

          try {

            const verifyResponse = await fetch(

              "http://localhost:9090/api/payment/verify",

              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({

                  razorpayOrderId:
                    response.razorpay_order_id,

                  razorpayPaymentId:
                    response.razorpay_payment_id,

                  razorpaySignature:
                    response.razorpay_signature
                })
              }
            );



            const result =
              await verifyResponse.text();



            if (verifyResponse.ok) {

              alert(
                "Payment verified successfully!"
              );

              navigate("/customerhome");

            } else {

              alert(
                "Payment verification failed: " +
                result
              );
            }

          } catch (error) {

            console.error(error);

            alert(
              "Payment verification failed"
            );
          }
        },



        /* =====================
           PREFILL
        ===================== */

        prefill: {

          name: username,

          email: "test@example.com",

          contact: "9999999999"
        },



        /* =====================
           THEME
        ===================== */

        theme: {

          color: "#0d3b66"
        }
      };



      /* =========================
         OPEN RAZORPAY
      ========================= */

      const rzp =
        new window.Razorpay(options);

      rzp.open();



    } catch (error) {

      console.error(error);

      alert(
        "Payment failed. Please try again."
      );
    }
  };



  /* =========================
     FETCH ON PAGE LOAD
  ========================= */

  useEffect(() => {

    fetchCartItems();

  }, []);



  /* =========================
     SUBTOTAL CALCULATION
  ========================= */

  const subtotal = cartItems.reduce(

    (sum, item) =>

      sum +
      item.price_per_unit * item.quantity,

    0
  );



  /* =========================
     LOADING UI
  ========================= */

  return (
  <div className="min-h-screen bg-gray-50">

    <Header
      username={username}
      cartCount={cartItems.length}
    />

    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Page Heading */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your items before checkout.
          </p>

        </div>

        {cartItems.length > 0 && (
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-3">

            <p className="text-sm text-indigo-600">
              Total Items
            </p>

            <h2 className="text-2xl font-bold text-indigo-700">
              {cartItems.length}
            </h2>

          </div>
        )}

      </div>

      {/* Loading */}

      {loading && (
        <div className="py-32 text-center text-lg text-gray-500">
          Loading your cart...
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Main Content */}

      {!loading && !error && (

        cartItems.length === 0 ? (

          <div className="flex flex-col items-center rounded-3xl bg-white py-24 shadow-sm">

            <div className="mb-6 text-7xl">
              🛒
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-3 text-gray-500">
              Looks like you haven't added anything yet.
            </p>

            <button
              onClick={() => navigate("/customerhome")}
              className="mt-8 rounded-2xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="grid gap-10 lg:grid-cols-[2fr_420px]">

            {/* Left */}

            <div>

              {cartItems.map((item) => (

                <CartItemCard
                  key={item.product_id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onQuantityChange={handleQuantityChange}
                />

              ))}

            </div>

            {/* Right */}

            <OrderSummary
              subtotal={subtotal}
              totalProducts={cartItems.length}
              onCheckout={handleCheckout}
            />

          </div>

        )

      )}

    </main>

    <Footer />

  </div>
);
}

export default CartPage;