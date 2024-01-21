import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header_left: {
        position: 'relative',
    },
    header_text: {
        fontSize: 20,
        color: '#121420', 
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
    loadingContainer: {
        flex: 1,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
    },
    loader: {
        marginTop: -60,
        transform: [{ scale: 1.3 }]
    },
});

export default styles;