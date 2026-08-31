import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090",
  withCredentials: true // IMPORTANT for cookies
});

// Login user
export const loginUser = (data) => {
  return API.post("/api/auth/login", data);
};

// Register user
export const registerUser = (data) => {
  return API.post("/api/users/register", data);
};

// Logout user
export const logoutUser = () => {
  return API.post("/api/auth/logout");
};
