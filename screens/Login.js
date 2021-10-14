import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import LoginForm from '../components/Forms/Login';
import logo from '../assets/logo_app.png';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <LoginForm navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 2,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
    // borderRadius: 100,
  },
});

export default Login;
