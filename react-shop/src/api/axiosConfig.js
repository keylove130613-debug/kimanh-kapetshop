import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Lỗi từ API:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
