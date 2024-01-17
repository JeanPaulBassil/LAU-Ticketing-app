import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#f6f6f6',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        marginTop: 15,
        position: 'relative'
    },
    header_underline: {
        position: 'absolute',
        bottom: 12,
        left: 17,
        backgroundColor: '#005C07',
        width: 60,
        height: 2,
        borderRadius: 50,
    },
    headerText: {
        fontSize: 30,
        color: '#121420', 
    },
    addButton: {
        width: 110,
        height: 40,
        borderRadius: 5,
    },
    addButtonText: {
        fontSize: 18,
        color: 'white'
    },
    eventitem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
        marginHorizontal: 15,
        justifyContent: 'space-between',
        height: 60,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
    },
    eventName: {
        fontSize: 20,
    },
    arrowIcon: {
        fontSize: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        margin: 20,
        backgroundColor: '#EAF2EF',
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginLeft: 3,
        marginBottom: 20,
        fontSize: 18,
        color: '#121420',
        fontFamily: 'PTSans_400Regular'
    },
    modalInput: {
        marginBottom: 15,
        padding: 12,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#F2F2F2',
    },
    modalButtons: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
    },
    cancelButton: {
        width: 90,
        height: 40,
        borderRadius: 5,
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
        borderRadius: 5,
        backgroundColor: '#005C07',
        marginLeft: 15,
    },
    eventsList: {
        width: '100%',
        height: '100%',
        zIndex: -1,
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
        marginBottom: 10,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#AAAAAA',
    },
    buttonDisabled: {
        opacity: 0.3,
    },
    errorText: {
        color: 'red', 
        fontSize: 14,
        marginHorizontal: 20,
        marginTop: 5,
    },
});

export default styles;