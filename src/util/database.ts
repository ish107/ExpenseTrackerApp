import firestore from '@react-native-firebase/firestore'
import { Expense, ExpenseWithoutID } from '../types/Expense';

export async function storeExpense(expenseData: ExpenseWithoutID, userId: any){
    const expensesRef = firestore().collection('expenses'); 
    const newDoc = await expensesRef.add({...expenseData,userId})
    const id = newDoc.id
    return id;
}

export async function fetchExpenses(userId:any){
    const response = await firestore().collection('expenses').where('userId','==',userId).get()
    console.log(response)
    const expenses:Expense[] = []
    response.forEach((doc)=>{
        const { amount, date, description } = doc.data()
        const expenseObj ={
            id : doc.id,
            amount : amount,
            date : new Date(date.seconds * 1000 + date.nanoseconds / 1000000),
            description : description,
            userId:userId
        }
        console.log(expenseObj)
        expenses.push(expenseObj)
       });    
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

export async function getUser(userId:any){
    const userRef = firestore().collection('users').doc(userId)
    const response = await userRef.get()
    const user = response.data()
    //console.log(user)
    if(user){
        return user
    }
}
