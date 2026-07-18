import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import CategoryNavigation from "../components/CategoryNavigation/CategoryNavigation";
import ProductList from "../components/Product/ProductList";
import Footer from "../components/Footer/Footer";
import "./CustomerHome.css";

function CustomerHomePage() {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Shirts");
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (username) {
      fetchCartCount();
    }
  }, [username]);

  const fetchProducts = async (category = "Shirts") => {
    try {

      const res = await fetch(
        `http://localhost:9090/api/products?category=${category}`,
        { credentials: "include" }
      );

      const data = await res.json();

      setProducts(data.products || []);
      setUsername(data.user?.name || "Guest");

    } catch (err) {
      console.error(err);
    }
  };



//======================
  const fetchSearchProducts = async (keyword) => {

  try {

    const res = await fetch(

      `http://localhost:9090/api/products/search?keyword=${keyword}`,

      {
        credentials: "include"
      }

    );

    if (!res.ok) {
      throw new Error("Failed to search products");
    }

    const data = await res.json();

    setProducts(data.products || []);

  } catch (err) {

    console.error(err);

  }

};

//======================

  const fetchCartCount = async () => {
  setIsCartLoading(true);

  try {
    const res = await fetch(
      `http://localhost:9090/api/cart/items/count?username=${username}`,
      { credentials: "include" }
    );

    // ❗ ADD THIS CHECK
    if (!res.ok) {
      setCartCount(0); // fallback
      return;
    }

    const count = await res.json();

    // ❗ Ensure it's number
    setCartCount(typeof count === "number" ? count : 0);

  } catch (err) {
    console.error(err);
    setCartCount(0);
  } finally {
    setIsCartLoading(false);
  }
};    

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  const handleAddToCart = async (productId) => {
    try {

      await fetch("http://localhost:9090/api/cart/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, productId })
      });

      fetchCartCount();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="customer-home">

      <Header
        cartCount={isCartLoading ? "..." : cartCount}
        username={username}
        onSearch={fetchSearchProducts}
      />

      <main className="customer-content">

      <CategoryNavigation 
      selectedCategory={selectedCategory} 
      onCategoryClick={handleCategoryClick} />

      <ProductList
        products={products}
        onAddToCart={handleAddToCart}
        />

      </main>

      <Footer />

    </div>
  );
}

export default CustomerHomePage;