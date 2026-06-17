function OrderCard({ order }) {

  return (

    <div className="order-card">

      {/* ======================
          ORDER HEADER
      ====================== */}

      <div className="order-card-header">

        <h3>
          Order ID :
          {order.order_id}
        </h3>

      </div>



      {/* ======================
          ORDER BODY
      ====================== */}

      <div className="order-card-body">

        {/* PRODUCT IMAGE */}

        <img
          src={order.image_url}
          alt={order.name}
          className="order-product-image"
        />



        {/* PRODUCT DETAILS */}

        <div className="order-details">

          <h3 className="product-name">
            {order.name}
          </h3>

          <p>
            {order.description}
          </p>

          <h4>
            Quantity :
            {order.quantity}
          </h4>

          <h4>
            Price per Unit :
            ₹{order.price_per_unit}
          </h4>

          <h4>
            Total Price :
            ₹{order.total_price}
          </h4>

        </div>

      </div>

    </div>
  );
}

export default OrderCard;