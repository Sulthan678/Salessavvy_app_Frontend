function OrderSummary({

  subtotal,
  totalProducts,
  onCheckout

}) {

  const shipping = 200;

  const overallTotal = subtotal + shipping;



  return (

    <div className="order-summary">

      <h2>Order Summary</h2>



      <p>
        Subtotal:
        <span>₹ {subtotal}</span>
      </p>



      <p>
        Shipping:
        <span>₹ {shipping}</span>
      </p>



      <p>
        Total Products:
        <span>{totalProducts}</span>
      </p>



      <hr />



      <h3>
        Total:
        <span>₹ {overallTotal}</span>
      </h3>



      <button className="checkout-btn" onClick={onCheckout}>
        Proceed to Checkout
      </button>

    </div>
  );
}

export default OrderSummary;