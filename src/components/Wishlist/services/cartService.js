import API from "./api";

// Get cart count
export const getCartCount = () => {
  return API.get("/api/cart/items/count");
};

// Add product to cart
export const addToCart = (productId, quantity = 1) => {
  return API.post("/api/cart/add", {
    productId,
    quantity
  });
};