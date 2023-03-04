import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomButton = ({onPress, text}) => {
    return (
        <TouchableOpacity onPress={onPress} style= {styles.container}>
        <Text style={styles.text}> {text}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#404CCF",
        
    
        padding: 15,
        marginHorizontal: 10,
        margineVertical: 30,
        marginBottom: 10,
        alighItems: 'center',
        borderRadius:5,


    },     
    text:{
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});
export default CustomButton;


