import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Button } from 'react-native';
import Logo from '../../assets1/logo2.png';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import { signIn } from '../functions/accountFun';


// import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

const SignInScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { height } = useWindowDimensions();
    
    onSignInPressed = async (user, pass) => {
        
    //check to see if all fields have data
        if (user == '' && pass == '') {
            alert('Please provide a username and password')
        }
        else if (user == '') {
            alert('Please provide a username')
        }
        else if (pass == '') {
            alert('Please provide a password')
        }
        else {
            try {
                retVal = await signIn(user, pass)
                if (retVal.user_id == -1) {
                    throw "-1"
                } else {
                    navigation.replace('HomeScreen', {userid: retVal.user_id})
                }
            } catch (error) {
                alert("Invalid login credentials")
            }
        }
    };

    
    onCreateAccountPressed = () => {
        navigation.navigate('CreateAccount')
    };
    
    const onForgotPassswordPressed = () => {
        navigation.navigate('ForgotPassword')
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
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />

            <View style={{color:'#fff'}}>
         <Button style={{color:'#fff'}} title="Forgot your password?" onPress={onForgotPassswordPressed} />
         </View>
         <View style={{ width: '100%' }}>
            <CustomButton  text="Sign In" onPress={ () => onSignInPressed(username, password)} />
            <CustomButton text="Create Account" onPress={ () => onCreateAccountPressed()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#051549',
        height: '100%'

    },
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 200,
    

    },
    buttonContainer2: {

        width: '100%',
        height: 70,
        color:'#fff',
        borderRadius: 50,
        backgroundColor: '#fff',
        
        position:'absolute',
        alignSelf:'right'
      },
      
});

export default SignInScreen;