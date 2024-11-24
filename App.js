import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Flights from './pages/Flights.js';
import Info from './pages/Info.js';
import History from './pages/History.js';

const AuthStack = createNativeStackNavigator();
const MainTabs = createBottomTabNavigator();
const FlightsStack = createNativeStackNavigator();

// Authentication Stack (Login Screen)
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
}

// Flights Stack (Flights and Info Screens)
function FlightsStackNavigator() {
  return (
    <FlightsStack.Navigator screenOptions={{ headerShown: false }}>
      <FlightsStack.Screen name="Flights" component={Flights} />
      <FlightsStack.Screen name="Info" component={Info} />
    </FlightsStack.Navigator>
  );
}

// Main Tab Navigator (Home, Flights, and History)
function MainTabNavigator() {
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen name="Home" component={Home} />
      <MainTabs.Screen name="Flights" component={FlightsStackNavigator} />
      <MainTabs.Screen name="History" component={History} />
    </MainTabs.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Main" component={MainTabNavigator} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
