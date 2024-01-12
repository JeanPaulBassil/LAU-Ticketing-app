import axios, { AxiosInstance, AxiosResponse } from "axios";
import config from "../config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.backendUrl,
  timeout: 7000,
  withCredentials: true
});


axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      // Handle session expiration here (e.g., show a notification to the user)
      // You can also redirect the user to the login page or perform other actions
      console.log("Session expired. Please log in again.");
      throw new Error("Session expired. Please log in again.");
    }
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred.');
    } else if (error.request) {
      throw new Error('Network error occurred.');
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
);

export default axiosInstance;
