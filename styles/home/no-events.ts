import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        display: 'flex'
    },
    notFoundMessage: {
        fontSize: 20,
        color: 'grey',
        
    },
    image: {
        width: "90%",
        height: 300,
        resizeMode: "contain"
    }
});

export default styles;