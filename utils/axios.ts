import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import tough from 'tough-cookie';
import config from '../config';

// Create a new Axios instance
const axiosInstance = axios.create();

// Enable cookie jar support
axiosCookieJarSupport(axiosInstance);

// Create a new cookie jar
const cookieJar = new tough.CookieJar();

// Set the cookie jar for Axios
axiosInstance.defaults.jar = cookieJar;

// Set the default base URL
axiosInstance.defaults.baseURL = config.backendUrl;

// Define an interceptor to save cookies when received in responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Save cookies when received in responses
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      setCookieHeader.forEach((cookieString) => {
        cookieJar.setCookieSync(cookieString, response.config.url || '', {});
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the Axios instance for use in your application
export default axiosInstance;
