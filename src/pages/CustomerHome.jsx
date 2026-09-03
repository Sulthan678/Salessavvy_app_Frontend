import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import CategoryNavigation from "../components/CategoryNavigation/CategoryNavigation";
import ProductList from "../components/Product/ProductList";
import Footer from "../components/Footer/Footer";
import { searchProducts, getSuggestions, getProductsByCategory } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useCart } from "../context/CartContext";
// import "./CustomerHome.css";

function CustomerHomePage() {

  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Shirts");
  const [username, setUsername] = useState("");
  const { cartCount, isLoading: isCartLoading, incrementCartCount } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);



  const fetchProducts = async (category = "Shirts") => {
    try {

      const res = await getProductsByCategory(category);

      setProducts(res.data.products || []);
      setUsername(res.data.user?.name || "Guest");

    } catch (err) {
      console.error(err);
    }
  };



//======================
  const fetchSearchProducts = async (keyword) => {

  try {

    const res = await searchProducts(keyword);

    setSelectedCategory("");

    setProducts(res.data.products || []);

    setSuggestions([]);

  } catch (err) {

    console.error(err);

  }

};

//======================
  const fetchSuggestions = async (keyword) => {

  if (!keyword.trim()) {
    setSuggestions([]);
    return;
  }

  try {

    const res = await getSuggestions(keyword);

    setSuggestions(res.data);

  } catch (err) {

    console.error(err);

  }

};
//======================

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

//======================

  const handleAddToCart = async (productId) => {
    try {

      await addToCart(productId);

      incrementCartCount();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="customer-home">
       <div className="min-h-screen bg-[#F5F7FB] flex flex-col">

      <Header
        cartCount={isCartLoading ? "..." : cartCount}
        username={username}
        onSearch={fetchSearchProducts}
        onSuggestion={fetchSuggestions}
        suggestions={suggestions}
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

    </div>
  );
}

export default CustomerHomePage;