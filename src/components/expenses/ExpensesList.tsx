import { FlatList} from "react-native";

import { Expense } from "../../types/Expense";
import ExpenseItem from "./ExpenseItem";
import React from "react";

type ExpenseListProps = {
  expenses : Expense[]
}
function renderExpenseItem(item:Expense){
      return (
        <>
          <ExpenseItem expense={item}/>
        </>
    )
}
function ExpensesList({expenses}:ExpenseListProps):React.JSX.Element{

    return(
      <FlatList
        data={expenses}
        renderItem = {({item})=>renderExpenseItem(item)}
        keyExtractor={item=>item.id}
      />
    )
}

export default ExpensesList;