import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-api-62yt.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
