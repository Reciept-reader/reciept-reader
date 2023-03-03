import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


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