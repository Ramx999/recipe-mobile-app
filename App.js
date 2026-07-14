import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeTabs from './src/navigation/HomeTabs';
import DetailScreen from './src/screens/DetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') await Notifications.requestPermissionsAsync();
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Recipe Details' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
