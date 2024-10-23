export interface Expense{
    id: string;
    description : string;
    amount: number;
    date : Date;
    userId: any
}

export interface ExpenseWithoutID{
    description : string;
    amount: number;
    date : Date;
}