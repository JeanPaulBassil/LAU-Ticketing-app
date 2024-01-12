import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {
    padding: 20, 
    minHeight: 300,
    backgroundColor: '#EAF2EF',
    flex: 1
  },

  top_logo: {
    maxWidth: '80%',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 30,
    marginTop: -15
  },
  back_container : {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 20 
  },
  back_button : {
    width: 50,
    height: 50,
  },
  top_container: {
    maxWidth: '80%',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 30
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  sub_title: {
    textAlign: 'center',
    marginTop: 20
  },
  
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#005C4A',
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 5,
    marginBottom: 5,
  },
  focusCell: {
    borderBottomColor: '#005C4A',
    borderBottomWidth: 2
  },
});