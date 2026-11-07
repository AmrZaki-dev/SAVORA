import axios from "axios";
import toast from "react-hot-toast";

const PUBLIC_AUTH_PATHS = ["/login", "/register"];

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://savorarestaurant-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the current JWT to every request when the user is logged in.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.response?.data?.error ||
  error.message ||
  "An unexpected error occurred.";

// Centralize API error handling so all screens behave consistently.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getErrorMessage(error);

    if (!error._toasted) {
      toast.error(message);
      error._toasted = true;
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Avoid redirect loops on auth pages.
      if (!PUBLIC_AUTH_PATHS.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
