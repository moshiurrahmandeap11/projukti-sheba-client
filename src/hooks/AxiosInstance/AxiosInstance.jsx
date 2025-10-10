import axios from "axios";

//  Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", 
  withCredentials: false, 
  headers: {
    "Content-Type": "application/json",
  },
});


// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
