import { useState } from "react";
import api from "../services/api";
import { IEvent, createEventData } from "../interfaces/events.interface";
import { AxiosResponse } from "axios";


const useEvents = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response: AxiosResponse = await api.getEvents();
            setEvents(response.data.events);
            setError('');
        } catch (error: any) {
            setError(error.response?.data?.message || "An error occurred while fetching events.");
        } finally {
            setLoading(false);
        }
    }    

    const addEvent = async (data: createEventData) => {
        try {
            setLoading(true);
            await api.createEvent(data);
            await fetchEvents();
            setError('');
        } catch (error: any){
            setError(error.response?.data?.message || "An error occurred while creating event.");
        } finally {
            setLoading(false);
        }
    }

    return { events, loading, fetchEvents, addEvent, error, setEvents };
}

export default useEvents;