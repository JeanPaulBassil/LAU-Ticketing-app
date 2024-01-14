import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import config from "../config";
import { navigate } from '../App';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.backendUrl,
  timeout: 100000,
  // should be max of 7
  withCredentials: true
});


axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.log(error);
    if (error.response?.status === 403) {
      // Handle 403 Forbidden response
      console.log("Access denied. Navigating to the login screen.");
      navigate('Login'); // Replace with your login screen name
    } else {
      // For all other errors, rethrow the error
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
