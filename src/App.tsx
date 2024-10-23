import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

import ManageExpenses from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import {ColorsList} from './util/Colors';
import IconBtn from './components/ui/IconBtn';
import ExpensesContextProvider from './store/expenses-context';
import Profile from './screens/Profile';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import {useUserStore} from './store/auth-store';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  const userId = useUserStore(state => state.userId);
  const updateUser = useUserStore(state => state.updateUser);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        updateUser(authUser.uid);
      }
    });
    return subscriber;
  }, [userId]);

  function ExpensesOverview() {
    return (
      <BottomTabs.Navigator
        screenOptions={({navigation}) => ({
          headerStyle: {backgroundColor: ColorsList.primary500},
          headerTintColor: 'white',
          tabBarStyle: {backgroundColor: ColorsList.primary500},
          tabBarActiveTintColor: ColorsList.accent500,
          headerRight: ({tintColor}) => (
            <IconBtn
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate('ManageExpense');
              }}
            />,
        })}>
        <BottomTabs.Screen
          name="RecentExpenses" 
          component={RecentExpenses}
          //initialParams={{userId:user.uid}}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="time" size={size} color={color} />,
          }}
        />
        <BottomTabs.Screen
          name="AllExpenses" 
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="cash" size={size} color={color} />,
          }}
          }}
        />
        <BottomTabs.Screen
          name="Profile" 
          component={Profile}
          options={{
            title: 'Manage Profile',
            tabBarLabel: 'Profile ',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}

      </BottomTabs.Navigator>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={ColorsList.primary500}
        barStyle="light-content"
      />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: ColorsList.primary500},
              headerTintColor: 'white',
            }}>
            {userId ? (
              // User is authenticated, navigate to ExpensesOverview
              <>
                <Stack.Screen
                  name="ExpensesOverview"
                  component={ExpensesOverview}
                  options={{headerShown: false}}
                />
                <Stack.Screen name="ManageExpense" component={ManageExpenses} />
              </>
            ) : (
              // User is not authenticated, show LogIn screen
              <>
                <Stack.Screen
                  name="LogIn"
                  component={LogIn}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
