import { ReactNode, createContext, useReducer } from "react";

import { Expense } from "../Types/Expense";

type ExpenseState = Expense[];

type Action = 
    | { type: 'ADD'; payload: Expense }
    | { type: 'SET'; payload: Expense[] }
    | { type: 'UPDATE'; payload: Expense }
    | { type: 'DELETE'; payload: string };

const initialExpenseState : ExpenseState = [];

function expensesReducer(state:ExpenseState,action:Action):ExpenseState{
    switch(action.type){
        case 'ADD':
            return [action.payload, ...state]

        case 'SET':
            return action.payload

        case 'UPDATE':
            const expenseId = state.findIndex((expense)=>expense.id === action.payload.id)
            const updatableExpense = state[expenseId]
            const updatedItem = {...updatableExpense, ...action.payload}
            const updatedExpense = [...state]
            updatedExpense[expenseId] = updatedItem;
            return updatedExpense;

        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload);
        default:
            return state
    }
}
type ExpenseContextProps = {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    setExpenses : (expenses : Expense[])=>void
    deleteExpense: (id: string) => void;
    updateExpense: (expense: Expense) => void;
  }

export const ExpenseContext = createContext<ExpenseContextProps>({
    expenses: [],
    addExpense:()=>{},
    setExpenses:()=>{},
    deleteExpense:()=>{},
    updateExpense:()=>{}
});

type ExpensesContextProviderProps={
    children : ReactNode
}

function ExpensesContextProvider({children}:ExpensesContextProviderProps):React.JSX.Element{
    const [expensesState, dispatch] = useReducer(expensesReducer,initialExpenseState);
    
    const addExpense = (expense: Expense) => {
        dispatch({ type: 'ADD', payload: expense }); //action to dispacth 
      };

    const setExpenses = (expenses:Expense[])=>{
        dispatch({type:'SET' , payload: expenses})
    }
    
    const deleteExpense = (id: string) => {
        dispatch({ type: 'DELETE', payload: id });
      };
    
    const updateExpense = (expense: Expense) => {
        dispatch({ type: 'UPDATE', payload : expense});
      };

    const value = {
      expenses : expensesState,
      addExpense:addExpense,
      setExpenses:setExpenses,
      deleteExpense: deleteExpense,
      updateExpense:updateExpense
    }
    
    return (
      <ExpenseContext.Provider value={value}>
        {children}
      </ExpenseContext.Provider>
    );
  }
    
export default ExpensesContextProvider;