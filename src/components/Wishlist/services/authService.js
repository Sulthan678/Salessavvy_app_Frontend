import API from "./api";

// Login user
export const loginUser = (data) => {
  return API.post("/api/auth/login", data).then((response) => {
    // Store token in localStorage
    if (response.data.data?.token) {
      localStorage.setItem("authToken", response.data.data.token);
    }
    return response;
  });
};

// Register user
export const registerUser = (data) => {
  return API.post("/api/users/register", data);
};

// Logout user
export const logoutUser = () => {
  return API.post("/api/auth/logout").then((response) => {
    // Remove token from localStorage
    localStorage.removeItem("authToken");
    return response;
  });
};
