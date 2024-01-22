import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { IEvent, createEventData } from "../interfaces/events.interface";
import { AxiosResponse } from "axios";
import { EventDetailContext } from "../contexts/EventDetails";


const useEvents = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { eventState, dispatch } = useContext(EventDetailContext);
    const events = eventState.events;

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response: AxiosResponse = await api.getEvents();
            dispatch({ type: 'SET_EVENTS', payload: response.data });
        } catch (error: any) {
            dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || "An error occurred while fetching events." });
        } finally {
            setLoading(false);
        }
    }  
    
    useEffect(() => {
        fetchEvents();
    }, []);

    const addEvent = async (data: createEventData) => {
        try {
            setLoading(true);
            await api.createEvent(data);
            await fetchEvents();
            dispatch({ type: 'SET_ERROR', payload: '' })
        } catch (error: any){
            dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || "An error occurred while adding event." });
        } finally {
            setLoading(false);
        }
    }

    return { events, loading, fetchEvents, addEvent };
}

export default useEvents;