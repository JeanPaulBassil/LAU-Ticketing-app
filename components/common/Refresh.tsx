import React from 'react';
import { RefreshControl } from 'react-native';

interface CustomRefreshControlProps {
    refreshing: boolean;
    onRefresh: () => void;
}

const CustomRefreshControl: React.FC<CustomRefreshControlProps> = ({ refreshing, onRefresh }) => {
    return (
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
};

export default CustomRefreshControl;
