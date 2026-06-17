import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090",
  withCredentials: true
});

export const getAllProducts = () => {
  return API.get("/api/products");
};

export const getProductsByCategory = (category) => {
  return API.get(`/api/products?category=${category}`);
};