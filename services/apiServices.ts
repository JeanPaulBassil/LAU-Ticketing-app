import config from '../config';
import axios, { AxiosResponse } from 'axios';
import { saveCookie } from './storageService';

interface LoginData {
    name: string;
    password: string;
}

interface LoginResponse {
    message: string;
    statusCode: number;
}

const baseURL: string = `${config.backendUrl}/auth/login`;

const apiService = {
    login: async (data: LoginData): Promise<LoginResponse> => {
        try {
            const response: AxiosResponse<LoginResponse | any> = await axios.post<LoginResponse>(baseURL, data, {
                withCredentials: true
            });

            const cookieHeader: string[] | undefined = response.headers['set-cookie'];
            if(cookieHeader) {
                const cookieValue: string = cookieHeader[0].split(';')[0].split('=')[1];
                await saveCookie(cookieValue);
            }
            return response.data;
        } catch (error) {
            if(axios.isAxiosError(error)) {
                console.log(error.message)
                if(error.response) 
                    throw new Error(error.response.data.message) || 'An error occurred';
                else 
                    throw new Error(error.message);
                
            } else {
                throw new Error('an Unknown error occurred.');
            }
        }       
    }
}

export default apiService;

