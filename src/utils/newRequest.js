import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// Add an interceptor to include the token in requests
// newRequest.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });om "axios";


// Add an interceptor to include the token in requests
// newRequest.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default newRequest;