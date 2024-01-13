import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    padding: 20,
    minHeight: 300,
    backgroundColor: "#f6f6f6",
    flex: 1,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  inputs_container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    marginTop: 25,
    maxWidth: "90%",
    marginLeft: 20
  },
  input: {
    marginBottom: 40,
    paddingBottom: 15,
    width: '100%'
  },
  
  submit_button_container: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    marginTop: 25,
    width: '90%',
    marginLeft: 20,
  },
  submit_button: {
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  error_text: {
    marginTop: -20,
    width: '100%',
  },
  top_logo: {
    maxWidth: "80%",
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 30,
    marginTop: -15,
  },
  back_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 20,
  },
  back_button: {
    width: 50,
    height: 50,
  },
  top_container: {
    maxWidth: "80%",
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 50,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
  },
  sub_title: {
    textAlign: "center",
    marginTop: 20,
  },

  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#005C4A",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 5,
    marginBottom: 5,
  },
  focusCell: {
    borderBottomColor: "#005C4A",
    borderBottomWidth: 2,
  },
});
