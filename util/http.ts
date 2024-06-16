import axios from "axios";
import { ExpenseWithoutID } from "../Types/Expense";


const base_url = 'https://expence-tracker-51b42-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData: ExpenseWithoutID){
    const response = await axios.post(base_url + '/expenses.json',expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpense(){
    const response = await axios.get(base_url+'/expenses.json')
    const expenses = [];
    for (const key in response.data){
        const expenseObj ={
            id:key,
            amount : response.data[key].amount,
            date : new Date(response.data[key].date),
            description : response.data[key].description
        }
        expenses.push(expenseObj)
    }

    return expenses;
}

export function updateExpense(id:string, expenseData:ExpenseWithoutID){
    return axios.put(base_url+`/expenses/${id}.json`,expenseData)
}

export function deleteExpense(id:string){
    return axios.delete(base_url+`/expenses/${id}.json`)
}