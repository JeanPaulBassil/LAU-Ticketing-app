import axios from '../utils/axios';
import AXIOS, { AxiosResponse } from 'axios';
import { LoginData, LoginResponse, Event, EventsResponse } from '../interfaces/index.interface';


const apiService = {
    login: async (data: LoginData) => {
        try {
            const response: AxiosResponse<LoginResponse | any> = await axios.post<LoginResponse>('/auth/login', data);
            
            return response.data;
        } catch (error) {
            checkError(error);
        }       
    },
    getEvents: async () => {
        try {
            const response: AxiosResponse<EventsResponse> = await axios.get<EventsResponse>('/events');
            return response.data;
        } catch (error) {
            checkError(error);
        }
    }
}

const checkError = (error: any) => {
    if(AXIOS.isAxiosError(error)) {
        console.log(error.message)
        if(error.response) 
            throw new Error(error.response.data.message) || 'An error occurred';
        else 
            throw new Error(error.message);
        
    } else {
        throw new Error('an Unknown error occurred.');
    }
}

export default apiService;

