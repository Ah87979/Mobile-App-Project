import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Flights from './pages/Flights.js';
// import Info from './pages/Info.js';
// import History from './pages/History.js';

const Stack = createNativeStackNavigator()
  
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Flights' component={Flights} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
