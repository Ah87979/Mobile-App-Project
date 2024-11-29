import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './pages/Login';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Info from './pages/Info';
import History from './pages/History';

const AuthStack = createNativeStackNavigator();
const MainTabs = createBottomTabNavigator();
const FlightsStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Common styles
const headerStyle = { backgroundColor: 'cyan' };

// Flights Stack Navigator
function FlightsStackNavigator() {
  return (
    <FlightsStack.Navigator screenOptions={{ headerStyle }}>
      <FlightsStack.Screen name="Flights" component={Flights} options={{ headerShown: false }} />
      <FlightsStack.Screen name="Info" component={Info} options={{ headerShown: false }} />
    </FlightsStack.Navigator>
  );
}

// Tab Navigator
function MainTabNavigator() {
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Flights: 'airplane', // Same icon for both states
            History: 'history', // Same icon for both states
          };
          return <MaterialCommunityIcons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'cyan',
      })}
    >
      <MainTabs.Screen name="Home" component={Home} />
      <MainTabs.Screen name="Flights" component={FlightsStackNavigator} />
      <MainTabs.Screen name="History" component={History} />
    </MainTabs.Navigator>
  );
}

// Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={MainTabNavigator} options={{ title: 'Tab Navigation' }} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Flights" component={FlightsStackNavigator} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
  );
}

// Auth Stack Navigator (Login Screen)
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Main" component={DrawerNavigator} />
    </AuthStack.Navigator>
  );
}

// App Component
export default function App() {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}
