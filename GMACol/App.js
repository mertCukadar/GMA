import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GreetingScreen from './src/Screens/GreetingScreen';
import TestScreen from './src/Screens/TestScreen';
import React from 'react';
import { AxiosProvider } from './src/Context/AxiosContext';

export default function App() {


  const Stack = createStackNavigator();
  return (
    <AxiosProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "orange"},
          headerTintColor: "white",
        }}
        initialRouteName="GreetingScreen"
      >
        <Stack.Screen name="GreetingScreen" component={GreetingScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </AxiosProvider>
  );
}


