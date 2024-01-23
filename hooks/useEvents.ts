import { useEffect, useContext, useState, Dispatch } from "react";
import api from "../services/api";
import { IEvent, createEventData } from "../interfaces/events.interface";
import { AxiosResponse } from "axios";
import { EventDetailContext } from "../contexts/EventDetails";
import { Action, State } from "../types/types";

const useEvents = () => {
    const { eventState, dispatch } = useContext(EventDetailContext) as { eventState: State; dispatch: Dispatch<Action>; };
    const { events, error } = eventState;  
    const [loading, setLoading] = useState<boolean>(false);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response: AxiosResponse = await api.getEvents();
            dispatch({ type: 'SET_EVENTS', payload: response.data });
            dispatch({ type: 'SET_ERROR', payload: '' }); 
        } catch (error: any) {
            dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || "An error occurred while fetching events." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (events.length === 0) {  
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
