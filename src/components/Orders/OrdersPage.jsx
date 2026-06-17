import { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import OrderCard from "./OrderCard";
import EmptyOrders from "./EmptyOrders";
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

      const response = await fetch(

        "http://localhost:9090/api/orders",

        {
          credentials: "include"
        }
      );



      if (!response.ok) {

        throw new Error(
          "Failed to fetch orders"
        );
      }



      const data = await response.json();

      console.log("ORDERS:", data);



      setOrders(data.products || []);

      setUsername(
        data.username || "Guest"
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

      <main className="orders-main-content">

        <h1 className="orders-title">
          Your Orders
        </h1>



        {/* LOADING */}

        {loading && (

          <p>
            Loading orders...
          </p>
        )}



        {/* ERROR */}

        {error && (

          <p className="error-message">
            {error}
          </p>
        )}



        {/* EMPTY ORDERS */}

        {!loading &&
          !error &&
          orders.length === 0 && (

          

            <EmptyOrders />

          
        )}



        {/* ORDERS LIST */}

        {!loading &&
          !error &&
          orders.length > 0 && (

          <div className="orders-list">

            {orders.map((order, index) => (

              <OrderCard

                key={index}

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