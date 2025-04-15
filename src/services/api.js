// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available (for authenticated routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming you store the token in localStorage after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => api.post("/users/register", data);
export const loginUser = (data) => api.post("/users/login", data);
export const getUserProfile = (nickname) => api.get(`/users/profile/${nickname}`);
export const updateUserProfile = (nickname, data) => api.put(`/users/profile/${nickname}`, data);
export const createOrder = (data) => api.post("/orders/create", data); // New function to create an order

export default api;