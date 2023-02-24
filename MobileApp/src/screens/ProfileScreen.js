import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Logo from '../../assets1/logo2.png';
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen() {
    const navigation = useNavigation();

    const onSignInPressed =() => {
        navigation.navigate('SignIn')
        };

        const onAboutPressed =() => {
            navigation.navigate('About')
            };
    return (

        <View style={style.cotainer}>
            <View style={style.infoContainer}>
                <Text style={style.header} >Welcome</Text>
                <Text style={style.userInfo}>User Name:</Text>
                <Text style={style.userInfo}>Reciept Amount:</Text>
            </View>
            
            <View style = {style.buttonsContainer}>
                <CustomButton style={style.aboutButton} text ="About" onPress={onAboutPressed}/>
                <CustomButton style={style.exitButton} text ="Sign Out" onPress={onSignInPressed}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex: 0,
        backhroundColor: "FFFFFF",
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