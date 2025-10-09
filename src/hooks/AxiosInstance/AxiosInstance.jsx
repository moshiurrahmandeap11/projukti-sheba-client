import axios from "axios";

// ✅ Create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://projukti-sheba-server.onrender.com", 
  withCredentials: false, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
