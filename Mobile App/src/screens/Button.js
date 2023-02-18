import * as React from 'react';
import { Text, TouchableOpecity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default function Button({title, onPress, icon, color}) {
  return (
    <TouchableOpecity onPress={onPress} style={StyleSheet.button}>
        <Entypo name = {icon} size={28} color={color ? color : '#f'} />
        <Text style={styles.text}>{title}</Text>
    </TouchableOpecity>
  )
}

const styles = StyleSheet.create({
  button:{
    height: 40,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontweight : 'bold',
    fontSize:16,
    color: '#f1f1f1',
    marginLeft:10,
  }
})