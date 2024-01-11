import * as Font from "expo-font";
import { PTSans_400Regular, PTSans_700Bold } from "@expo-google-fonts/pt-sans";

const getFonts = async () => {
  try {
    await Font.loadAsync({
      PTSans_400Regular,
      PTSans_700Bold,
    });
  } catch (error) {
    console.log("Error loading fonts: ", error);
  }
};

export default getFonts;
