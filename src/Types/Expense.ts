export interface Expense{
    id: string;
    description : string;
    amount: number;
    date : Date;
}

export interface ExpenseWithoutID{
    description : string;
    amount: number;
    date : Date;
}