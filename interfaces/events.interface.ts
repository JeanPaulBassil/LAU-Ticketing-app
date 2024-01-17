import { IClub } from "./clubs.interface";

interface EventsResponse {
    events: IEvent[];
}

interface IEvent {
    _id: string;
    name: string;
    description: string;
    scan_type: string;
    start_date: string;
    end_date: string;
    clubs: string[];
    __v: number;
}

interface createEventData {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
}


export { EventsResponse, IEvent, createEventData };