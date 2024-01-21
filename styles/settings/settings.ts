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
        justifyContent: 'center',
    },
    logout_button_text: {
        color: 'white',
        marginRight: 5
    }
});

export default styles;