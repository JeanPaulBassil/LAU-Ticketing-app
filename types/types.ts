export type State = {
    error: string;
    scanData: number | null;
    currentStudentId: number | null;
    newName: string;
    showNameModal: boolean;
};

export type Action =
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'SET_SCAN_DATA'; payload: number | null }
    | { type: 'SET_CURRENT_STUDENT_ID'; payload: number | null }
    | { type: 'SET_NEW_NAME'; payload: string }
    | { type: 'TOGGLE_NAME_MODAL' };
