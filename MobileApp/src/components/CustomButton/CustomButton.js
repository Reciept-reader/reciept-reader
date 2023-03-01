import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({onPress, text}) => {
    return (
        <Pressable onPress={onPress} style= {styles.container}>
        <Text style={styles.text}> {text}</Text>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#404CCF",

        width: '40%',
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


