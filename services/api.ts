import axios from '../utils/axios';
import { Axios, AxiosResponse } from 'axios';
import { LoginData, LoginResponse, EventsResponse, IClub, verifyData, createEventData} from '../interfaces/index.interface';
import { IStudent, IStudentResponse } from '../interfaces/index.interface';

const api = {
    login: async (data: LoginData) => {
        const response: AxiosResponse<IClub> = await axios.post<IClub>('/auth/login', data);
        return response;
    },
    getMe: async () => {
        const response: AxiosResponse<IClub> = await axios.get<IClub>('/auth/me');
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
    },
    addStudent: async (data: IStudent, eventId: string) => {
        const response: AxiosResponse<IStudentResponse> = await axios.post<IStudentResponse>(`/scans/${eventId}`, data);
        return response;
    },
    getEventAttendees: async (eventId: string) => {
        const response: AxiosResponse<IStudentResponse> = await axios.get<IStudentResponse>(`/scans/${eventId}`);
        return response;
    },
    editStudent: async (studentId: number, newName: string) => {
        const response: AxiosResponse<IStudentResponse> = await axios.put<IStudentResponse>(`/students`, {student_id: studentId, name: newName});
        return response;
    },
}


export default api;

