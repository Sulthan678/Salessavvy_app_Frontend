import { useNavigate } from "react-router-dom";

function CartIcon({ count }) {

  const navigate = useNavigate();

  return (

    <div
      onClick={() => navigate("/cart")}
      style={{ cursor: "pointer" }}
    >

      🛒 {typeof count === "number" ? count : 0}

    </div>
  );
}

export default CartIcon;