import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: '100%',
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
    },
    margin: {
        marginTop: 200
    }
});

export default styles;