import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function HomeTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{ marginRight: 16 }}>
            <Text style={{ fontSize: 22 }}>⚙️</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen name="Feed" component={HomeScreen} options={{ title: 'Recipes' }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
