import * as React from 'react';
import Button from '../components/Button';
import ImageLogo from '../components/ImageLogo';
import InputField from '../components/InputField';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useFonts, PTSans_400Regular, PTSans_700Bold } from '@expo-google-fonts/pt-sans';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


const LoginScreen = () => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        PTSans_400Regular,
        PTSans_700Bold,
      });
      setIsReady(true);
    }

    loadFonts();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <ImageLogo/>
      <Text style={styles.title}>
        Welcome to LAU {'\n'}Barcode{' '}
        <Text style={styles.scanner}>scanner!</Text>
      </Text>
      <Text style={styles.subtitle}>Please use your club username provided by the SLO.</Text>
      <InputField
        placeholder='Username'
        placeholderTextColor='#AAAAAA'
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <InputField
        placeholder='Password'
        placeholderTextColor='#AAAAAA'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button onPress={handlePress} title="→" style={styles.button} textStyle={styles.buttonText} />
    </View>
  );
};

function handlePress() {
  console.log('Button pressed');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: '20%', 
    fontFamily: 'PTSans_400Regular',
  },
  title: {
    marginTop: 16,
    fontSize: 26,
    marginBottom: 8,
    color: '#121420'
  },
  scanner: {
    color: '#005C4A',
  },
  subtitle: {
    marginTop: 50,
    fontSize: 16,
    marginBottom: 90,
    color: '#AAAAAA'
  },
  input: {
    marginBottom: 40,
    paddingBottom: 15,
  },
});

export default LoginScreen;
