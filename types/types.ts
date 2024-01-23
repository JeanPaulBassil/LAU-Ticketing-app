import { IEvent } from "../interfaces/events.interface";

export type State = {
    error: string;
    scanData: number | null;
    currentStudentId: number | null;
    newName: string | undefined;
    showNameModal: boolean;
    events: IEvent[];
    cameraModalVisible: boolean;
};

export type Action =
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'SET_SCAN_DATA'; payload: number | null }
    | { type: 'SET_CURRENT_STUDENT_ID'; payload: number | null }
    | { type: 'SET_NEW_NAME'; payload: string | undefined}
    | { type: 'TOGGLE_NAME_MODAL' }
    | { type: 'SET_EVENTS'; payload: IEvent[] }
    | { type: 'SET_CAMERA_MODAL_VISIBLE'; payload: boolean };
