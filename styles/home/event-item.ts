import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    event_container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        marginHorizontal: 15,
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
    },
    event_name: {
        fontSize: 20,
    },
    event_detail: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 7
    },
    event_detail_text: {
        color: '#005C4A',
        fontSize: 14,
        marginLeft: 10,
    },
    event_arrow: {
        fontSize: 20,
        color: '#005C4A',
    },
    
});

export default styles;