import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EAF2EF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        marginTop: 15,
        marginBottom: 20,
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
        width: '80%',
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
        backgroundColor: 'black',
        opacity: 0.6,
    },
    modalView: {
        height: '25%',
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
        marginBottom: 20,
        fontSize: 18,
        color: '#121420',
        fontFamily: 'PTSans_400Regular'
    },
    modalInput: {
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 10,
        width: '100%'
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
    cancelButtonTextStyle: {
        fontSize: 18,
        color: '#121420',
        fontFamily: 'PTSans_400Regular'
    },
    addEventButton: {
        width: 90,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#005C07',
        marginLeft: 15,
    },
});

export default styles;