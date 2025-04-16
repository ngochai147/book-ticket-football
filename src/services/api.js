import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Ensure this matches your backend
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Request token:", token);
    console.log("Request URL:", config.url); // Log the requested URL
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("API response:", response.data);
    return response;
  },
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const registerUser = (data) => api.post("/users/register", data);
export const loginUser = (data) => api.post("/users/login", data);
export const getUserProfile = (nickname) => api.get(`/users/profile/${nickname}`);
export const updateUserProfile = (nickname, data) =>
  api.put(`/users/profile/${nickname}`, data);
export const createOrder = (data) => api.post("/orders/create", data);
export const createTicket = (ticketData) => api.post("/tickets/create", ticketData);
export const getMyTickets = () => api.get("/tickets/my-tickets");

export default api;