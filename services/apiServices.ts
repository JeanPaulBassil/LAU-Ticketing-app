import config from '../config';
import axios, { AxiosResponse } from 'axios';
import { saveCookie, loadCookie } from './storageService';

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

const loginBaseURL: string = `${config.backendUrl}/auth/login`;
const eventsBaseURL: string = `${config.backendUrl}/events`;

const apiService = {
    login: async (data: LoginData) => {
        try {
            const response: AxiosResponse<LoginResponse | any> = await axios.post<LoginResponse>(loginBaseURL, data, {
                withCredentials: true
            });

            const cookieHeader: string[] | undefined = response.headers['set-cookie'];
            if(cookieHeader) {
                const cookieValue: string = cookieHeader[0].split(';')[0].split('=')[1];
                await saveCookie(cookieValue);
            }
            
            return response.data;
        } catch (error) {
            checkError(error);
        }       
    },
    getEvents: async () => {
        try {
            const cookie: string | null = await loadCookie();
            const headers = cookie ? { Cookie: `connect.sid=${cookie}`} : {};
            console.log(headers);
            const response: AxiosResponse<EventsResponse> = await axios.get<EventsResponse>(eventsBaseURL, {
                withCredentials: true,
                headers: headers
            });
            console.log("Here");


            return response.data;
        } catch (error) {
            checkError(error);
        }
    }
}

const checkError = (error: any) => {
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

export default apiService;

