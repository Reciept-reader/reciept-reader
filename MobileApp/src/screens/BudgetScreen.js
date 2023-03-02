import { Text, View, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton/CustomButton';

import { insertReceipt } from '../functions/userDataFun';

const Budget = ({ route }) => {
    const [budgetPrice, onChangeBudget] = useState('')


    return (
        <View style={styles.view} >
            <Text> Change Your Budget Below: </Text>
           <TextInput 
                style={styles.input}
                placeholder = '$500'
                value = {budgetPrice}
                onChangeText = {onChangeBudget}
            />
        </View>
    )
}

const styles = StyleSheet.create( {
    view: {
        alignItems: 'center',
        padding:20,
        paddingBottom:40,  
    },
    input:{
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
    header:{
        fontSize: 36,
    },
});
export default Budget;
