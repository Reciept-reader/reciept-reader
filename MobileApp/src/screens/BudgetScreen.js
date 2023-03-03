import { Text, View, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton/CustomButton';
import { updateBudget, insertReceipt } from '../functions/userDataFun';
import { useNavigation } from '@react-navigation/native'; 

//Simple screen to let the user change their set budget
const Budget = ({ props, route, navigation }) => {
    //Variables for the userid as well as storing and updating the new budget
    const [budgetPrice, onChangeBudget] = useState(500);
    const userid = route.params.userid;

    /*
        Function to be called on button press that reads the text inside the text box and 
        updates the user's budget in the database. If the user inputs something that isn't a number, it throws an error.
        If the user inputs a number, it updates the budget in the database 
        and send the user back to the homescreen.
    */
    const newBudget = async() => {
        if (isNaN(parseInt(budgetPrice)) == true ) {
            alert('Please input a number.');
        } else {
            let updater = await updateBudget(userid, budgetPrice);
            navigation.replace('HomeScreen', {userid: userid});
        }
    }

    //Objects inside the budget screen window. Has a title, text box, and submission button
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

//Style sheet fot the budget screen
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
