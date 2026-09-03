import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CustomerHome from "./pages/CustomerHome";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminHome from "./pages/AdminHome";
import CartPage from "./components/Cart/CartPage";
import OrdersPage from "./components/Orders/OrdersPage";
import OrderDetailsPage from "./components/Orders/OrderDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";


function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />}/>
        <Route path="/wishlist" element={<WishlistPage />}/>
      </Routes>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;