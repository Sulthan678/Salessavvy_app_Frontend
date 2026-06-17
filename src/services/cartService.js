import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090",
  withCredentials: true
});

export const getCartCount = () => {
  return API.get("/api/cart/items/count");
};