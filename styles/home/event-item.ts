import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    event_container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 15,
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
    },
    event_left: {
        padding: 15,
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
    event_arrow_container: {
        backgroundColor: '#005C4A',
        height: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    event_arrow_container_inactive: {
        opacity: 0.5,
    },
    event_arrow: {
        fontSize: 20,
        color: 'white',
    },
    
});

export default styles;