import axios from "axios";

// ✅ Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", 
  withCredentials: false, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
