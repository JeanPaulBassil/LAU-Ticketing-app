import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { PTSans_400Regular, PTSans_700Bold } from '@expo-google-fonts/pt-sans';

const useFontLoader = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const loadFontsAsync = async () => {
            try {
                await Font.loadAsync({
                    PTSans_400Regular,
                    PTSans_700Bold
                });
                setIsLoaded(true);
            } catch (error){
                console.log("Error loading fonts: ", error);
                setIsLoaded(false);
            }
        }

        loadFontsAsync();
    }, []);

    return isLoaded;
}

export default useFontLoader;