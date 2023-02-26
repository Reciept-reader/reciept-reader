import React from 'react'
import { View, Text, TextInput, StyleSheet} from 'react-native'

const CustomInput = ({value, setValue, placeholder,secureTextEntry}) => {
    return (
      
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            style={styles.input} 
            secureTextEntry={secureTextEntry}
            autoCapitalize='none'
            />
           
            
 
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        
        height: 40,
        paddingHorizontal: 10,
        marginVertical: 10,

        fontWeight: 'bold',
        color: 'black',
        textDecorationColor:'black',
    },

});

export default CustomInput;