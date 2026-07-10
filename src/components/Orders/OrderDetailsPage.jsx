import { useLocation, useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./OrderDetailsPage.css";

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

    <div className="order-details-page">

      <Header />

      <main className="order-details-container">

        <h1>
          Order Details
        </h1>

        <div className="order-details-card">

          <img
            src={order.image_url}
            alt={order.name}
            className="details-image"
          />

          <div className="details-info">

            <h2>
              {order.name}
            </h2>

            <p>
              {order.description}
            </p>

            <h3>
              Order ID :
              {" "}
              {order.order_id}
            </h3>

            <h3>
              Quantity :
              {" "}
              {order.quantity}
            </h3>

            <h3>
              Price :
              {" "}
              ₹{order.price_per_unit}
            </h3>

            <h3>
              Total :
              {" "}
              ₹{order.total_price}
            </h3>

            <h3>
              Ordered On :
              {" "}
              {new Date(order.created_at).toLocaleDateString()}
            </h3>

            <h3>
              Status :
              {" "}
              {order.status}
            </h3>

          </div>

        </div>

        {/* ======================
            ORDER TRACKING
        ====================== */}

        <div className="tracking-card">

          <h2>
            Order Tracking
          </h2>

          <div className="tracking-step completed">
            ✔ Order Placed
          </div>

          <div className="tracking-step completed">
            ✔ Shipped
          </div>

          <div
            className={
              order.status === "SUCCESS"
                ? "tracking-step completed"
                : "tracking-step"
            }
          >
            {order.status === "SUCCESS"
              ? "✔ Delivered"
              : "○ Delivered"}
          </div>

        </div>

        <button
          className="back-button"
          onClick={() => navigate("/orders")}
        >
          ← Back to Orders
        </button>

      </main>

      <Footer />

    </div>

  );
}

export default OrderDetailsPage;