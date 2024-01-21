import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    logout_button: {
        width: 120,
        height: 38,
        borderRadius: 3,
        color: 'white',
        backgroundColor: '#CC2400',
    },
    logout_content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logout_button_text: {
        color: 'white',
        marginRight: 5
    },
    account_container: {
        padding: 20,
    },
    account_text: {
        fontSize: 18,
        // fontWeight: 'bold',
        marginBottom: 10,
        color: '#3b3a3a'
    },
    account_underline: {
        backgroundColor: '#8c8c8c',
        width: '100%',
        height: 1,
        borderRadius: 50,
    },
    account_details: {
        marginTop: 20
    },
    label: {
        color: '#3b3a3a',
        fontWeight: '500'
    },
    input: {
        marginTop: 10,
        width: "100%",
        backgroundColor: '#e8e8e8',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    input_text: {
        color: '#3b3a3a',
        fontSize: 13,
    },
    password_input: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    events_container: {
        marginTop: 20,
        padding: 20
    }
});

export default styles;