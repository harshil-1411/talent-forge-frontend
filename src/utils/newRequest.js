import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://talent-forge-backend.onrender.com/api",
  withCredentials: true,
});

newRequest.interceptors.request.use((config) => {
  const userStr = localStorage.getItem("currentUser");
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export default newRequest;