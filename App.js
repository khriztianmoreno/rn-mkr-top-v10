import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import LoginScreen from './screens/Login';
import CharactersScreen from './screens/Characters';
import LocationsScreen from './screens/Locations';
import EpisodesScreen from './screens/Episodes';

import iconsName from './utils/icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Landing() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = iconsName(route.name);

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Characters" component={CharactersScreen} />
      <Tab.Screen name="Episodes" component={EpisodesScreen} />
      <Tab.Screen name="Locations" component={LocationsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        // The user's permission to send them push notifications
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      // he user's ExpoPushToken- if push notifications are mail, then the ExpoPushToken is the user's address.
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  };

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />

        <Stack.Screen
          name="Home"
          component={Landing}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
