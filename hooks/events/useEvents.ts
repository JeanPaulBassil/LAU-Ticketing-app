import { useState } from "react";
import api from "../../services/api";
import { IEvent, createEventData } from "../../interfaces/events.interface";
import { AxiosResponse } from "axios";


const useEvents = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response: AxiosResponse = await api.getEvents();
            setEvents(response.data.events);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }    

    const addEvent = async (data: createEventData) => {
        try {
            setLoading(true);
            await api.createEvent(data);
            await fetchEvents();
        } catch (error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { events, loading, fetchEvents, addEvent};
}

export default useEvents;