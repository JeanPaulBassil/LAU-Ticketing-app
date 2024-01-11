import axios, { AxiosInstance } from "axios";
import config from "../config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.backendUrl,
  timeout: 7000,
  withCredentials: true
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      // Handle session expiration here (e.g., show a notification to the user)
      // You can also redirect the user to the login page or perform other actions
      console.log("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
