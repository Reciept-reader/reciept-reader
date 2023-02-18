import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../assets1/logo2.png';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';

import { NavigationContainer } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

const SignInScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const {height} = useWindowDimensions();

    const navigation = useNavigation();
    const onSignInPressed =() => {
    navigation.navigate('HomeScreen')
    };
    const onForgotPassswordPressed =() => {
        navigation.navigate('HomeScreen')
    };
    return (
        <View style={styles.root}>
            <Image 
            source ={Logo} 
            style ={[styles.logo, {height : height * 0.3}]}
            resizeMode="contain"

            />
            <CustomInput 
            placeholder="Username"
            
            value={username} 
            setValue={setUsername}
             />
            <CustomInput 
            placeholder = "Password"
            
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            />
  
            <CustomButton text ="Sign In" onPress={onSignInPressed}/>
            {/* <CustomButton text ="Forgot Password" onPress={}/> */}

        </View>
    );
};

const styles = StyleSheet.create( {
    root: {
       alignItems: 'center',
       padding:20,
        paddingBottom:40,
       
    },
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 200,
    },
});

export default SignInScreen;