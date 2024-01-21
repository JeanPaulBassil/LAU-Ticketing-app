import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    addButtonText: {
        fontSize: 10,
        color: 'white'
    },
    centered_view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
    },
    modal_view: {
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
    modal_text: {
        marginLeft: 3,
        marginBottom: 30,
        fontSize: 18,
        color: '#121420',
        fontFamily: 'PTSans_400Regular'
    },
    modal_text_underline: {
        position: 'absolute',
        top: 48,
        left: 23,
        backgroundColor: '#005C07',
        width: 70,
        height: 2,
        borderRadius: 50,
    },
    
    modal_input: {
        marginBottom: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 3,
        width: '100%',
        backgroundColor: '#f6f6f6'
    },
    modal_button_container: {
        marginTop: 17,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    cancel_button: {
        width: 100,
        height: 40,
        borderRadius: 3,
        backgroundColor: '#b8b8b8',
    },
    button_text: {
        fontSize: 16,
        fontFamily: 'PTSans_400Regular',
    },
    submit_button: {
        width: 100,
        height: 40,
        borderRadius: 3,
        backgroundColor: '#005C07',
        marginLeft: 15,
    }, 
    
});

export default styles;