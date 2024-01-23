import { useReducer } from 'react';
import { State, Action } from '../types/types';

const initialState: State = {
    error: '',
    scanData: null,
    currentStudentId: null,
    newName: '',
    showNameModal: false,
    events: [],
    cameraModalVisible: false,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_SCAN_DATA':
            return { ...state, scanData: action.payload };
        case 'SET_CURRENT_STUDENT_ID':
            return { ...state, currentStudentId: action.payload };
        case 'SET_NEW_NAME':
            return { ...state, newName: action.payload };
        case 'TOGGLE_NAME_MODAL':
            return { ...state, showNameModal: !state.showNameModal };
        case 'SET_EVENTS':
            return { ...state, events: action.payload };
        default:
            return state;
    }
}

export const useEventDetailReducer = () => {
    return useReducer(reducer, initialState);
}