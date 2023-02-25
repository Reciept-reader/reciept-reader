import React from 'react'
import { View, Text, TextInput, StyleSheet} from 'react-native'

const CustomInput = ({value, setValue, placeholder,secureTextEntry}) => {
    return (
        <View style= {styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            style={styles.input} 
            secureTextEntry={secureTextEntry}
            autoCapitalize='none'
            />
            <Text style={styles.text}></Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        
        height: 40,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
 
    input:{
        fontWeight: 'bold',
        color: 'black',
        textDecorationColor:'black',
    },

});

export default CustomInput;