import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // Change this to your backend base URL if needed
  withCredentials: true, // Optional: for cookies/auth
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
