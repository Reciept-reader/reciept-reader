import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Logo from '../../assets1/logo2.png';
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen() {
    const navigation = useNavigation();

    const onSignInPressed =() => {
        navigation.navigate('About')
        };
    return (

        <View>
        
        <CustomButton text ="Sign In" onPress={onSignInPressed}/>
</View>

        

    );
  }

export default ProfileScreen;