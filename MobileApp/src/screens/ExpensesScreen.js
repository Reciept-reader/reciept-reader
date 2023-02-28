import React, { useState } from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import CustomButton from '../components/CustomButton/CustomButton';
import { Dimensions } from 'react-native';
import { dateGrab } from '../functions/aggregationFun';

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
  alert(userParams.userid);
  
  const [data, setData] = useState({
    labels: ['', '', '', ''],
    datasets: [
      {
        data: [0, 0, 0, 0],
      },
    ],
  });

  
  const updateWeekly = async () => {
    let newData = [0,0,0,0];
    let i = 3;
    let today = new Date();

    while (i > 0) {

      // Calculate the start of the week (Sunday)
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  
      // Calculate the end of the week (Saturday)
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() - today.getDay() + 7);
  
      // Format the dates as strings in the format YYYY-DD-MM
      const startDate = startOfWeek.toISOString().substring(0, 10);
      const endDate = endOfWeek.toISOString().substring(0, 10);

      let sum = await dateGrab(3, startDate, endDate);
      if (sum == -1) { sum = 0 }

      newData[i] = sum;
      today.setDate(today.getDate() - 7);
      i--;
    }
      
    const newLabels = ['W1', 'W2', 'W3', 'W4'];
    setData({ labels: newLabels, datasets: [{ data: newData, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})` }] });
  };

  const updateMonthly = async () => {
    const today = new Date();
    let newData = [0, 0, 0, 0];
    let a = 3;
    
    for (let i = 0; i < 3; i++) {

      const startOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);

      const endOfMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);

      const startDate = startOfMonth.toISOString().substring(0, 10);
      const endDate = endOfMonth.toISOString().substring(0, 10);
      alert(`${startDate} & ${endDate}`);
      let sum = await dateGrab(3, startDate, endDate);
      if (sum == -1) { sum = 0 }

      newData[a] = sum;
      a--;
    }
    
    const newLabels = ['M1', 'M2', 'M3', 'M4'];
    setData({ labels: newLabels, datasets: [{ data: newData, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})` }] });
  };

  const updateQuarter = async () => {
    const today = new Date();
    let a = 3;

    // Loop through the previous three quarters
    for (let i = 0; i < 4; i++) {
      // Calculate the start and end dates of the quarter
      const startQuarter = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3 - 3 * i, 1);
      const endQuarter = new Date(startQuarter.getFullYear(), startQuarter.getMonth() + 3, 0);
      
      // Convert the dates to the required format
      const startDate = startQuarter.toISOString().substring(0, 10);
      const endDate = endQuarter.toISOString().substring(0, 10);

      let sum = await dateGrab(3, startDate, endDate);
      if (sum == -1) { sum = 0 }
      
      newData[a] = sum;
      a--;
    }
    const newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
    setData({ labels: newLabels, datasets: [{ data: newData, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})` }] });
  };

  const updateYearly = () => {

    const newData = [3, 3, 2, 2];
    const newLabels = ['Y1', 'Y2', 'Y3', 'Y4'];
    setData({ labels: newLabels, datasets: [{ data: newData, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})` }] });
  };

  const updateStore = () => {

    const newData = [4, 3, 2, 1];
    const newLabels = ['Walmart', 'Safeway', 'Fred Meyer', 'Best Buy'];
    setData({ labels: newLabels, datasets: [{ data: newData, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})` }] });
  };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 50}
        height={400}
        contentInset={{ top: 50, bottom: 50 }}
        yAxisLabel="$"
        fromZero
        chartConfig={chartConfig}
      />
      <CustomButton text ="Weekly" onPress={updateWeekly}/>
      <CustomButton text ="Monthly" onPress={updateMonthly}/>
      <CustomButton text ="Quarterly" onPress={updateQuarter}/>
      <CustomButton text ="Yearly" onPress={updateYearly}/>
      <CustomButton text ="Top Stores" onPress={updateStore}/>
    </View>
  );
};

export default ExpensesScreen;
