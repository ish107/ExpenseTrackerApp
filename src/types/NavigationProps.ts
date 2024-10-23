import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type BottomTabParamList={
    RecentExpenses :{userId:string}
}

type StackParamList={
    ExpensesOverview : {userId : string}
    ManageExpense: {expenseId : string|undefined, userId: string}
    SignUp: undefined;  
    LogIn: undefined; 
}

export type ManageExpenseNavigationProp = NativeStackNavigationProp<
    StackParamList, 'ManageExpense'
>;

export type ManageExpenseRouteProp = RouteProp<
    StackParamList,'ManageExpense'
>;

export type SignUpNavigationProp = NativeStackNavigationProp<
    StackParamList, 'SignUp'
>;

export type LogInNavigationProp = NativeStackNavigationProp<
    StackParamList, 'LogIn'
>;
export type ExpensesOverviewRouteProp = RouteProp<
    StackParamList,'ExpensesOverview'
>;

export type RecentExpensesRouteProp = RouteProp<
    BottomTabParamList,'RecentExpenses'
>;