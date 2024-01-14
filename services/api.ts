import axios from '../utils/axios';
import { AxiosResponse } from 'axios';
import { LoginData, LoginResponse, EventsResponse, IClub, verifyData, createEventData} from '../interfaces/index.interface';


const api = {
    login: async (data: LoginData) => {
        const response: AxiosResponse<IClub> = await axios.post<IClub>('/auth/login', data);
        return response;
    },
    getMe: async () => {
        const response: AxiosResponse<IClub> = await axios.get<IClub>('/auth/me');
        console.log(response);
        return response.data;
    },
    verifyAccount: async (data: verifyData) => {
        const response: AxiosResponse<IClub> = await axios.post<IClub>('/auth/verify', data);
        return response.data;
    },
    getEvents: async () => {
        const response: AxiosResponse<EventsResponse> = await axios.get<EventsResponse>('/events');
        return response;
    },
    createEvent: async (data: createEventData) => {
        const response: AxiosResponse<EventsResponse> = await axios.post<EventsResponse>('/events', data);
        return response;
    }
}


export default api;

