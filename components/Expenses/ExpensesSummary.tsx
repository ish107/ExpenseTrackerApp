import { View, Text, StyleSheet} from "react-native";

import { Expense } from "../../Types/Expense";
import { ColorsList } from "../../util/Colors";

type ExpensesSummaryProps = {
    expenses : Expense[],
    periodName: string
}

function ExpensesSummary(props:ExpensesSummaryProps): React.JSX.Element{
    const {expenses, periodName} = props;
    const expenseSum = expenses.reduce((sum:number,expense:Expense)=>{
        return sum + expense.amount
    },0)

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{periodName}</Text>
            <Text style={styles.text}>${expenseSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:8,
        backgroundColor:ColorsList.primary50,
        borderRadius: 6,
    },
    text:{
        fontSize:16,
        color: ColorsList.primary500,
        fontWeight:'bold'
    }
})