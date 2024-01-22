import { useEffect, useContext, useState } from "react";
import api from "../services/api";
import { IEvent, createEventData } from "../interfaces/events.interface";
import { AxiosResponse } from "axios";
import { EventDetailContext } from "../contexts/EventDetails";

const useEvents = () => {
    const { eventState, dispatch } = useContext(EventDetailContext);
    const { events, error } = eventState;  // Get error from eventState
    const [loading, setLoading] = useState<boolean>(false);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response: AxiosResponse = await api.getEvents();
            dispatch({ type: 'SET_EVENTS', payload: response.data });
            dispatch({ type: 'SET_ERROR', payload: '' }); // Clear any existing error
        } catch (error: any) {
            dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || "An error occurred while fetching events." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (events.length === 0) {  // Fetch events only if they are not already fetched
            fetchEvents();
        }
    }, []);

    const addEvent = async (data: createEventData) => {
        try {
            setLoading(true);
            await api.createEvent(data);
            await fetchEvents();  // Re-fetch events to update the list
        } catch (error: any){
            dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || "An error occurred while adding event." });
        } finally {
            setLoading(false);
        }
    };

    return { events, loading, fetchEvents, addEvent, error, setLoading };

}

export default useEvents;
