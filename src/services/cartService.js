import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090",
  withCredentials: true
});

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