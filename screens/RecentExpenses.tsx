import React, { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";


function RecentExpenses() : React.JSX.Element{
   
    //const [fetchedExpenses, setFetchedExpenses] = useState<Expense[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const expenseCtx = useContext(ExpenseContext);

    useEffect(()=>{
        async function getExpenses(){
            setIsFetching(true)
            try{
                const expenses = await fetchExpense();
                expenseCtx.setExpenses(expenses)
            }catch(error){
                setError('Unable to fetch expenses')
            }
            setIsFetching(false)
        }
       getExpenses();
    },[]);

    const recentExpenses = expenseCtx.expenses.filter((expense)=>{
        const today = new Date();
        const weekBefore = expense.date;
        return (
            today.getDate() - weekBefore.getDate()<7 && 
            today.getMonth() === weekBefore.getMonth() &&
            today.getFullYear() === weekBefore.getFullYear()
        )  
    })

    function errorHandler(){
        setError(null);
    }
   
    if (isFetching){
        return <LoadingOverlay/>
    }

    if(error){
        console.log(error)
        return <ErrorOverlay message={error} />
    }

    return(
       <ExpensesOutput 
        expenses={recentExpenses} 
        expensesPeriod="Last 7 days" 
        fallbackText="You haven't spend for anything for last 7 days"/>
    )
}

export default RecentExpenses;