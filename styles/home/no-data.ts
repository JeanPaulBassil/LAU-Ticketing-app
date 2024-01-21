import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        display: 'flex',
        zIndex: -1,
        flex: 1,
    },
notFoundMessage: {
        fontSize: 18,
        color: 'grey'     
    },
    image: {
        width: "90%",
        height: 300,
        resizeMode: "contain",
        marginTop: -100
    }
});

export default styles;