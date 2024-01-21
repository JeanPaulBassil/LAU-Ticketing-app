import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header_left: {
        position: 'relative',
    },
    header_underline: {
        position: 'absolute',
        bottom: -10,
        left: 0,
        backgroundColor: '#005C07',
        width: '70%',
        height: 2,
        borderRadius: 50,
    },
    addButton: {
        width: 120,
        height: 38,
        borderRadius: 3,
    },
    addButtonText: {
        fontSize: 18,
        color: 'white'
    },
    datePickerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    dateInputButton: {
        marginBottom: 20,
        padding: 12,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#AAAAAA',
    },
    buttonDisabled: {
        opacity: 0.3,
    },
    image: {
        width: "90%",
        height: 300,
        resizeMode: "contain",
        backgroundColor: '#f6f6f6',
    },
    loadingContainer: {
        flex: 1,
        // backgroundColor: 'red',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
    },
    loader: {
        marginTop: -60,
        transform: [{ scale: 1.3 }]
    },
    notFoundMessage: {
        fontSize: 20,
        color: 'grey',
    }
});

export default styles;