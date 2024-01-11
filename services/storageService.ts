import AsyncStorage from "@react-native-async-storage/async-storage";

const COOKIE_KEY: string = 'cookie';

export const saveCookie = async (cookie: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(COOKIE_KEY, cookie);
    } catch (error){
        console.error('Error Saving Cookie.', error);
    }
}

export const loadCookie = async (): Promise<string | null> => {
    try {
        const cookie: string | null = await AsyncStorage.getItem(COOKIE_KEY);
        console.log(`loaded cookie : ${cookie}`);
        return cookie;
    } catch (error) {
        console.error("Error loading cookie.", error);
        return null;
    }
}


