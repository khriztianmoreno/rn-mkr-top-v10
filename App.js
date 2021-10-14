import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import LoginScreen from './screens/Login';
import CharactersScreen from './screens/Characters/Home';
import CharacterDetailScreen from './screens/Characters/Detail';
import LocationsScreen from './screens/Locations';
import EpisodesScreen from './screens/Episodes';

import Logout from './components/Logout';

import iconsName from './utils/icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DetailStack = createNativeStackNavigator();

function CharacterStack({ navigation }) {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name="Characters"
        options={{
          headerRight: () => <Logout {...navigation} />,
        }}
        component={CharactersScreen}
      />
      <DetailStack.Screen
        name="CharDetail"
        options={{
          title: 'Detail',
        }}
        component={CharacterDetailScreen}
      />
    </DetailStack.Navigator>
  );
}

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
      <Tab.Screen
        name="CharacterStack"
        options={{
          headerTitle: 'Characters',
          headerShown: false,
        }}
        component={CharacterStack}
      />
      <Tab.Screen name="Episodes" component={EpisodesScreen} />
      <Tab.Screen name="Locations" component={LocationsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
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
