import { ActivityIndicator } from 'react-native-paper';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { View, Text } from 'react-native';
import { HelperText } from 'react-native-paper';
import Button from '../components/Button';
import ImageLogo from '../components/ImageLogo';
import InputField from '../components/InputField';
import useFontLoader from '../hooks/useFontLoader';
import AppLoading from 'expo-app-loading';
import styles from '../components/styles/LoginScreenStyles';
import loginSchema from '../validation/LoginValidation';
import apiService from '../services/apiServices';

const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handlePress = async () => {
    try {
      setLoading(true);
      await loginSchema.validate({ username, password });
      await apiService.login({ name: username, password});
      setError(null);
      navigation.navigate('Home');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setError(error.message);
      } else if(error instanceof Error){
        setError(error.message);
      }
      else {
        setError('An unexpected error occurred');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageLogo />
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
      {error && <HelperText type="error" visible={!!error}>{error}</HelperText>}
      
      <Button 
        onPress={handlePress} 
        title={loading ? '' : "→"}
        disabled={loading}
        style={loading ? styles.buttonDisabled : undefined}
      >
        {loading && <ActivityIndicator size='small' color='#FFF' />}
      </Button>
    </View>
  );
};

export default LoginScreen;
