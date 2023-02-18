import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
function Dashboard() {
    return (
        <View style={styles.container}>
        <View style={styles.rectStack}>
          <View style={styles.rect}>
            <Text style={styles.reminder}>Budget $500 (250/500)</Text>
            <Text style={styles.receipts}>Receipts</Text>
            <View style={styles.rect2Row}>
              <View style={styles.rect2}>
                <Icon name="camera" style={styles.icon}></Icon>
              </View>
              <View style={styles.rect4}></View>
              <View style={styles.rect3}></View>
            </View>
          </View>
        </View>
        <Text style={styles.loremIpsum}>Lorem Ipsum</Text>
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
  
export default Dashboard;