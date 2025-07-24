import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-api-62yt.onrender.com",
});

export default api;
