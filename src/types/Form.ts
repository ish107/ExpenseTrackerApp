
export interface FormValues {
    amount: string;
    date: string;
    description: string;
}

export interface AuthFormValues {
    
    firstName? : string;
    lastName?:string;
    email?: string;
    password ?: string;
    confirmPassword? :string;
    
}

export interface Credentials {
    email : string;
    password : string;
    
}