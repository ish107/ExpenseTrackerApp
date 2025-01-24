import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RouteProp } from "@react-navigation/native";

type StackParamList={
    ExpensesOverview : undefined
    ManageExpense: {expenseId : string|undefined}
}

export type ManageExpenseNavigationProp = NativeStackNavigationProp<
    StackParamList, 'ManageExpense'
>;

export type ManageExpenseRouteProp = RouteProp<
    StackParamList,'ManageExpense'
>;
