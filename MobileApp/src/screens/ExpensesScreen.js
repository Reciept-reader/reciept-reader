import React, { useState } from 'react';
import { View, Button, StyleSheet} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import CustomButton from '../components/CustomButton/CustomButton';
import { Dimensions } from 'react-native';
import { dateGrabber } from '../functions/aggregationFun';

//Chart configuration for the barchart object
const chartConfig = {
  backgroundColor: '#f5f5f5',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2,
  color: (opacity = 100) => `rgba(64, 76, 207, ${opacity})`, // Black bars
  style: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dcdcdc' // Light gray border
  }
};

//Screen to display expenses for the user
const ExpensesScreen = ({ route, navigation }) => {
  /**
   * the function "ExpensesScreen" takes in two parameters:
   * route, and navigation. Navigation allows you to navigate to other pages,
   * route is the payload that comes with the navigation. Currently the payload
   * from "SignInScreen" is the "userid" attribute. This attribute gets passed 
   * to the home screen and then through the "TabNavigator" to Expenses Screen.
   * This user_id is currently set to alert whenever you click on the Expenses
   * Screen. The payload on this screen is called "userParams" 
   */
  const userParams = route.params;
  //alert(userParams.userid);
  
  //Creates an empty BarChart object
  const [data, setData] = useState({
    labels: ['', '', '', ''],
    datasets: [
      {
        data: [0, 0, 0, 0],
      },
    ],
  });

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

    /*
      This while loops finds the start and end dates for the months between the original start and
      end dates that were passed into the function, and then passes them into the dateGrabber function
      to get the sum for each individual time span, and adds them together.
    */
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
    //If sum is less than 0 or is not a number, set sum to 0
    if (sum < 0) {sum = 0}
    if (isNaN(sum) == true) {sum = 0}
    
    //Returns the budget
    return sum;
  }

  //Function that updates the chart to show the expenses for the current week and the previous 3 weeks
  const updateWeekly = async () => {
    let newData = [0,0,0,0];
    let i = 3;
    let today = new Date();

    //While loop that finds the start and end dates for each week
    while (i > 0) {

      //Calculate the start of the week
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  
      //Calculate the end of the week
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() - today.getDay() + 7);
  
      //Format the dates as strings in the format YYYY-MM-DD
      const startDate = startOfWeek.toISOString().substring(0, 10);
      const endDate = endOfWeek.toISOString().substring(0, 10);

      //Adds the returned sum to the data array to be used for the chart
      newData[i] = await dateGrab(userParams.userid, startDate, endDate);
      i--;
      
      //Adjusts the day to allow the loop to calculate the next week
      today.setDate(today.getDate() - 7);
    }
    
    //Updates the labels
    const newLabels = ['W1', 'W2', 'W3', 'W4'];
    
    //Sends the new chart data and labels to the chart
    setData({ labels: newLabels, datasets: [{ data: newData, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})` }] });
  };

  //Function that updates the chart to show the expenses for the current month and the previous 3 months
  const updateMonthly = async () => {
    const today = new Date();
    let newData = [0, 0, 0, 0];
    let a = 3;
    
    //For loop that finds the start and end dates for each month
    for (let i = 0; i < 3; i++) {

      //Calculate the start of the month
      const startOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);

      //Calculate the end of the month
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);

      //Format the dates as strings in the format YYYY-MM-DD
      const startDate = startOfMonth.toISOString().substring(0, 10);
      const endDate = endOfMonth.toISOString().substring(0, 10);

      //Adds the returned sum to the data array to be used for the chart
      newData[a] = await dateGrab(userParams.userid, startDate, endDate);
      a--;
    }
    
    //Updates the labels
    const newLabels = ['M1', 'M2', 'M3', 'M4'];
    
    //Sends the new chart data and labels to the chart
    setData({ labels: newLabels, datasets: [{ data: newData, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})` }] });
  };

  //Function that updates the chart to show the expenses for the current quarter and the previous 3 quarters
  const updateQuarter = async () => {
    const today = new Date();
    let a = 3;
    let newData = [0,0,0,0];

    //For loop that finds the start and end dates for each quarter
    for (let i = 0; i < 4; i++) {
    
      //Calculate the start and end dates of the quarter
      const startQuarter = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3 - 3 * i, 1);
      const endQuarter = new Date(startQuarter.getFullYear(), startQuarter.getMonth() + 3, 0);
      
      //Format the dates as strings in the format YYYY-MM-DD
      const startDate = startQuarter.toISOString().substring(0, 10);
      const endDate = endQuarter.toISOString().substring(0, 10);

      //Adds the returned sum to the data array to be used for the chart
      newData[a] = await dateGrab(userParams.userid, startDate, endDate);
      a--;
    }
    
    //Updates the labels
    const newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    //Sends the new chart data and labels to the chart
    setData({ labels: newLabels, datasets: [{ data: newData, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})` }] });
  };

  //Function that updates the chart to show the expenses for the current year and the previous 3 years
  const updateYearly = async () => {
    const today = new Date();
    let a = 3;
    let newData = [0,0,0,0];

    //For loop that finds the start and end dates for each year
    for (let i = 0; i < 4; i++) {
      const year = today.getFullYear() - i;
      
      //Calculate the start and end dates of the year
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31);

      //Format the dates as strings in the format YYYY-MM-DD
      const startDate = startOfYear.toISOString().substring(0, 10);
      const endDate = endOfYear.toISOString().substring(0, 10);
      
      //Adds the returned sum to the data array to be used for the chart      
      newData[a] = await dateGrab(userParams.userid, startDate, endDate);
      a--;
    }

    //Updates the labels
    const newLabels = ['Y1', 'Y2', 'Y3', 'Y4'];
    
    //Sends the new chart data and labels to the chart
    setData({ labels: newLabels, datasets: [{ data: newData, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})` }] });
  };
  
  /*
    The layout for the expenses screen. There is a chart 
    and 4 buttons that update the chart with unique information from the database
  */
  return (
    <View style={style.container}>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 50}
        height={400}
        contentInset={{ top: 50, bottom: 50 }}
        yAxisLabel="$"
        fromZero
        chartConfig={chartConfig}
      />

      <View style={style.allButtons}>
        <View style={style.button}>
          <CustomButton text="Weekly" onPress={updateWeekly}/>
        </View>
        <View style={style.button}>
          <CustomButton text="Monthly" onPress={updateMonthly}/>
        </View>
      </View>
      <View style={{ flexDirection:"row"}}>
        <View style={style.button}>
          <CustomButton text ="Quarterly" onPress={updateQuarter}/>
        </View>
          <View style={style.button}>
            <CustomButton text ="Yearly" onPress={updateYearly}/>
          </View>
      </View>
    </View>
  );  
};

//Style sheet for the expenses page
const style = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: "FFFFFF",
      alignItems: 'center',
      height: '100%',
      padding: 24
  },
  allButtons:{
    flexDirection:"row", 
    marginTop: 10, 
    flexWrap: 'wrap',
  },
  button: {
    width: '50%'
  }
})


export default ExpensesScreen;
