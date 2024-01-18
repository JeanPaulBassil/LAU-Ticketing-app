import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera, CameraType, FlashMode, AutoFocus } from 'expo-camera';
import CameraButton from './CameraButtons';

type CameraComponentProps = {
    onBarCodeScanned: (scanData: string) => void;
    cameraType: CameraType;
    flashMode: FlashMode;
    toggleCameraType: () => void;
    toggleFlashMode: () => void;
    onClose: () => void;
};

const CameraComponent: React.FC<CameraComponentProps> = ({
    onBarCodeScanned,
    cameraType,
    flashMode,
    toggleCameraType,
    toggleFlashMode,
    onClose
}) => {
    const cameraRef = useRef<Camera>(null);

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={cameraType}
                flashMode={flashMode}
                onBarCodeScanned={({ data }) => onBarCodeScanned(data)}
                autoFocus={AutoFocus.on}
            />
            <View style={styles.buttonContainer}>
                <CameraButton icon={'retweet'} onPress={toggleCameraType} />
                <CameraButton icon={'flash'} onPress={toggleFlashMode} />
                <CameraButton icon={'close'} onPress={onClose} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 20,
        zIndex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'black',
    },
});

export default CameraComponent;
