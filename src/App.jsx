import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CustomerHome from "./pages/CustomerHome";
import AdminHome from "./pages/AdminHome";
import CartPage from "./components/Cart/CartPage";
import OrdersPage from "./components/Orders/OrdersPage";


function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/customerhome" element={<CustomerHome />} />
      <Route path="/adminhome" element={<AdminHome />} />
      <Route path="/" element={<Login />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  );
}

export default App;