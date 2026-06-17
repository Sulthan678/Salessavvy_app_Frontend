function CartItemCard({

  item,
  onRemove,
  onQuantityChange

}) {

  return (

    <div className="cart-item-card">

      <img
        src={item.image_url}
        alt={item.name}
        className="cart-item-image"
      />



      <div className="cart-item-details">

        <h3>{item.name}</h3>

        <p>{item.description}</p>

        <h4>₹ {item.price_per_unit}</h4>



        {/* ======================
            QUANTITY CONTROLS
        ====================== */}

        <div className="quantity-controls">

          <button
            onClick={() =>

              onQuantityChange(
                item.product_id,
                item.quantity - 1
              )
            }
          >
            -
          </button>



          <span>{item.quantity}</span>



          <button
            onClick={() =>

              onQuantityChange(
                item.product_id,
                item.quantity + 1
              )
            }
          >
            +
          </button>

        </div>



        {/* ======================
            REMOVE BUTTON
        ====================== */}

        <button
          className="remove-btn"
          onClick={() =>
            onRemove(item.product_id)
          }
        >
          Remove
        </button>

      </div>



      {/* ======================
          ITEM TOTAL
      ====================== */}

      <div className="item-total">

        ₹ {item.price_per_unit * item.quantity}

      </div>

    </div>
  );
}

export default CartItemCard;