import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Logo from '../../assets1/logo2.png';
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import  {usernameAndCount}  from '../functions/userDataFun.js';

function ProfileScreen({ route, navigation}) {

    const userid = route.params.userid;
    
    const [username, setUsername] = useState('');
    const [recieptCount, setRecieptCount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try{
                const {username, receipt_count} = await usernameAndCount(userid);
                setUsername(username);
                setRecieptCount(receipt_count);
            }
            catch(error){
                alert("Error fetching data:",  error);
            }
        }
        fetchData();
    }, [userid]);

    const onSignOutPressed = () => {
        navigation.replace('Sign In')
        };

    const onAboutPressed = () => {
        navigation.navigate('About')
        };
    return (

        <View style={style.container}>
            <View style={style.infoContainer}>
                <Text style={style.header} >Welcome</Text>
                <Text style={style.userInfo}>User Name: {username}</Text>
                <Text style={style.userInfo}>Reciept Amount: {recieptCount} </Text>
            </View>
            
            <View style = {{width: "40%"}}>
                <CustomButton style={style.aboutButton} text ="About" onPress={onAboutPressed}/>
                <CustomButton style={style.exitButton} text ="Sign Out" onPress={onSignOutPressed}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex: 0,
        backhroundColor: "FFFFFF",
        alignItems: 'center'
    },

    userInfo:{
        fontSize:20,
        textAlignVertical: "center",
        textAlign:"center",

    },
    header:{
        fontSize: 40,
        fontWeight:'bold',
        textAlignVertical: "center",
        textAlign:"center",
    },
    
    infoContainer:{
        marginTop: 50,
        marginBottom: 20,

    },

    buttonsContainer:{
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    exitButton:{
        backgroundColor: 'red',
    },
})

export default ProfileScreen;