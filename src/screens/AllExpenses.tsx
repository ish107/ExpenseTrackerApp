import React, { useContext } from "react";

import ExpensesOutput from "../../components/Expenses/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";


function AllExpenses() : React.JSX.Element{
    const expensesCtx = useContext(ExpenseContext);
    return(
        <ExpensesOutput 
            expenses={expensesCtx.expenses} 
            expensesPeriod="Total"
            fallbackText="No expenses added yet. Start adding now"
            />
    )
}

export default AllExpenses;