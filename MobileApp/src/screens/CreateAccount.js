import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Button } from 'react-native';
import Logo from '../../assets1/logo2.png';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import {signUp} from '../functions/accountFun'
import { useNavigation } from '@react-navigation/native';

function Signup() {
    const { height } = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_check, setPassword_check] = useState('')
    const navigation = useNavigation();

    const onSignUpPressed = async (user, pass1, pass2) => {
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
            retVal = await signUp(user, pass1)
            retVal = JSON.parse(retVal)
            alert(`Welcome: ${retVal.username} User ID is : ${retVal.user_id}`)
            navigation.navigate('HomeScreen')
            } catch (error) {
                alert("Invalid login credentials")
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
        <CustomButton text="Sign Up" onPress={ () => onSignUpPressed(username, password, password_check)} />
    </View>
    );
  }

  const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,

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
 
export default Signup;