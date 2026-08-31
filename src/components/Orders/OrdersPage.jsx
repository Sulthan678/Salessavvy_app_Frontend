import { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import OrderCard from "./OrderCard";
import OrderDetailsPage from "./OrderDetailsPage";
import EmptyOrders from "./EmptyOrders";
import { fetchUserOrders } from "../../services/orderService";
import "./Orders.css";

function OrdersPage() {

  /* =========================
     STATES
  ========================= */

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [cartCount, setCartCount] = useState(0);

  const [username, setUsername] = useState("");

  const [cartError, setCartError] = useState(false);

  const [isCartLoading, setIsCartLoading] =
    useState(true);



  /* =========================
     FETCH ORDERS
  ========================= */

  const fetchOrders = async () => {

    try {

      const response = await fetchUserOrders();

      console.log("ORDERS:", response.data);

      setOrders(response.data.products || []);

      setUsername(
        response.data.username || "Guest"
      );

    } catch (err) {

      console.error(err);

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };



  /* =========================
     FETCH CART COUNT
  ========================= */

  const fetchCartCount = async () => {

    setIsCartLoading(true);

    try {

      const response = await fetch(

        `http://localhost:9090/api/cart/items/count?username=${username}`,

        {
          credentials: "include"
        }
      );



      if (!response.ok) {

        throw new Error(
          "Failed to fetch cart count"
        );
      }



      const count =
        await response.json();

      setCartCount(count);

      setCartError(false);



    } catch (error) {

      console.error(error);

      setCartError(true);

    } finally {

      setIsCartLoading(false);

    }
  };



  /* =========================
     FETCH ON LOAD
  ========================= */

  useEffect(() => {

    fetchOrders();

  }, []);



  /* =========================
     FETCH CART COUNT
  ========================= */

  useEffect(() => {

    if (username) {

      fetchCartCount();
    }

  }, [username]);



  /* =========================
     MAIN UI
  ========================= */

  return (

    <div className="orders-page-wrapper">

      {/* ======================
          HEADER
      ====================== */}

      <Header

        cartCount={

          isCartLoading

            ? "..."

            : cartError

            ? "Error"

            : cartCount
        }

        username={username}

      />



      {/* ======================
          MAIN CONTENT
      ====================== */}

      <main className="mx-auto min-h-[70vh] max-w-7xl px-6 py-10">

  {/* Header */}

  <div className="mb-10 flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-gray-900">
        My Orders
      </h1>

      <p className="mt-2 text-gray-500">
        Track your purchases and view your order history.
      </p>

    </div>

    {!loading && !error && orders.length > 0 && (

      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-3">

        <p className="text-sm text-indigo-600">
          Total Orders
        </p>

        <h2 className="text-2xl font-bold text-indigo-700">
          {orders.length}
        </h2>

      </div>

    )}

  </div>

  {/* Loading */}

  {loading && (

    <div className="py-24 text-center text-lg text-gray-500">
      Loading your orders...
    </div>

  )}

  {/* Error */}

  {!loading && error && (

    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">

      {error}

    </div>

  )}

  {/* Empty */}

  {!loading &&
    !error &&
    orders.length === 0 && (

      <EmptyOrders />

  )}

  {/* Orders */}

  {!loading &&
    !error &&
    orders.length > 0 && (

      <div className="grid gap-6">

        {orders.map((order) => (

          <OrderCard
            key={order.order_id}
            order={order}
          />

        ))}

      </div>

  )}

</main>



      {/* ======================
          FOOTER
      ====================== */}

      <Footer />

    </div>
  );
}

export default OrdersPage;