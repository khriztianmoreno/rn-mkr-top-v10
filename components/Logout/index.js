import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text } from 'react-native';

const Logout = ({ navigate }) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        await AsyncStorage.removeItem('@kmz/rick-and-morty');
        navigate('Login');
      }}
    >
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default Logout;
