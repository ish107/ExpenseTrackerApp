import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { useState } from "react";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { Expense, ExpenseWithoutID } from "../../src/Types/Expense";
import { ColorsList } from "../../util/Colors";
import React from "react";

type ExpenseFormProps = {
    onSubmit:(expenseData:ExpenseWithoutID)=>void,
    onCancel:()=>void,
    submitButtonLabel : string,
    defaultValues: Expense|undefined //when adding defaultValues are undefined 
}

function ExpenseForm({onCancel,onSubmit, submitButtonLabel, defaultValues}:ExpenseFormProps):React.JSX.Element{

    const [inputs,setInputs] = useState({
        amount: {
            value : defaultValues? defaultValues.amount.toString():'',
            isValid : true //defaultValues? true: false
        },
        date: {
            value: defaultValues? defaultValues.date.toISOString().slice(0,10):'',
            isValid : true //defaultValues? true: false
         },
        description:{
            value : defaultValues? defaultValues.description:'',
            isValid : true //defaultValues? true: false
        }
    });

    function inputChangeHandler(inputIdentifier: string, enteredValue: string) {
        setInputs((currentInputs) => ({ //entered value automatically update from the click event, inputIdentifier shoul be given
            ...currentInputs,
            [inputIdentifier]: {value :enteredValue, isValid : true} //assume  correct data added bu user
        }));
    }

    function submitHandler(){
        const expenseData={
            amount: parseFloat(inputs.amount.value),
            date : new Date(inputs.date.value),
            description : inputs.description.value
        }

        const amountValid = !isNaN(expenseData.amount) && expenseData.amount>0;
        const dateValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionValid = expenseData.description.trim().length>0

        if (!amountValid || !dateValid || !descriptionValid){
            //Alert.alert('Invaild Input', 'Please check your values')
            setInputs((current)=>{
                return {
                    amount: {value: current.amount.value, isValid:amountValid},
                    date: {value: current.date.value, isValid:dateValid},
                    description: {value: current.description.value, isValid:descriptionValid}
                }
            });
            return
        }

        onSubmit(expenseData); //form submission
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return(
        <View style={styles.formContainer}>
            <Text style={styles.title}>Your Expense</Text>
            <Input label="Amount" textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText : (value) => inputChangeHandler('amount',value),
                value : inputs.amount.value}}
                invalid = {!inputs.amount.isValid}
            />
            <Input label="Date" textInputConfig={{
                placeholder: "YYYY-MM-DD",
                maxLength:10,
                onChangeText: (value) => inputChangeHandler('date', value),
                value: inputs.date.value}}
                invalid = {!inputs.date.isValid}
            />
            <Input label="Description" textInputConfig={{
                multiline:true,
                onChangeText : (value) => inputChangeHandler('description',value),
                value : inputs['description'].value }}
                invalid = {!inputs.description.isValid}
                />
             {formIsInvalid && <Text style={styles.errorText}>Invalid Input Values, Check Your Data</Text>}
             <View style={styles.buttonContainer}>
                <Button style={styles.button} onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    formContainer:{
        marginTop:16
    },
    title:{
        fontSize:24,
        color:'white',
        fontWeight:'bold',
        marginVertical:24,
        textAlign:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        marginTop:16
    },
    button:{
        minWidth:120,
        marginHorizontal:8
    },
    errorText:{
        textAlign:'center',
        color: ColorsList.error500,
        margin:8
    }
   
})