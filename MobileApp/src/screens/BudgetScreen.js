import { Text, View, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton/CustomButton';
import { updateBudget, insertReceipt } from '../functions/userDataFun';
import { useNavigation } from '@react-navigation/native'; 


const Budget = ({ props, route, navigation }) => {
    const [budgetPrice, onChangeBudget] = useState(500);
    const userid = route.params.userid;

    const newBudget = async() => {
        let updater = await updateBudget(0, 500);
        alert(updater);
    }

    return (
        <View style={styles.view} >
            <Text> Change Your Budget Below (in $): </Text>
            <TextInput 
                style={styles.input}
                placeholder = '500'
                value = {budgetPrice}
                onChangeText = {onChangeBudget}
            />
            <View style={{width: '100%'}}>
                <CustomButton onPress={ () => newBudget()}text="Update Budget"></CustomButton>
            </View>
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
