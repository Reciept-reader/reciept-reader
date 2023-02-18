import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import { Image, StyleSheet, useWindowDimensions} from 'react-native';

function About() {
  const {height} = useWindowDimensions();
    return (
      <View style={{ flex: 1, alignItems: 'left' }}>
        {/* <Text>CWU studnets -Project Receipt Reader</Text> */}
        <Avatar
  rounded
 
  style={[styles.logo, {height : height * 0.3}]}
/>





      </View>
    );
  }
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
export default About;