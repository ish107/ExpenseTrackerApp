import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Expense } from "../../src/Types/Expense";
import { ColorsList } from "../../util/Colors";
import { ManageExpenseNavigationProp } from "../../src/Types/NavigationProps";
import React from "react";

type ExpenseItemProps = {
    expense : Expense
}

function ExpenseItem({expense}:ExpenseItemProps):React.JSX.Element{
    const navigation = useNavigation<ManageExpenseNavigationProp>();
    
    function expensePressHandler(){
        navigation.navigate('ManageExpense',{expenseId: expense.id})
    }

    return(
        <Pressable onPress={expensePressHandler} style={({pressed})=>pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View >
                    <Text style={styles.detailContainer}>{expense.description}</Text>
                    <Text style={{color:ColorsList.primary50}}>{expense.date.toDateString()}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:12,
        marginVertical:8,
        backgroundColor:ColorsList.primary500,
        borderRadius:6,
        elevation:3
    },
    detailContainer:{
        fontSize:16,
        marginBottom:4,
        fontWeight:'bold',
        color:ColorsList.primary50
    },
    amountContainer:{
        minWidth:80,
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8
    },
    amount:{
        color:ColorsList.primary500,
        fontWeight:'bold'
    },
    pressed:{
        opacity:0.7
    }

})