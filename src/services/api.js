import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data) => api.post("/users/register", data);
export const loginUser = (data) => api.post("/users/login", data);
export const getUserProfile = (nickname) => api.get(`/users/profile/${nickname}`);
export const updateUserProfile = (nickname, data) => api.put(`/users/profile/${nickname}`, data);

export default api;