import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '13%',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "flex-end",
    backgroundColor: "#f6f6f6"
  },
  title: {
    marginTop: 14,
    fontSize: 26,
    marginBottom: 8,
    color: '#121420',
  },
  scanner: {
    color: '#005C4A',
  },
  subtitle: {
    marginTop: 40,
    fontSize: 16,
    marginBottom: 70,
    color: '#AAAAAA',
  },
  inputs_container: {
    justifyContent: "flex-end",
  },
  input: {
    marginBottom: 40,
    paddingBottom: 15,
    width: '100%'
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  submit_button: {
    width: 150,
    height: 50,
  },
  error_text: {
    marginTop: -20,
    width: '100%',
  },
  submit_container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 10
  }
});
