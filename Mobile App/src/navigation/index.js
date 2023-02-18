import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import About from '../screens/About';
import ProfileScreen from '../screens/ProfileScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
const Stack = createNativeStackNavigator();
const Navigation =() => {
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name = "Sign In" component={SignInScreen} options={{ title: '' }}  />
                <Stack.Screen name = "HomeScreen" component={HomeScreen} options={{ title: '' }} />
                <Stack.Screen name = "ExpenseScreen" component={ExpensesScreen} options={{ title: '' }} />
                <Stack.Screen name = "ProfileScreen" component={ProfileScreen} options={{ title: '' }} />
                <Stack.Screen name = "About" component={About} ptions={{ title: '' }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;