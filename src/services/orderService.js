import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090",
  withCredentials: true
});

// Payment/Order Creation
export const createPayment = (paymentData) => {
  return API.post("/api/payment/create", paymentData);
};

// Payment Verification
export const verifyPayment = (verificationData) => {
  return API.post("/api/payment/verify", verificationData);
};

// Fetch user orders
export const fetchUserOrders = () => {
  return API.get("/api/orders");
};

// Get order details
export const getOrderDetails = (orderId) => {
  return API.get(`/api/orders/${orderId}`);
};

// Cancel order
export const cancelOrder = (orderId) => {
  return API.put(`/api/orders/${orderId}/cancel`);
};
