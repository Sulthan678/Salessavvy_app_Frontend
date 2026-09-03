import API from "./api";

export const getAllProducts = () => {
  return API.get("/api/products");
};

export const getProductsByCategory = (category) => {
  return API.get(`/api/products?category=${category}`);
};

// SEARCH PRODUCTS
export const searchProducts = (keyword) => {
  return API.get(`/api/products/search?keyword=${keyword}`);
};

// SEARCH SUGGESTIONS
export const getSuggestions = (keyword) => {
  return API.get(`/api/products/suggestions?keyword=${keyword}`);
};

// GET PRODUCT BY ID
export const getProductById = (productId) => {
  return API.get(`/api/products/${productId}`);
};

// GET SIMILAR PRODUCT BY ID
export const getSimilarProducts = (productId) =>
    API.get(`/api/products/${productId}/similar`);