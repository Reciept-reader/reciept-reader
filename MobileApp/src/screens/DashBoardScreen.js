import { React } from 'react';
import { View, FlatList, Image, StyleSheet, Text, Dimensions, ScrollView, ButtonList,TouchableOpacity } from 'react-native';
import tempImage from '../receipts/costco1.png';
import { useNavigation } from '@react-navigation/native'; 
import Photos from '../components/Photos'

const images = [
  {id: '1'},
  {id: '2'},
  {id: '3'},
  {id: '4'},
  {id: '5'},
];
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const Dashboard = (props) => {

  const navigation = useNavigation();

    return (  
      <View style={styles.scrollView}>
        <Text style={styles.title}>Budget $500</Text>
      
      <Text style={styles.title}>Previous Receipts</Text>
      <ScrollView horizontal={true} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      
      {Photos.map((image, index) => (

      <TouchableOpacity key ={index} onPress ={() => {
            props.navigation.navigate('ShowImage', {url: image.url})
          }}>
          <Image source ={image.url} style={styles.item}/>

          

          </TouchableOpacity>
         
      )  )  
      
      
      
      }
      
      {/* <FlatList
        horizontal
        data={images}
      
        renderItem={({item}) => {
         return <TouchableOpacity onPress={()=> onShowImage()}>
         

            <Image
              source={tempImage}
              style={styles.item}
            />
          </TouchableOpacity>
        }}
        keyExtractor={item => item.id}
      /> */}
    
      </ScrollView>
      </View>
    );  
  }


const styles = StyleSheet.create({
  container: {
  },
  item: {
    backgroundColor: '#a9a9ac',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 160,
    width: 90,
    
  },
  title: {
    padding: 20,
    fontSize: 32,

  },
  scrollView: {
    marginHorizontal: 20,
  }
});
  
export default Dashboard;