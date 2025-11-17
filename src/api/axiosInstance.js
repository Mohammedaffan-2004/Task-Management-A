import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response?.status === 401) {
   
      localStorage.removeItem("user");
     
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;