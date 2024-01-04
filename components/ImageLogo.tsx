import React from 'react';
import { Image, StyleSheet } from 'react-native';

type ImageLogoProps = {
    style?: object;
}

const ImageLogo: React.FC<ImageLogoProps> = ({ style }) => {
    return (
        <Image 
            source={require('../assets/lauLogo.png')}
            style={[styles.logo, style]}
        />
    )
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain',
        width: '75%',
        marginTop: 20,
    }
})

export default ImageLogo;