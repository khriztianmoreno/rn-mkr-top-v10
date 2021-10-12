import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/Login'
import CharactersScreen from './screens/Characters'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Landing() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Characters" component={CharactersScreen} />
      {/* <Tab.Screen name="Messages" component={Messages} /> */}
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen
          name="Home"
          component={Landing}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

