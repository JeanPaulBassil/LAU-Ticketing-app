import config from '../config';
import axios from 'axios';

interface LoginData {
    username: string;
    password: string;
}

interface LoginResponse {
    message: string;
    statusCode: number;
}

const baseURL = `${config.backendUrl}/auth/login`;

const apiService = {
    login: async (data: LoginData): Promise<LoginResponse> => {
        try {
            const response = await axios.post<LoginResponse>(baseURL, data);
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

