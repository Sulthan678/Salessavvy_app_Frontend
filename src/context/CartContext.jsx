import { createContext, useContext, useState, useEffect } from "react";
import { getCartCount } from "../services/cartService";

// Create the context
const CartContext = createContext();

// Create a provider component
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart count on mount
  useEffect(() => {
    fetchCartCount();
  }, []);

  // Fetch cart count
  const fetchCartCount = async () => {
    try {
      setIsLoading(true);
      const response = await getCartCount();
      setCartCount(typeof response.data === "number" ? response.data : 0);
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setCartCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Increment cart count (when item added)
  const incrementCartCount = () => {
    setCartCount((prev) => prev + 1);
  };

  // Decrement cart count (when item removed)
  const decrementCartCount = () => {
    setCartCount((prev) => Math.max(0, prev - 1));
  };

  // Reset cart count (when cart cleared)
  const resetCartCount = () => {
    setCartCount(0);
  };

  const value = {
    cartCount,
    isLoading,
    fetchCartCount,
    incrementCartCount,
    decrementCartCount,
    resetCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
