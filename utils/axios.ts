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
    console.log(error);
    if (error.response && error.response.status === 403) {
      // Handle session expiration here (e.g., show a notification to the user)
      // You can also redirect the user to the login page or perform other actions
      console.log("Session expired. Please log in again.");
      throw new Error("Session expired. Please log in again.");
    }
    // else if (error.request) {
    //   throw new Error('Network error occurred.');
    // } else {
    //   throw new Error('An unknown error occurred.');
    // }
    return error ;
  }
);

export default axiosInstance;
