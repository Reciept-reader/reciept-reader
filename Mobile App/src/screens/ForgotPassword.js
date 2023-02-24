import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Button } from 'react-native';
import Logo from '../../assets1/logo2.png';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';

function ForgotPassword() {
    const { height } = useWindowDimensions();
    const [username, setUsername] = useState({
        user:'',
        passeord:'',
        confirmPassword: ''
    });
    const [password, setPassword] = useState('')

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

            value={password}
            setValue={setPassword}
            secureTextEntry={true}
        />
        <CustomButton text="Reset" />


     {/* <Button tyle={styles.buttonContainer2} title="Forgot your password?" onPress={onForgotPassswordPressed} />
        <CustomButton text="Sign In" onPress={onSignInPressed} />
       
    <CustomButton text="Sign up" onPress={onSignInPressed} /> */}


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
 
export default ForgotPassword;