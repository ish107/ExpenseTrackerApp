import React from 'react';
import { SafeAreaView, StatusBar,StyleSheet,useColorScheme ,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  { createNativeStackNavigator } from '@react-navigation/native-stack'
import Ionicons from 'react-native-vector-icons/Ionicons';

import ManageExpenses from './src/screens/ManageExpense';
import RecentExpenses from './src/screens/RecentExpenses';
import AllExpenses from './src/screens/AllExpenses';
import { ColorsList } from './util/Colors';
import IconBtn from './components/UI/IconBtn';
import ExpensesContextProvider from './src/store/expenses-context';
function App(): React.JSX.Element {

  /*const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/

  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  function ExpensesOverview(){
    return(
      <BottomTabs.Navigator  screenOptions={({navigation})=>({
          headerStyle:{backgroundColor: ColorsList.primary500},
          headerTintColor: 'white',
          tabBarStyle:{backgroundColor:ColorsList.primary500},
          tabBarActiveTintColor: ColorsList.accent500,
          headerRight:({tintColor}) => <IconBtn 
            icon='add' 
            size={24} 
            color={tintColor} 
            onPress={()=>{
              navigation.navigate('ManageExpense')
            }}/>
        })}>
        <BottomTabs.Screen 
          name='RecentExpenses' 
          component={RecentExpenses} 
          options={{
            title: 'Recent Expenses',
            tabBarLabel:'Recent',
            tabBarIcon:({color,size})=><Ionicons name="time" size={size} color={color}/>
          }}
        />
        <BottomTabs.Screen 
          name='AllExpenses' 
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel:'All Expenses',
            tabBarIcon:({color,size})=><Ionicons name="cash" size={size} color={color}/>
          }}
          />
      </BottomTabs.Navigator>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={ColorsList.primary500} barStyle='light-content'/>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle:{backgroundColor:ColorsList.primary500},
              headerTintColor:'white'
            }}
          >
            <Stack.Screen options={{headerShown:false}} name='ExpensesOverview' component={ExpensesOverview}/>
            <Stack.Screen name="ManageExpense" component={ManageExpenses}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default App;
