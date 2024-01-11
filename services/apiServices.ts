import axios from '../utils/axios';
import { AxiosResponse } from 'axios';
import { LoginData, LoginResponse, EventsResponse } from '../interfaces/index.interface';


const apiService = {
    login: async (data: LoginData) => {
        const response: AxiosResponse<LoginResponse | any> = await axios.post<LoginResponse>('/auth/login', data);
        return response;
    },
    getEvents: async () => {
        const response: AxiosResponse<EventsResponse> = await axios.get<EventsResponse>('/events');
        return response;
    }
}

// const checkError = (error: any) => {
//     if(AXIOS.isAxiosError(error)) {
//         console.log(error.message)
//         if(error.response) 
//             throw new Error(error.response.data.message) || 'An error occurred';
//         else 
//             throw new Error(error.message);
        
//     } else {
//         throw new Error('an Unknown error occurred.');
//     }
// }

export default apiService;

