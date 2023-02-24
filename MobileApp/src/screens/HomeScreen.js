import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from '../screens/CameraScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/ProfileScreen';
import Dashboard from "./DashBoardScreen";
import ExpensesScreen from "./ExpensesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function Dash() {
    return (
        <View style={styles.container}>
        {/* <View style={styles.rectStack}> */}
        
          <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Camera') {
              iconName = focused 
              ? 'camera' 
              : 'camera-outline'; 
            } 
            else if(route.name == 'Profile'){
              iconName= focused
              ? 'person'
              : 'person-outline';
            }
            else if (route.name == 'Expense'){
              iconName  = focused
              ? 'menu'
              : 'menu-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
            
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        <Tab.Screen name="Expense" component={ExpensesScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>

      </Tab.Navigator>
        {/* </View> */}
      </View>
    );  
  }



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,1)"
    },
    rect: {
      top: 51,
      left: 0,
      width: 375,
      height: 629,
      position: "absolute",
      backgroundColor: "rgba(255,255,255,1)"
    },
    reminder: {
      color: "#121212",
      fontSize: 25,
      marginTop: 42,
      marginLeft: 12
    },
    receipts: {
      color: "#121212",
      height: 50,
      width: 124,
      fontSize: 25,
      marginTop: 325,
      marginLeft: 12
    },
    rect2: {
      width: 106,
      height: 164,
      backgroundColor: "#E6E6E6"
    },
    icon: {
      color: "rgba(128,128,128,1)",
      fontSize: 40,
      height: 46,
      width: 40,
      marginTop: 60,
      marginLeft: 33
    },
    rect4: {
      width: 106,
      height: 164,
      backgroundColor: "#E6E6E6",
      marginLeft: 18
    },
    rect3: {
      width: 106,
      height: 164,
      backgroundColor: "#E6E6E6",
      marginLeft: 18
    },
    rect2Row: {
      height: 164,
      flexDirection: "row",
      marginLeft: 12,
      marginRight: 9
    },
    materialHeader2: {
      height: 56,
      width: 375,
      position: "absolute",
      top: 0,
      left: 0
    },
    rectStack: {
      width: 375,
      height: 680,
      marginTop: 36
    },
    materialIconButtonsFooter: {
      width: 375,
      height: 96
    },
    loremIpsum: {
      color: "#121212",
      marginTop: 59,
      marginLeft: 231
    }
  });
  
export default Dash;