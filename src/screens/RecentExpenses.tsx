import React, { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { fetchExpenses } from "../util/database";
import { useUserStore } from "../store/auth-store";

function RecentExpenses() : React.JSX.Element{
    
    const userId = useUserStore.getState().userId
    
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string|null>(null);
    const expenseCtx = useContext(ExpenseContext);
    
    useEffect(()=>{
        async function getExpenses(){
            setIsFetching(true)
            try{
                const expenses = await fetchExpenses(userId);
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