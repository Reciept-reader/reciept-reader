import { React, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Text, Dimensions, ScrollView, ButtonList,TouchableOpacity } from 'react-native';
import tempImage from '../receipts/costco1.png';
import { useNavigation } from '@react-navigation/native'; 
import { mostRecentReceipts } from '../functions/userDataFun';
import CustomButton from '../components/CustomButton/CustomButton';
import AllReceipts from './AllReceipts';
import { dateGrabber } from '../functions/aggregationFun';
import { ProgressChart } from 'react-native-chart-kit';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const Dashboard = ({props, navigation, route}) => {
  const tempPhotos = [
    {url: 'https://placeholder.com/90x160'}
  ]
  const userid = route.params.userid;
  const [Photos, setPhotos] = useState(tempPhotos);
  const ShowImage = (input) => {
    navigation.navigate('ShowImage', {url: input})
  }
  const goToAllReceipts = () => {
    navigation.navigate('AllReceipts', {userid: userid})
  }

/*
  The function 'dateGrab' takes in the userID, a starting date, and an ending date for
  the purpose of formatting the dates to work with the 'dateGrabber' function in aggregationFun.js .
  'dateGrabber' only works when passed two dates of the same month, so 'dateGrab' creates a month start
  and month end date, passes each set through 'dateGrabber', and adds up the sums to return to the user
  */
  const dateGrab = async(userId, startDate, endDate) => {
    let sum = 0;
    let done = 0;
    let newStart = startDate;
    const endMonth = endDate.split('-')[1];

    while (done == 0) {
      let startMonth = newStart.split('-')[1];
      let year = newStart.split('-')[0];
      let nextMonth = '';

      if (parseInt(startMonth, 10) < 9) { 
        nextMonth = (parseInt(startMonth, 10) + 1).toString().padStart(2, '0');
      } else {
        if (parseInt(startMonth, 10) == 9) {
          nextMonth = '10';
        } else if (parseInt(startMonth, 10) == 10) {
          nextMonth = '11';
        } else if (parseInt(startMonth, 10) == 11) {
          nextMonth = '12';
        } else if (parseInt(startMonth, 10) == 12) {
          nextMonth = '01';
        }
      }

      let newEnd = '';
      
      if ( startMonth != endMonth ) {
        if (parseInt(startMonth, 10) == 2){
          newEnd = year + '-' + startMonth + '-' + '28';
        } else if (parseInt(startMonth, 10) == 4) {
          newEnd = year + '-' + startMonth + '-' + '30';
        } else if (parseInt(startMonth, 10) == 6) {
          newEnd = year + '-' + startMonth + '-' + '30';
        } else if (parseInt(startMonth, 10) == 9) {
          newEnd = year + '-' + startMonth + '-' + '30';
        } else if (parseInt(startMonth, 10) == 11) {
          newEnd = year + '-' + startMonth + '-' + '30';
        } else {
          newEnd = year + '-' + startMonth + '-' + '31';
        }

        let total = await dateGrabber(userId, newStart, newEnd);
        if (total < 0) { total = 0 }
        sum += total;
        newStart = year + '-' + nextMonth + '-' + '01';

      } else {
        let total = await dateGrabber(userId, newStart, endDate);
        if (total < 0) { total = 0 }
        sum += total;
        done = 1;
      }
    }
    if (sum < 0) {sum = 0}
    if (isNaN(sum) == true) {sum = 0}
    if (sum > budget) {
      alert("You've Gone Over Budget!");
    }
    newPercent = sum / budget;
    let percentString = newPercent.toFixed(2);
    newPercent = parseInt(percentString);
    fixPercentage(newPercent);
    return sum;
  }

  let budget = 500;
  const [totalSpent, setTotalSpent] = useState('Loading...');
  const [percentage, fixPercentage] = useState(0);

  let today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  const weekStart = startOfWeek.toISOString().substring(0, 10);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() - today.getDay() + 7);
  const weekEnd = endOfWeek.toISOString().substring(0, 10);

  useEffect( () => {
    async function fetchImages() {
      let newPhotos = await mostRecentReceipts(userid, 5);
      if (newPhotos != -1){
        setPhotos(newPhotos);
      }
    }
    async function budgetUpdate() {
      let spendingUpdate = await dateGrab(userid, weekStart, weekEnd);
      let formatSpend = spendingUpdate.toFixed(2);
      setTotalSpent(formatSpend);
    }
    budgetUpdate();
    fetchImages();
}, []);
const setBudget = () => {
  navigation.navigate('ShowBudget')
};
  return (  
    <View style={styles.scrollView}>
    <View>
      <Text style={styles.title}>Budget: ${totalSpent} / ${budget}</Text>
      <ProgressChart
        labels={['January']}
        data={[percentage]}
        width={Dimensions.get('window').width}
        strokeWidth={25}
        height={220}
        chartConfig={{
          formatYLabel: (value) => `$${value}`,
          backgroundColor: '#f2f2f2',
          backgroundGradientFrom: '#f2f2f2',
          backgroundGradientTo: '#f2f2f2',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(64, 76, 207, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={{ flexDirection:"row"}}>
        <CustomButton text ="Set Budget" onPress={setBudget}/>
      </View>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <ScrollView horizontal={true} style={{flex: 1}}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {Photos.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => ShowImage(image.url)}>
              <Image source={{uri:image.url}} style={styles.item}/>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={goToAllReceipts}>
        <Text style={styles.buttonText}>...</Text>
      </TouchableOpacity>
    </View>
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
