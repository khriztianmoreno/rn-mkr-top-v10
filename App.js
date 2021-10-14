import React from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';
import axios from 'axios';

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
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
}

export default function App() {
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    if (Constants.isDevice && Platform.OS !== 'web') {
      registerForPushNotificationsAsync().then((token) => {
        console.log(
          '🚀 ~ file: App.js ~ line 80 ~ registerForPushNotificationsAsync ~ token',
          token
        );
        axios.post(`https://nativenotify.com/api/expo/key`, {
          appId: 327,
          appToken: 'aFtEx1sXmFVd7Tx3qJoFO3',
          expoToken: token,
        });
      });
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) =>
          console.log(response)
        );
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }
  });

  // const registerForPushNotificationAsync = async () => {
  //   if (Constants.isDevice) {
  //     // Request permission to get notifications
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;

  //     if (finalStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     // Get the token that uniquely identifies this device
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;

  //     console.log('Token', token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }
  // };

  // React.useEffect(() => {
  //   registerForPushNotificationAsync();
  // }, []);

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
