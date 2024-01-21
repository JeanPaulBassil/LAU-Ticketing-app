import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    error_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    error_image: {
        width: "90%",
        height: 310,
        resizeMode: "contain",
        marginTop: -50
    },
    error_title: {
        fontSize: 26,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '600'
    },
    error_text: {
        color: '#2b2b2b',
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 10,
        textAlign: 'center',
    },
    error_button_container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        marginTop: 25,
        maxWidth: '80%',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      error_button: {
        marginTop: 20,
        width: '100%',
        height: 50,
        backgroundColor: '#CC2400'
      }
});

export default styles;