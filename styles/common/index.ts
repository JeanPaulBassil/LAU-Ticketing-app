import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f6f6f6',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        marginTop: 15
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
    header_text: {
        fontSize: 20,
        color: '#121420', 
    },
});

export default styles;