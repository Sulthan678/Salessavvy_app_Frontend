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

  if (loading) {

    return <h2>Loading cart...</h2>;

  }



  /* =========================
     ERROR UI
  ========================= */

  if (error) {

    return <h2>{error}</h2>;

  }



  /* =========================
     MAIN UI
  ========================= */

  return (

    <div className="cart-page-wrapper">

      <Header
        username={username}
        cartCount={cartItems.length}
      />



      <div className="cart-page">

        {/* ======================
            CART ITEMS SECTION
        ====================== */}

        <div className="cart-items-section">

          <h2>Your Cart</h2>



          {cartItems.length === 0 ? (

            <h3>
              Your Cart is Empty.
              Add some items to get started!
            </h3>

          ) : (

            cartItems.map((item) => (

              <CartItemCard
                key={item.product_id}
                item={item}
                onRemove={handleRemoveItem}
                onQuantityChange={handleQuantityChange}
              />

            ))

          )}

        </div>



        {/* ======================
            ORDER SUMMARY
        ====================== */}

        {cartItems.length > 0 && (

          <OrderSummary
            subtotal={subtotal}
            totalProducts={cartItems.length}
            onCheckout={handleCheckout}
          />

        )}

      </div>



      <Footer />

    </div>
  );
}

export default CartPage;