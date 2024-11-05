import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login.js';
import Home from './pages/Home.js';
  
const Details = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button title="Go to Games..." onPress={() => navigation.navigate('Games')} />
    </View>
  )
}
  
const Stack = createNativeStackNavigator()
  
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Details' component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
