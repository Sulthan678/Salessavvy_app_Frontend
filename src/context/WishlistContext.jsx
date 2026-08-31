import { createContext, useContext, useState, useEffect } from "react";
import WishlistService from "../services/WishlistService";

// Create the context
const WishlistContext = createContext();

// Create a provider component
export function WishlistProvider({ children }) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist count on mount
  useEffect(() => {
    fetchWishlistCount();
  }, []);

  // Fetch wishlist count
  const fetchWishlistCount = async () => {
    try {
      const response = await WishlistService.getWishlistCount();
      setWishlistCount(response.data || 0);
    } catch (error) {
      console.error("Failed to fetch wishlist count:", error);
    }
  };

  // Fetch all wishlist items
  const fetchWishlistItems = async () => {
    try {
      const response = await WishlistService.getWishlist();
      setWishlistItems(response.data.wishlist || []);
      setWishlistCount(response.data.wishlist.length);
    } catch (error) {
      console.error("Failed to fetch wishlist items:", error);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await WishlistService.toggleWishlist(productId);
      
      // Update items
      setWishlistItems((prev) =>
        prev.filter((item) => item.product_id !== productId)
      );
      
      // Update count immediately
      setWishlistCount((prev) => Math.max(0, prev - 1));
      
      return true;
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      return false;
    }
  };

  // Add item to wishlist
  const addToWishlist = async (productId) => {
    try {
      await WishlistService.toggleWishlist(productId);
      
      // Increment count immediately
      setWishlistCount((prev) => prev + 1);
      
      return true;
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      return false;
    }
  };

  const value = {
    wishlistCount,
    wishlistItems,
    setWishlistItems,
    fetchWishlistCount,
    fetchWishlistItems,
    removeFromWishlist,
    addToWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
