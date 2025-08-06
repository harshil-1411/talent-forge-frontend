import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://talent-forge-backend.onrender.com/api",
  withCredentials: true,
});

// Add an interceptor to include the token in requests
newRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default newRequest;