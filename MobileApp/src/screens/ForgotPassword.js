import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Button } from 'react-native';
import Logo from '../../assets1/logo2.png';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { forgotPassword } from '../functions/accountFun';

function ForgotPassword() {
    const { height } = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_check, setPassword_check] = useState('');
    const navigation = useNavigation();

    onResetPressed = async (user, pass1, pass2) => {
        // check to see if all fields have data
        if (user == '' && pass1 == '' && pass2) {
            alert('Please provide a username and password')
        }
        else if (user == '') {
            alert('Please provide a username')
        }
        else if (pass1 == '' || pass2 == '') {
            alert('Please provide both passwords')
        }
        else if (pass1 != pass2) {
            alert('Both passwords must match')
        }
        else {
            try {
            retVal = await forgotPassword(user, pass1)
            retVal = JSON.parse(retVal)
            //alert(retVal)
            if(retVal == 0) {
                alert('Password Successfully Changed.')
                navigation.replace('Sign In')
            }
            else {
                alert('Password unable to be updated')
            }
            } catch (error) {
                alert("Unable to change password")
            }
        }
    };

    return (
        <View style={styles.root}>
        <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
        />
        <CustomInput 
            placeholder="Username"
            value={username}
            setValue={setUsername}
        />
        <CustomInput
            placeholder="Create password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
        />
        <CustomInput
            placeholder="Confirm Password"
            value={password_check}
            setValue={setPassword_check}
            secureTextEntry={true}
        />
        <View style={{ width: '100%', marginTop: 10 }}>
        <CustomButton text="Reset"  onPress={ () => onResetPressed(username, password, password_check)}/>
        </View>
    </View>
    );
  }
  const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
        height:'100%',
        backgroundColor:'#051549'

    },
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 200,
    },
    buttonContainer2: {

        width: 70,
        height: 70,
 
        borderRadius: 50,
        backgroundColor: '#fff',
        flex:1,
        position:'absolute',
        alignSelf:'center'
      },
});
 
export default ForgotPassword;