import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { CameraType, FlashMode } from 'expo-camera/build/Camera.types';

const useCamera = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState<CameraType>(CameraType.back);
    const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off);
    const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const toggleCameraType = (): void => {
        setType(prevType =>
            prevType === CameraType.back
                ? CameraType.front
                : CameraType.back
        );
    };

    const toggleFlashMode = (): void => {
        setFlashMode(prevFlashMode =>
            prevFlashMode === FlashMode.off
                ? FlashMode.torch
                : FlashMode.off
        );
    };

    const openCameraModal = (): void => setIsCameraVisible(true);
    const closeCameraModal = (): void => setIsCameraVisible(false);

    return {
        hasPermission,
        type,
        toggleCameraType,
        flashMode,
        toggleFlashMode,
        isCameraVisible,
        openCameraModal,
        closeCameraModal
    };
};

export default useCamera;
