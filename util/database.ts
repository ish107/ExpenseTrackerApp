import firestore from '@react-native-firebase/firestore'
import { Expense, ExpenseWithoutID } from '../Types/Expense';


export async function storeExpense(expenseDate: ExpenseWithoutID){
    const expensesRef = firestore().collection('expenses'); 

    const newDoc = await expensesRef.add(expenseDate)
    const id = newDoc.id

    return id;
}


export async function fetchExpenses(){

    const response = await firestore().collection('expenses').get();

    const expenses:Expense[] = []

    response.forEach((doc)=>{
        const { amount, date, description } = doc.data()
        const expenseObj ={
            id : doc.id,
            amount : amount,
            date : new Date(date.seconds * 1000 + date.nanoseconds / 1000000),
            description : description
        }

        expenses.push(expenseObj)
       });    

    console.log(expenses)
    return expenses
}


export function updateExpense(id:string, expenseData: ExpenseWithoutID){

    const expense = firestore().collection('expenses').doc(id)
    return expense.update(expenseData)
}

export function deleteExpense(id:string){

    const expense = firestore().collection('expenses').doc(id)
    return expense.delete();
}
