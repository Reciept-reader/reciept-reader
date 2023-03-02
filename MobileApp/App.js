import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import React from 'react';



import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import HomeScreen from './src/screens/';
// import CameraScreen from './src/screens/CameraScreen';

import Navigation from './src/navigation'

const App = () => {
  return (
    <SafeAreaView style = {styles.root}>
    <Navigation/>
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  root: {
    flex:1,
    backgroundColor: '#051549',
  },
});

export default App;