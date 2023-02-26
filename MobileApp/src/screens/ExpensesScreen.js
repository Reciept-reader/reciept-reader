import { Text, View } from 'react-native';
function ExpensesScreen({ route, navigation }) {
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
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Expenses !!</Text>
    </View>
  );
}
export default ExpensesScreen;