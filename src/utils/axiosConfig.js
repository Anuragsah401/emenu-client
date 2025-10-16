import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // use the environment variable
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // only if your backend uses cookies
});

// Optional: Add request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if using JWT stored in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle 401 errors globally here
    return Promise.reject(error);
  }
);

export default api;
