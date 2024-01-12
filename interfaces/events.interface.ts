interface EventsResponse {
    events: Event[];
}

interface IEvent {
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


export { EventsResponse, IEvent };