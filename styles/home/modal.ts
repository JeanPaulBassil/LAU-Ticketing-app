import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    addButtonText: {
        fontSize: 18,
        color: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: '#f6f6f6',
        borderRadius: 3,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8,
        position: 'relative'
    },
    modalText_underline: {
        position: 'absolute',
        top: 48,
        left: 23,
        backgroundColor: '#005C07',
        width: 70,
        height: 2,
        borderRadius: 50,
    },
    modalText: {
        marginLeft: 3,
        marginBottom: 30,
        fontSize: 18,
        color: '#121420',
        fontFamily: 'PTSans_400Regular'
    },
    modalInput: {
        marginBottom: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 3,
        width: '100%',
        backgroundColor: '#f6f6f6'
    },
    modalButtons: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    cancelButton: {
        width: 90,
        height: 40,
        borderRadius: 3,
        backgroundColor: '#D6D6D6',
    },
    cancelButtonText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'PTSans_400Regular'
    },
    addEventButton: {
        width: 90,
        height: 40,
        borderRadius: 3,
        backgroundColor: '#005C07',
        marginLeft: 15,
    }, 
    
});

export default styles;