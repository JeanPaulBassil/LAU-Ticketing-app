import { IEvent } from "../interfaces/events.interface";

export type State = {
    error: string;
    scanData: number | null;
    currentStudentId: number | null;
    newName: string;
    showNameModal: boolean;
    events: IEvent[];
    isCameraVisible: boolean;
};

export type Action =
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'SET_SCAN_DATA'; payload: number | null }
    | { type: 'SET_CURRENT_STUDENT_ID'; payload: number | null }
    | { type: 'SET_NEW_NAME'; payload: string }
    | { type: 'TOGGLE_NAME_MODAL' }
    | { type: 'SET_EVENTS'; payload: IEvent[] }
    | { type: 'OPEN_CAMERA'; payload: boolean }
    | { type: 'CLOSE_CAMERA'; payload: boolean };
