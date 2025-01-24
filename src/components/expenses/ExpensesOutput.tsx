import { View , Text, StyleSheet} from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../types/Expense";
import { ColorsList } from "../../util/Colors";


type ExpensesOutputProps = {
    expenses : Expense[],
    expensesPeriod : string
    fallbackText : string
}
function ExpensesOutput(props:ExpensesOutputProps):React.JSX.Element{

    const { expenses,expensesPeriod,fallbackText} = props;

    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if(expenses.length>0){
        content = <ExpensesList expenses = {expenses}/> 
    }

    return(
        <View style={styles.container}>
            <ExpensesSummary expenses = {expenses} periodName = {expensesPeriod} />
            {content}     
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:0,
        backgroundColor: ColorsList.primary700
    },
    infoText:{
        textAlign:'center',
        fontSize:16,
        marginTop:32,
        color:'white'
    }
})