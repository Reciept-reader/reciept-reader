import { React, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView,TouchableOpacity } from 'react-native';
import { getReceipts } from '../functions/userDataFun';

const AllReceipts = ({ navigation, route }) => {
    const tempPhotos = [
        {url: 'https://placeholder.com/90x160'}
      ]
      const userid = route.params.userid;
      const [Photos, setPhotos] = useState(tempPhotos);
      const ShowImage = (input) => {
        navigation.navigate('ShowImage', {url: input})
      }
    useEffect( () => {
        async function fetchImages() {
        let newPhotos = await getReceipts(userid);
        if (newPhotos != -1) {
          setPhotos(newPhotos);
        }
        }
        fetchImages();
    }, []);

      
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Receipts</Text>
      <ScrollView horizontal={false} contentContainerStyle={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
    
    {Photos.map((image, index) => (

    <TouchableOpacity key ={index} onPress={() => ShowImage(image.url)}>
        <Image source={{uri:image.url}} style={styles.item}/>

        </TouchableOpacity>
        
    ))  
    }   
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default AllReceipts;