import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090",
  withCredentials: true
});

// PRODUCT OPERATIONS
export const addProduct = (productData) => {
  return API.post("/admin/products/add", productData);
};

export const deleteProduct = (productId) => {
  return API.delete("/admin/products/delete", {
    data: { productId }
  });
};

// USER OPERATIONS
export const getUserById = (userId) => {
  return API.get(`/admin/user/getbyid?userId=${userId}`);
};

export const updateUser = (userData) => {
  return API.put("/admin/user/modify", userData);
};

// BUSINESS ANALYTICS
export const getMonthlyBusiness = (month, year) => {
  return API.get(`/admin/business/monthly?month=${month}&year=${year}`);
};
