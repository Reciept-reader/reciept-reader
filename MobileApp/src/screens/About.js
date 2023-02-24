import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import { Image, StyleSheet, useWindowDimensions} from 'react-native';

function About() {

  const staffMembers = [
    {
      name: 'Brian',
      image: require('../../assets1/Brian.png'),
    },
    {
      name: 'Ibrahim',
      image: require('../../assets1/Ibrahim.png'),
    },
    {
      name: 'Jacob',
      image: require('../../assets1/Jacob.png'),
    },
    {
      name: 'Ichinnorov',
      image: require('../../assets1/Ichinnorov.png'),
    },
    {
      name: 'Jatinder',
      image: require('../../assets1/Jatinder.png'),
    },
    {
      name: 'Julio',
      image: require('../../assets1/Julio.png'),
    },
    {
      name: 'Mason',
      image: require('../../assets1/Mason.png'),
    },
    {
      name: 'Nathanael',
      image: require('../../assets1/Nathanael.png'),
    },
    {
      name: 'William',
      image: require('../../assets1/William.png'),
    },
  ];

    return (
      <View style={styles.container}>
      <Text style={styles.content}>CWU - Reciept Reader Project</Text>
      <Text style={styles.title}>Meet Our Team</Text>
      <View style={styles.staffContainer}>
        {staffMembers.map((staffMember, index) => (
          <View key={index} style={styles.staffItem}>
            <Image style={styles.staffImage} source={staffMember.image} />
            <Text style={styles.staffName}>{staffMember.name}</Text>
          </View>
        ))}
      </View>
        
      </View>
    );
  }
  const styles = StyleSheet.create( {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    staffContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    staffItem: {
      alignItems: 'center',
      margin: 10,
    },
    staffImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 5,
    },
    staffName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    content:{
      fontSize: 20,
      marginBottom: 20,

    },
});
export default About;