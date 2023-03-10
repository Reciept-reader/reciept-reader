import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import About from '../screens/About';
import ProfileScreen from '../screens/ProfileScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import EditToDB from '../screens/EditToDB';
import ForgotPassword from '../screens/ForgotPassword';
import CreateAccount from '../screens/CreateAccount';
import ShowImage from '../screens/ShowImage';
import BudgetScreen from '../screens/BudgetScreen';
import AllReceipts from '../screens/AllReceipts';

const Stack = createNativeStackNavigator();
const Navigation =() => {
    return (
        <NavigationContainer >
            <Stack.Navigator >
                <Stack.Screen name = "Sign In" component={SignInScreen} options={{headerStyle: {backgroundColor: '#051549'}}}  />
                <Stack.Screen name = "HomeScreen" component={HomeScreen} options={{title: '',headerTintColor: '#fff', headerStyle: {backgroundColor: '#051549'}}} />
                <Stack.Screen name = "CreateAccount" component={CreateAccount} options={{ title: 'Create Account', headerTintColor: '#fff', headerStyle: {backgroundColor: '#051549'} }}  />
                <Stack.Screen name = "ShowImage" component={ShowImage}  options={{ title: 'Image', headerTintColor: '#fff', headerStyle: {backgroundColor: '#051549'} }}  />
                <Stack.Screen name = "ShowBudget" component={BudgetScreen} options={{title: 'Budget',headerTintColor: '#fff', headerStyle: {backgroundColor: '#051549'}}}  />

                <Stack.Screen name = "ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password', headerTintColor: '#fff', headerStyle: {backgroundColor: '#051549'} }} />
                <Stack.Screen name = "ExpenseScreen" component={ExpensesScreen} options={{title: '',headerTintColor: '#fff', headerStyle: {backgroundColor: '#051549'}}} />
                <Stack.Screen name = "ProfileScreen" component={ProfileScreen} options={{ title: '' }} />
                <Stack.Screen name = "About" component={About}  options={{ title: 'About', headerTintColor: '#fff', headerStyle: {backgroundColor: '#051549'} }}/>
                <Stack.Screen name = "EditToDB" component={EditToDB} options={{ title: '' }} />
                <Stack.Screen name = "AllReceipts" component={AllReceipts} options={{ title: '' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
root: {
    
    backgroundColor: '#051549',

},
})
export default Navigation;