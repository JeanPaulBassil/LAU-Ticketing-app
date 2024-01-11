import axios from '../utils/axios';
import AXIOS, { AxiosResponse } from 'axios';


interface LoginData {
    name: string;
    password: string;
}

interface LoginResponse {
    message: string;
    statusCode: number;
}

interface EventsResponse {
    events: Event[];
}

interface Event {
    attendees: any[];
    _id: string;
    name: string;
    description: string;
    scan_type: string;
    start_date: string;
    end_date: string;
    clubs: string[];
    __v: number;
  }


const apiService = {
    login: async (data: LoginData) => {
        try {
            const response: AxiosResponse<LoginResponse | any> = await axios.post<LoginResponse>('/auth/login', data, {
                withCredentials: true
            });
            
            return response.data;
        } catch (error) {
            checkError(error);
        }       
    },
    getEvents: async () => {
        try {
            const response: AxiosResponse<EventsResponse> = await axios.get<EventsResponse>('/events', {
                withCredentials: true
            });
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

