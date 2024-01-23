import React, { useReducer, createContext, useMemo } from 'react';
import { State, Action } from '../types/types';

const initialState: State = {
    error: '',
    scanData: null,
    currentStudentId: null,
    newName: '',
    showNameModal: false,
    events: [],
    isCameraVisible: false,
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
        case 'OPEN_CAMERA':
            return { ...state, isCameraVisible: true };
        case 'CLOSE_CAMERA':
            return { ...state, isCameraVisible: false };
        default:
            return state;
    }
}

export const EventDetailContext = createContext<{ eventState: State, dispatch: React.Dispatch<Action> } | null>(null);

export const EventDetailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [eventState, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(() => ({ eventState, dispatch }), [eventState]);

    return (
        <EventDetailContext.Provider value={contextValue}>
            {children}
        </EventDetailContext.Provider>
    );
};
